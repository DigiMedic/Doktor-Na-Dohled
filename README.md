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
6. **Bezpečnost**: Implementováno základní zabezpečení včetně rate limitingu.

## Technologie a Architektura

- **Backend**: FastAPI, LangChain, Gunicorn (pro produkci)
- **Frontend**: Next.js, Shadcn-UI komponenty
- **AI Model**: OpenAI GPT-3.5 Turbo
- **Databáze**: Simulovaná (plánováno rozšíření na reálnou databázi)

## Aktuální stav projektu

Projekt DoktorNaDohled je ve fázi vývoje s následujícím stavem:

- Implementován základní backend s využitím FastAPI a LangChain
- Vytvořeny počáteční AI nástroje pro vyhledávání poskytovatelů a analýzu kontextu
- Implementováno základní zabezpečení včetně rate limitingu
- Připravena struktura pro frontend s využitím Next.js a Shadcn-UI komponent
- Vytvořeny základní komponenty pro chat a seznam poskytovatelů
- Implementována základní real-time komunikace

## Roadmapa

1. Fáze 1 - Dokončení základní funkcionality (Aktuální fáze)
   - [x] Implementace backendu s FastAPI a LangChain
   - [x] Vytvoření základních AI nástrojů
   - [x] Implementace základního zabezpečení
   - [ ] Dokončení implementace EnhancedConversationMemory
   - [ ] Integrace všech komponent do hlavní stránky frontendu

2. Fáze 2 - Vylepšení a optimalizace
   - [ ] Implementace pokročilé personalizace a kontextové analýzy
   - [ ] Rozšíření testovacího pokrytí (unit testy, integrační testy)
   - [ ] Optimalizace výkonu backendu a frontendu
   - [ ] Implementace pokročilejších bezpečnostních opatření

3. Fáze 3 - Škálování a produkční nasazení
   - [ ] Integrace s reálnou databází poskytovatelů zdravotní péče
   - [ ] Implementace škálovatelné architektury
   - [ ] Nastavení produkčního prostředí a CI/CD pipeline
   - [ ] Provedení zátěžových testů a optimalizace

4. Fáze 4 - Rozšíření funkcionalit
   - [ ] Implementace pokročilých analytických nástrojů
   - [ ] Integrace s externími zdravotnickými systémy
   - [ ] Vývoj mobilní aplikace
   - [ ] Implementace vícejazyčné podpory

## Instalace a spuštění

### Prerekvizity

- Python 3.8+
- Node.js 14+
- npm nebo yarn

### Kroky pro vývoj

1. Klonujte repozitář:
   ```
   git clone https://github.com/your-username/doktor-na-dohled.git
   cd doktor-na-dohled
   ```

2. Instalace závislostí pro backend:
   ```
   pip install -r requirements.txt
   ```

3. Instalace závislostí pro frontend:
   ```
   cd frontend
   npm install
   ```

4. Nastavte proměnné prostředí:
   - Zkopírujte soubor `.env.example` do `.env` a upravte hodnoty podle potřeby:
     ```
     cp .env.example .env
     ```
   - Upravte hodnoty v souboru `.env` podle vašich potřeb

5. Spuštění backendu pro vývoj:
   ```
   python app/main.py
   ```

6. Spuštění frontendu pro vývoj:
   ```
   cd frontend
   npm run dev
   ```

7. Otevřete prohlížeč a přejděte na `http://localhost:3000`

### Nasazení do produkce

1. Backend:
   - Nastavte proměnné prostředí v souboru `.env`
   - Spusťte produkční server:
     ```
     bash run_production.sh
     ```

2. Frontend:
   - Vytvořte produkční build:
     ```
     cd frontend
     npm run build
     ```
   - Spusťte produkční server:
     ```
     npm start
     ```

## Vývoj

- Můžete začít upravovat stránku úpravou `frontend/src/app/page.tsx`. Stránka se automaticky aktualizuje při úpravě souboru.
- Tento projekt používá [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) pro automatickou optimalizaci a načítání Inter, vlastního Google Fontu.

## Přispívání

Vítáme příspěvky od komunity! Pokud chcete přispět, prosím vytvořte pull request nebo otevřete issue pro diskuzi o nových funkcích nebo vylepšeních.

## Licence

Tento projekt je licencován pod MIT licencí. Viz soubor `LICENSE` pro více informací.

## Kontakt

Pro více informací o projektu kontaktujte [your-email@example.com](mailto:your-email@example.com).