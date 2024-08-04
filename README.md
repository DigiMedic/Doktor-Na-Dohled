# DoktorNaDohled - AI Konverzační Platforma pro Zdravotnictví

## Přehled projektu

**DoktorNaDohled** je AI konverzační platforma zaměřená na zajišťování přístupu k relevantním informacím a odpovědím na otázky uživatelů v oblasti zdravotnictví. Cílem je usnadnit nalezení vhodných zdravotních služeb a poskytnout uživatelům kontaktní informace o poskytovatelích zdravotní péče.

## Hlavní cíl

Poskytnout uživatelům personalizované doporučení na poskytovatele zdravotnických služeb podle jejich individuálních potřeb a poskytnout jim kontaktní informace.

## Klíčové funkce

1. **Vedení konverzace**: AI vede uživatele konverzací zaměřenou na jejich zdravotní potřeby.
2. **Analýza kontextu**: Systém analyzuje kontext a požadavky uživatele pro poskytnutí relevantních informací.
3. **Vyhledávání dat**: Na základě analýzy AI vyhledává odpovědi v integrovaných databázích.
4. **Doporučení poskytovatelů**: AI poskytuje uživateli seznam vhodných poskytovatelů zdravotní péče spolu s kontaktními informacemi.

## Proces fungování

1. **Zahájení konverzace**: AI začne konverzaci kladením otázek nebo reaguje na uživatelův požadavek.
2. **Doptávání**: Pokud je to potřeba, AI položí dodatečné otázky pro zpřesnění potřeb uživatele.
3. **Analýza dat**: Systém analyzuje získané informace a specifikuje potřeby uživatele.
4. **Vyhledání odpovědí**: AI vyhledá v databázi nejvhodnější odpovědi a poskytovatele služeb.
5. **Doporučení**: Poskytne uživateli doporučení na poskytovatele zdravotních služeb a jejich kontaktní údaje.

## Způsob konverzace

- **Otázky AI**: AI klade uživateli otázky pro získání potřebných informací.
- **Uživatelský vstup**: Uživatel může rovnou zadat svůj požadavek nebo specifikaci.
- **Doptávací proces**: AI se doptává na další specifikace, aby co nejlépe pochopil potřeby uživatele.
- **Přesnost a relevance**: Cílem je získat co nejpřesnější informace pro poskytnutí relevantních doporučení.

## Databázové zdroje poskytovatelů zdravotních služeb

Pro získávání relevantních informací a kontaktů na poskytovatele zdravotních služeb jsou v projektu implementovány následující databázové zdroje:

1. **Národní registr poskytovatelů zdravotních služeb (NRPZS)**:
   - URL: [NRPZS vyhledávání](https://nrpzs.uzis.cz/index.php?pg=vyhledavani-poskytovatele--pro-verejnost)

2. **Otevřená data - Národní registr poskytovatelů zdravotních služeb**:
   - URL: [Datová sada NRPZS](https://data.gov.cz/datov%C3%A1-sada?iri=https://data.gov.cz/zdroj/datov%C3%A9-sady/00024341/aa4c99d9f1480cca59807389cf88d4dc)

3. **Popis datové sady Národního registru poskytovatelů zdravotních služeb**:
   - URL: [Popis datové sady](https://data.gov.cz/describe/?uri=https://data.gov.cz/zdroj/datov%C3%A9-sady/00024341/aa4c99d9f1480cca59807389cf88d4dc)

Tyto zdroje jsou klíčové pro funkčnost projektu a měly by být využívány při vývoji, zejména při implementaci pomocí FastAPI.

## Technologie a Architektura

- **Backend**: FastAPI pro rychlé a efektivní zpracování API požadavků.
- **Databáze**: Integrace s databázemi poskytujícími data o zdravotnických službách.
- **NLP a AI**: Zpracování přirozeného jazyka pro pochopení dotazů uživatelů a doporučování relevantních informací.

## Marketing a Branding

- **Cílová skupina**: Obyčejní lidé hledající snadný přístup k zdravotní péči.
- **Komunikace**: Platforma by měla být prezentována jako spolehlivý a snadno dostupný zdroj zdravotní péče.
- **Logo a Vizualizace**: Navrhnout logo, které evokuje důvěru a profesionalitu.

## Další kroky

1. **Prototypování**: Vyvinout funkční prototyp pro testování a zpětnou vazbu.
2. **Uživatelské testy**: Provést testování s cílovou skupinou pro ověření použitelnosti.
3. **Iterace a vylepšení**: Na základě zpětné vazby vylepšovat a rozšiřovat funkce platformy.
4. **Uvedení na trh**: Po úspěšném testování a optimalizaci spustit platformu pro veřejnost.

