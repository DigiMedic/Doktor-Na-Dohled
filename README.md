# DoktorNaDohled - AI Konverzační Platforma pro Zdravotnictví

![DoktorNaDohled Cover Image](https://i.ibb.co/DtmRXKh/DALL-E-2024-08-04-21-57-58-Pixel-art-style-cover-image-for-Doktor-Na-Dohled-an-AI-healthcare-platfor.webp)

## Přehled projektu

**DoktorNaDohled** je AI konverzační platforma zaměřená na zajišťování přístupu k relevantním informacím a odpovědím na otázky uživatelů v oblasti zdravotnictví. Cílem je usnadnit nalezení vhodných zdravotních služeb a poskytnout uživatelům kontaktní informace o poskytovatelích zdravotní péče.

## Hlavní cíl

Poskytnout uživatelům personalizované doporučení na poskytovatele zdravotnických služeb podle jejich individuálních potřeb a poskytnout jim kontaktní informace.

## Klíčové funkce

1. **Vedení konverzace**: AI vede uživatele konverzací zaměřenou na jejich zdravotní potřeby.
2. **Analýza kontextu**: Systém analyzuje kontext a požadavky uživatele pro poskytnutí relevantních informací.
3. **Vyhledávání dat**: Na základě analýzy AI vyhledává odpovědi v integrovaných databázích.
4. **Doporučení poskytovatelů**: AI poskytuje uživateli seznam vhodných poskytovatelů zdravotní péče spolu s kontaktními informacemi.
5. **Personalizace**: Systém využívá uživatelský profil pro přizpůsobení doporučení.
6. **Bezpečnost**: Implementováno základní zabezpečení včetně rate limitingu a autentizace.

## Technologie a Architektura

- **Backend**: FastAPI, LangChain
- **Frontend**: Next.js (plánováno)
- **AI Model**: OpenAI GPT-3.5 Turbo
- **Databáze**: Simulovaná (plánováno rozšíření na reálnou databázi)

## Aktuální stav projektu

- Implementován robustní backend s využitím FastAPI a LangChain
- Vytvořeny základní AI nástroje pro vyhledávání poskytovatelů, analýzu kontextu a personalizaci
- Implementováno základní zabezpečení včetně rate limitingu a autentizace
- Připravena struktura pro rozšíření databáze poskytovatelů a zdravotnických informací

## Další kroky

1. Implementace frontendu pomocí Next.js a Shadcn-UI komponent
2. Rozšíření testovacího pokrytí
3. Integrace s reálnou databází poskytovatelů zdravotní péče
4. Vylepšení personalizace a kontextové analýzy
5. Implementace pokročilejších bezpečnostních opatření
6. Příprava na produkční nasazení (konfigurace, monitoring, škálování)

## Instalace a spuštění

1. Klonujte repozitář:
   ```
   git clone https://github.com/your-username/doktor-na-dohled.git
   cd doktor-na-dohled
   ```

2. Instalace závislostí:
   ```
   pip install -r requirements.txt
   ```

3. Nastavte proměnné prostředí:
   ```
   export OPENAI_API_KEY=your_openai_api_key
   export API_USERNAME=your_api_username
   export API_PASSWORD=your_api_password
   ```

4. Spuštění aplikace:
   ```
   python app/main.py
   ```

## Přispívání

Vítáme příspěvky od komunity! Pokud chcete přispět, prosím vytvořte pull request nebo otevřete issue pro diskuzi o nových funkcích nebo vylepšeních.

## Licence

Tento projekt je licencován pod MIT licencí. Viz soubor `LICENSE` pro více informací.

## Kontakt

Pro více informací o projektu kontaktujte [your-email@example.com](mailto:your-email@example.com).