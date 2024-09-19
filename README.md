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
- Framework: Next.js 14
- Styling: Tailwind CSS
- UI komponenty: Shadcn/UI
- State management: React Context API

### Backend
- Serverless architektura: Vercel Serverless Functions
- API Routes: Next.js API Routes

### Databáze
- Supabase

### AI Integrace
- Vercel AI SDK
- OpenAI GPT-4
- Groq


### Monitoring a Analytics
- Vercel Analytics
- Sentry.io pro logování chyb

### Verzování a CI/CD
- Git pro verzování
- GitHub Actions pro CI/CD
- Vercel pro deployment

## Roadmapa

### Fáze 1: MVP
1. Implementace základního chatovacího rozhraní
2. Integrace AI pro vedení konverzace
3. Vytvoření databáze poskytovatelů zdravotní péče
4. Implementace základního doporučovacího systému
5. Nasazení MVP verze

## Potenciální výzvy a řešení

1. Přesnost AI doporučení
   - Řešení: Pravidelné trénování AI modelu, implementace mechanismu pro zpětnou vazbu

2. Aktuálnost dat o poskytovatelích
   - Řešení: Automatizovaný proces aktualizace dat, potenciální spolupráce s poskytovateli

3. Ochrana osobních údajů
   - Řešení: Implementace end-to-end šifrování, anonymizace dat, jasné informování uživatelů

4. Škálování při vysokém zatížení
   - Řešení: Využití cloudové infrastruktury s automatickým škálováním, optimalizace dotazů
