from langchain.memory import ConversationBufferWindowMemory
from langchain.schema import BaseMemory
import logging
from typing import Dict, List, Any

class EnhancedConversationMemory(BaseMemory):
    def __init__(self, k: int = 5):
        self._memory = ConversationBufferWindowMemory(k=k, return_messages=True)
        self._user_profile: Dict[str, str] = {}

    @property
    def memory(self):
        return self._memory

    @property
    def user_profile(self):
        return self._user_profile

    def save_context(self, inputs: Dict[str, Any], outputs: Dict[str, str]) -> None:
        self.memory.save_context(inputs, outputs)
        self._update_user_profile(inputs["input"], outputs["output"])

    def load_memory_variables(self, inputs: Dict[str, Any]) -> Dict[str, Any]:
        return {
            **self.memory.load_memory_variables(inputs),
            "user_profile": self.user_profile
        }

    def _update_user_profile(self, user_input: str, ai_output: str) -> None:
        # Implementace pokročilejší logiky pro aktualizaci profilu uživatele
        keywords = {
            "location": ["bydlím v", "jsem z", "nacházím se v"],
            "health_issue": ["trápí mě", "mám problém s", "bolí mě"],
            "age": ["je mi", "mám", "věk"],
            "gender": ["jsem muž", "jsem žena", "pohlaví"],
            "insurance": ["pojištění", "pojišťovna"]
        }

        for key, phrases in keywords.items():
            for phrase in phrases:
                if phrase in user_input.lower():
                    value = user_input.split(phrase)[-1].strip().split(".")[0].strip()
                    self._user_profile[key] = value
                    break

        # Extrahování informací z AI odpovědi
        if "věk" in ai_output.lower():
            age = ai_output.split("věk")[-1].strip().split()[0]
            if age.isdigit():
                self._user_profile["age"] = age

        if "pohlaví" in ai_output.lower():
            gender = ai_output.split("pohlaví")[-1].strip().split()[0].lower()
            if gender in ["muž", "žena"]:
                self._user_profile["gender"] = gender

        # Logování aktualizací profilu
        logging.info(f"Updated user profile: {self._user_profile}")

    def get_user_profile(self) -> Dict[str, str]:
        return self._user_profile

    @property
    def memory_variables(self) -> List[str]:
        return ["history", "user_profile"]

    def clear(self) -> None:
        self._memory.clear()
        self._user_profile.clear()

    # Metody pro kompatibilitu s AgentExecutor
    def __getitem__(self, key: str) -> Any:
        if key == "history":
            return self._memory.chat_memory.messages
        elif key == "user_profile":
            return self._user_profile
        else:
            raise KeyError(f"Unknown key: {key}")

    def __setitem__(self, key: str, value: Any) -> None:
        if key == "history":
            self._memory.chat_memory.messages = value
        elif key == "user_profile":
            self._user_profile = value
        else:
            raise KeyError(f"Unknown key: {key}")

    def __contains__(self, key: str) -> bool:
        return key in ["history", "user_profile"]