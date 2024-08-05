from langchain.tools import Tool
from typing import List, Dict
import random

# Simulovaná databáze poskytovatelů zdravotní péče
# Simulovaná databáze poskytovatelů zdravotní péče
providers_db = [
    {"id": 1, "name": "MUDr. Jan Novák", "specialty": "Praktický lékař", "location": "Praha", "contact": "jan.novak@example.com"},
    {"id": 2, "name": "MUDr. Eva Svobodová", "specialty": "Kardiolog", "location": "Brno", "contact": "eva.svobodova@example.com"},
    {"id": 3, "name": "MUDr. Petr Dvořák", "specialty": "Ortoped", "location": "Ostrava", "contact": "petr.dvorak@example.com"},
    {"id": 4, "name": "MUDr. Jana Nováková", "specialty": "Pediatr", "location": "Plzeň", "contact": "jana.novakova@example.com"},
    {"id": 5, "name": "MUDr. Martin Kovář", "specialty": "Neurolog", "location": "Olomouc", "contact": "martin.kovar@example.com"},
    {"id": 6, "name": "MUDr. Lucie Veselá", "specialty": "Dermatolog", "location": "České Budějovice", "contact": "lucie.vesela@example.com"},
    {"id": 7, "name": "MUDr. Tomáš Horák", "specialty": "Gynekolog", "location": "Hradec Králové", "contact": "tomas.horak@example.com"},
    {"id": 8, "name": "MUDr. Kateřina Malá", "specialty": "Oftalmolog", "location": "Ústí nad Labem", "contact": "katerina.mala@example.com"},
]

def search_providers(query: str) -> List[Dict]:
    """Vyhledá poskytovatele zdravotní péče podle zadaných kritérií."""
    results = []
    for provider in providers_db:
        if query.lower() in provider["name"].lower() or query.lower() in provider["specialty"].lower() or query.lower() in provider["location"].lower():
            results.append(provider)
    return results

def get_provider_contact(provider_id: int) -> str:
    """Získá kontaktní informace poskytovatele zdravotní péče."""
    for provider in providers_db:
        if provider["id"] == provider_id:
            return provider["contact"]
    return "Kontaktní informace nenalezeny."

def analyze_user_location(location: str) -> str:
    """Analyzuje lokalitu uživatele a poskytne relevantní informace."""
    # Toto je zjednodušená implementace. V reálném projektu by zde byla komplexnější logika.
    return f"Analyzovaná lokalita: {location}. V této oblasti je k dispozici {random.randint(5, 20)} poskytovatelů zdravotní péče."

def get_personalized_recommendations(user_profile: Dict) -> List[Dict]:
    """Poskytuje personalizovaná doporučení na základě uživatelského profilu."""
    recommendations = []
    for provider in providers_db:
        if user_profile.get("location") and provider["location"].lower() == user_profile["location"].lower():
            recommendations.append(provider)
        if user_profile.get("health_issue") and provider["specialty"].lower() in user_profile["health_issue"].lower():
            recommendations.append(provider)
    return recommendations[:3]  # Vrátíme maximálně 3 doporučení

# Definice nástrojů pro Langchain
search_providers_tool = Tool(
    name="SearchProviders",
    func=search_providers,
    description="Vyhledá poskytovatele zdravotní péče podle zadaných kritérií. Vstup by měl být klíčové slovo pro vyhledávání."
)

get_provider_contact_tool = Tool(
    name="GetProviderContact",
    func=get_provider_contact,
    description="Získá kontaktní informace poskytovatele zdravotní péče. Vstup by mělo být ID poskytovatele."
)

analyze_user_location_tool = Tool(
    name="AnalyzeUserLocation",
    func=analyze_user_location,
    description="Analyzuje lokalitu uživatele a poskytne relevantní informace. Vstup by měla být lokalita uživatele."
)

get_personalized_recommendations_tool = Tool(
    name="GetPersonalizedRecommendations",
    func=get_personalized_recommendations,
    description="Poskytuje personalizovaná doporučení na základě uživatelského profilu. Vstup by měl být slovník s informacemi o uživateli."
)

def analyze_context_and_ask_questions(conversation_history: List[Dict]) -> str:
    """Analyzuje kontext konverzace a generuje doplňující otázky."""
    last_message = conversation_history[-1]["content"] if conversation_history else ""
    user_profile = {}
    
    for message in conversation_history:
        if "location" in message["content"].lower():
            user_profile["location"] = message["content"].split("location")[-1].strip()
        if "health issue" in message["content"].lower():
            user_profile["health_issue"] = message["content"].split("health issue")[-1].strip()
    
    if "health issue" not in user_profile:
        return "Můžete mi prosím popsat váš zdravotní problém nebo symptomy, které vás trápí?"
    elif "location" not in user_profile:
        return "V jakém městě nebo oblasti byste chtěli najít poskytovatele zdravotní péče?"
    elif "age" not in user_profile:
        return "Můžete mi prosím sdělit váš věk? To nám pomůže lépe přizpůsobit doporučení."
    elif "gender" not in user_profile:
        return "Jaké je vaše pohlaví? Tato informace může být důležitá pro některé typy zdravotní péče."
    elif "insurance" not in user_profile:
        return "Máte zdravotní pojištění? Pokud ano, u které pojišťovny?"
    else:
        return "Máte nějaké další specifické požadavky nebo preference ohledně poskytovatele zdravotní péče? Například preferujete určitý jazyk komunikace nebo máte nějaká omezení mobility?"

analyze_context_tool = Tool(
    name="AnalyzeContextAndAskQuestions",
    func=analyze_context_and_ask_questions,
    description="Analyzuje kontext konverzace a generuje doplňující otázky. Vstup by měla být historie konverzace."
)

# Seznam všech nástrojů
# Simulovaná databáze zdravotnických informací
health_info_db = [
    {"keyword": "chřipka", "info": "Chřipka je virové onemocnění dýchacích cest. Symptomy zahrnují horečku, bolesti svalů a únavu."},
    {"keyword": "diabetes", "info": "Diabetes je chronické onemocnění, při kterém tělo nedokáže správně zpracovávat glukózu."},
    {"keyword": "hypertenze", "info": "Hypertenze, neboli vysoký krevní tlak, je stav, kdy je tlak krve v tepnách trvale zvýšený."},
]

def search_health_info(query: str) -> str:
    """Vyhledá zdravotnické informace v databázi."""
    for info in health_info_db:
        if query.lower() in info["keyword"].lower():
            return info["info"]
    return "Bohužel, nemám k dispozici informace o tomto tématu."

search_health_info_tool = Tool(
    name="SearchHealthInfo",
    func=search_health_info,
    description="Vyhledá zdravotnické informace v databázi. Vstup by mělo být klíčové slovo pro vyhledávání."
)

# Seznam všech nástrojů
healthcare_tools = [search_providers_tool, get_provider_contact_tool, analyze_user_location_tool, get_personalized_recommendations_tool, analyze_context_tool, search_health_info_tool]