from langchain.memory import ConversationBufferWindowMemory
from langchain.schema import HumanMessage, AIMessage

class EnhancedConversationMemory(ConversationBufferWindowMemory):
    def __init__(self, k=5):
        super().__init__(k=k, return_messages=True)
        self.user_profile = {}

    def save_context(self, inputs, outputs):
        super().save_context(inputs, outputs)
        self._update_user_profile(inputs["input"], outputs["output"])

    def _update_user_profile(self, user_input, ai_output):
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
                    self.user_profile[key] = value
                    break

        # Extrahování informací z AI odpovědi
        if "věk" in ai_output.lower():
            age = ai_output.split("věk")[-1].strip().split()[0]
            if age.isdigit():
                self.user_profile["age"] = int(age)

        if "pohlaví" in ai_output.lower():
            gender = ai_output.split("pohlaví")[-1].strip().split()[0].lower()
            if gender in ["muž", "žena"]:
                self.user_profile["gender"] = gender

        # Logování aktualizací profilu
        logging.info(f"Updated user profile: {self.user_profile}")

    def get_user_profile(self):
        return self.user_profile

enhanced_memory = EnhancedConversationMemory()