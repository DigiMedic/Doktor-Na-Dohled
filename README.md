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

- **Backend**: LangChain - https://github.com/langchain-ai
- **Frontend**: LangChain - Next.js
## Branding
---

## 🎨 Barevná paleta

| Barva | Hex kód | Ukázka | Použití |
|-------|---------|--------|---------|
| Tmavě modrá | #1B4D6A | ![#1B4D6A](https://via.placeholder.com/50x30/1B4D6A/FFFFFF?text=+) | Hlavní barva pro logo a důležité prvky |
| Středně modrá | #5B8A9A | ![#5B8A9A](https://via.placeholder.com/50x30/5B8A9A/FFFFFF?text=+) | Sekundární prvky a zvýraznění |
| Světle modrá | #5BA2C2 | ![#5BA2C2](https://via.placeholder.com/50x30/5BA2C2/FFFFFF?text=+) | Doplňkové prvky a pozadí |
| Velmi světle modrá | #A8D4E1 | ![#A8D4E1](https://via.placeholder.com/50x30/A8D4E1/000000?text=+) | Jemné akcenty a pozadí |
| Nejsvětlejší modrá | #E7F5F8 | ![#E7F5F8](https://via.placeholder.com/50x30/E7F5F8/000000?text=+) | Velmi jemné pozadí a oddělovače |

---

## 🖋 Typografie

| Font | Ukázka | Použití |
|------|--------|---------|
| **Space Bold Regular** | <span style="font-family: 'Space Mono', monospace;">AaBbCc123</span> | Nadpisy, logo, klíčové prvky |
| **Space Bold Semibold** | <span style="font-family: 'Space Mono', monospace; font-weight: 600;">AaBbCc123</span> | Zvýraznění, podnadpisy |
| **Raleway Regular** | <span style="font-family: Raleway, sans-serif;">AaBbCc123</span> | Hlavní text v dokumentech a na webu |
| **Open Sans** | <span style="font-family: 'Open Sans', sans-serif;">AaBbCc123</span> | Alternativní font pro delší texty |

### 💻 Webové fonty

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Raleway&family=Open+Sans&display=swap" rel="stylesheet">
```

```css
body {
  font-family: 'Raleway', sans-serif;
}

h1, h2, h3 {
  font-family: 'Space Mono', monospace;
}

.alternate-paragraph {
  font-family: 'Open Sans', sans-serif;
}
```

---
- **Cílová skupina**: Obyčejní lidé hledající snadný přístup k zdravotní péči.
- **Komunikace**: Platforma by měla být prezentována jako spolehlivý a snadno dostupný zdroj zdravotní péče.
- **Logo a Vizualizace**: Navrhnout logo, které evokuje důvěru a profesionalitu.
---
