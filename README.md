# DoktorNaDohled - AI Konverzační Platforma pro Zdravotnictví

![DoktorNaDohled Cover Image](https://i.ibb.co/DtmRXKh/DALL-E-2024-08-04-21-57-58-Pixel-art-style-cover-image-for-Doktor-Na-Dohled-an-AI-healthcare-platfor.webp)

## Přehled projektu

**DoktorNaDohled** je AI konverzační platforma zaměřená na zajišťování přístupu k relevantním informacím a odpovědím na otázky uživatelů v oblasti zdravotnictví. Cílem je usnadnit nalezení vhodných zdravotních služeb a poskytnout uživatelům kontaktní informace o poskytovatelích zdravotní péče.

## Hlavní cíl

Poskytnout uživatelům personalizované doporučení na poskytovatele zdravotnických služeb podle jejich individuálních potřeb a poskytnout jim kontaktní informace.

## Klíčové funkce (aktuální a plánované)

1.  **Vedení konverzace**: AI (OpenAI GPT-3.5-turbo integrované přes Vercel AI SDK) vede uživatele konverzací zaměřenou na jejich zdravotní potřeby. (Základ implementován)
2.  **Analýza kontextu**: Systém analyzuje kontext a požadavky uživatele pro poskytnutí relevantních informací. (Plánováno v rámci vylepšení AI)
3.  **Vyhledávání dat**: Na základě analýzy AI bude vyhledávat odpovědi v integrovaných databázích poskytovatelů. (Plánováno)
4.  **Doporučení poskytovatelů**: AI bude poskytovat uživateli seznam vhodných poskytovatelů zdravotní péče spolu s kontaktními informacemi. (Plánováno)
5.  **Personalizace**: Systém bude využívat uživatelský profil pro přizpůsobení doporučení. (Plánováno do budoucna)
6.  **Bezpečnost**: Základní rate limiting a bezpečná správa API klíčů. (Částečně řešeno, plánováno vylepšení)

DoktorNaDohled je AI konverzační platforma zaměřená na poskytování relevantních informací a odpovědí na otázky uživatelů v oblasti zdravotnictví. Hlavním cílem je usnadnit nalezení vhodných zdravotních služeb a poskytnout uživatelům kontaktní informace o poskytovatelích zdravotní péče v celé České republice.

## Cíle projektu

1. Vytvořit uživatelsky přívětivou AI chatovací platformu pro vyhledávání zdravotních služeb.
2. Poskytovat personalizovaná doporučení poskytovatelů zdravotní péče na základě potřeb uživatelů.
3. Nabídnout přesné a aktuální informace o poskytovatelích zdravotní péče.
4. Zlepšit přístup k informacím o zdravotní péči v České republice.
5. Implementovat systém pro sběr a analýzu zpětné vazby od uživatelů.

## Cílová skupina

- Obyvatelé České republiky hledající poskytovatele zdravotní péče
- Pacienti s chronickými onemocněními hledající specializovanou péči
- Nově přistěhovalí obyvatelé hledající informace o místním zdravotním systému
- Starší občané nebo jejich pečovatelé hledající specifické zdravotní služby

## Technologický stack

### Národní registr poskytovatelů zdravotních služeb
- https://data.gov.cz/datov%C3%A1-sada?iri=https://data.gov.cz/zdroj/datov%C3%A9-sady/00024341/aa4c99d9f1480cca59807389cf88d4dc

### Frontend
- Framework: Next.js 14 (App Router)
- Styling: Tailwind CSS
- UI komponenty: Shadcn/UI
- State management (pro chat): `ai/react` (hook `useCompletion`), (React Context API pro globální stav zvážen do budoucna)

### Backend
- Serverless architektura: Vercel Serverless Functions (Next.js API Routes)
- API Routes: Next.js API Routes

### Databáze
- Supabase (plánováno)

### AI Integrace
- Vercel AI SDK (využívá `ai/react` pro frontend)
- OpenAI GPT-3.5-turbo (aktuálně používaný model)
- Groq (plánovaná možnost)


### Monitoring a Analytics
- Vercel Analytics
- Sentry.io pro logování chyb

### Verzování a CI/CD
- Git pro verzování
- GitHub Actions pro CI/CD
- Vercel pro deployment

## Roadmapa Vývoje

### Fáze 1: Základní Struktura a Nastavení Projektu (MVP) - ✅ DOKONČENO
1.  Inicializace Next.js projektu (TypeScript, App Router).
2.  Nastavení Stylingu (Tailwind CSS a Shadcn/UI).
3.  Vytvoření Základního Layoutu Aplikace (hlavička, patička, obsah).
4.  Implementace Základního Chatovacího Rozhraní (komponenty pro zprávy, vstup).
5.  Nastavení Serverless Funkcí (Next.js API Route `/api/chat` s mockovanou odpovědí).

### Fáze 2: Integrace AI a Zpracování Konverzace - 🔄 PROBÍHÁ
6.  Integrace Vercel AI SDK a OpenAI Modelu (GPT-3.5-turbo) do `/api/chat` se streamováním odpovědí. - ✅ DOKONČENO
7.  **Aktuálně:** Zdokonalení Průběhu Konverzace a Systémových Zpráv:
    *   Definování úvodní systémové zprávy (prompt engineering) pro OpenAI.
    *   Zajištění udržení kontextu konverzace.
    *   Vylepšení uvítací zprávy od AI.

### Fáze 3: Databáze Poskytovatelů a Doporučení - 🔜 PLÁNOVÁNO
8.  Návrh a Nastavení Databáze (Supabase):
    *   Definice schématu databáze pro poskytovatele.
    *   Nastavení projektu v Supabase.
9.  Import Dat Poskytovatelů:
    *   Stažení dat z Národního registru.
    *   Skript pro transformaci a nahrání dat.
10. Implementace Vyhledávání v Databázi z AI:
    *   API route pro dotazy AI do Supabase.
    *   Úprava AI promptu pro využití této funkce.
11. Základní Systém Doporučení:
    *   AI formuluje doporučení na základě konverzace a databázových výsledků.

### Fáze 4: Pokročilé Funkce a Vylepšení - 🔜 PLÁNOVÁNO
12. Analýza Kontextu a Sofistikovanější Doptávání AI.
13. Personalizace na Základě Uživatelského Profilu (základní).
14. Zabezpečení (např. pokročilejší Rate Limiting).
15. Monitoring a Logování Chyb (např. integrace Sentry.io).
16. Psaní Jednotkových a Integračních Testů.
17. Nastavení CI/CD (GitHub Actions, Vercel).
18. Implementace Systému pro Sběr a Analýzu Zpětné Vazby.

## Potenciální výzvy a řešení

1. Přesnost AI doporučení
   - Řešení: Pravidelné trénování AI modelu, implementace mechanismu pro zpětnou vazbu

2. Aktuálnost dat o poskytovatelích
   - Řešení: Automatizovaný proces aktualizace dat, potenciální spolupráce s poskytovateli

3. Ochrana osobních údajů
   - Řešení: Implementace end-to-end šifrování, anonymizace dat, jasné informování uživatelů

4. Škálování při vysokém zatížení
   - Řešení: Využití cloudové infrastruktury s automatickým škálováním, optimalizace dotazů
