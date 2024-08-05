from fastapi import FastAPI, HTTPException, Depends, Request, Security
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.middleware.cors import CORSMiddleware
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.agents import AgentExecutor, create_openai_tools_agent
from pydantic import BaseModel
from app.tools.healthcare_tools import healthcare_tools
from app.memory.conversation_memory import EnhancedConversationMemory
import os
import logging
from logging.handlers import RotatingFileHandler
import time
import traceback
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from starlette.status import HTTP_429_TOO_MANY_REQUESTS
import secrets

# Nastavení logování
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
handler = RotatingFileHandler("app.log", maxBytes=10000, backupCount=3)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)

# Inicializace rate limiteru
limiter = Limiter(key_func=get_remote_address)

app = FastAPI(
    title="Doktor-Na-Dohled API",
    description="API pro zdravotnickou aplikaci s AI asistentem",
    version="1.0.0",
)

# Přidání rate limiteru do aplikace
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Nastavení CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # V produkci by mělo být omezeno na konkrétní domény
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Základní autentizace
security = HTTPBasic()

def get_current_username(credentials: HTTPBasicCredentials = Depends(security)):
    correct_username = os.getenv("API_USERNAME", "admin")
    correct_password = os.getenv("API_PASSWORD", "password")
    if not secrets.compare_digest(credentials.username, correct_username) or \
       not secrets.compare_digest(credentials.password, correct_password):
        raise HTTPException(
            status_code=401,
            detail="Nesprávné přihlašovací údaje",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username

# Inicializace LLM
def get_llm():
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        logger.error("OPENAI_API_KEY not found in environment variables")
        raise HTTPException(status_code=500, detail="OpenAI API key not configured")
    return ChatOpenAI(model_name="gpt-3.5-turbo", openai_api_key=api_key)

# Vytvoření promptu
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful AI assistant for a healthcare application. You help users find healthcare providers, get their contact information, and analyze user locations. Use the user's profile information to provide personalized recommendations."),
    ("human", "{input}"),
    ("ai", "{agent_scratchpad}"),
])

# Vytvoření vylepšené paměti
enhanced_memory = EnhancedConversationMemory()

# Vytvoření agenta
agent = create_openai_tools_agent(get_llm(), healthcare_tools, prompt)

# Vytvoření AgentExecutor
agent_executor = AgentExecutor(agent=agent, tools=healthcare_tools, memory=enhanced_memory, verbose=True)

class UserInput(BaseModel):
    message: str

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    logger.info(f"Request: {request.method} {request.url.path} - Status: {response.status_code} - Process time: {process_time:.2f}s")
    return response

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception: {str(exc)}\n{traceback.format_exc()}")
    return JSONResponse(
        status_code=500,
        content={"message": "An unexpected error occurred. Please try again later."}
    )

@app.post("/chat", response_model=dict)
@limiter.limit("5/minute")
async def chat(request: Request, user_input: UserInput, username: str = Depends(get_current_username)):
    try:
        logger.info(f"Received user input: {user_input.message}")
        response = agent_executor.invoke({"input": user_input.message})
        user_profile = enhanced_memory.get_user_profile()
        logger.info(f"AI response: {response['output']}")
        return {"response": response["output"], "user_profile": user_profile}
    except Exception as e:
        logger.error(f"Error processing chat request: {str(e)}\n{traceback.format_exc()}")
        raise HTTPException(status_code=500, detail="An error occurred while processing your request. Please try again.")

@app.get("/")
@limiter.limit("10/minute")
async def root(request: Request, username: str = Depends(get_current_username)):
    return {"message": "Vítejte v API Doktor-Na-Dohled. Použijte /docs pro zobrazení dokumentace API."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)