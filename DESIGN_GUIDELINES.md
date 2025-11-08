# Grand Tournament - Design Guidelines

Dokument określający wytyczne projektowe dla gry Grand Tournament na podstawie istniejących zasobów graficznych.

---

## 1. Ogólna Estetyka i Styl

### Tematyka
- **Styl wizualny**: Średniowieczne fantasy z elementami iluminowanych manuskryptów
- **Klimat**: Mieszanka historycznego realizmu z elementami fantasy
- **Inspiracje**: Średniowieczne miniatury, iluminowane kodeksy, malarstwo portretowe renesansu

### Koncepcja wizualna
- Połączenie AI-generowanego art (portrety postaci) z nowoczesnym, minimalistycznym UI
- Kontrast między bogatymi, szczegółowymi portretami a czystym, geometrycznym layoutem
- Elementy fizyczne (figurki, drewniane trybuny) jako inspiracja dla interfejsu cyfrowego

---

## 2. Paleta Kolorów

### Kolory kategorii kart

#### AURA (Rycerze)
- **Kolor główny**: `#E8D4F8` (jasny fiolet/lawenda)
- **Zastosowanie**: Karty wieśniaków kategorii AURA, tła nagłówków
- **Charakterystyka**: Delikatny, magiczny odcień sugerujący duchową moc

#### RICH (Bogaci)
- **Kolor główny**: `#B8E8F5` (jasny niebieski/aqua)
- **Zastosowanie**: Karty kategorii RICH
- **Charakterystyka**: Spokojny, szlachetny odcień kojarzony z bogactwem

#### LOVE/VIP (Postacie specjalne - modyfikatory)
- **Kolor główny**: `#F8B8D8` (różowy)
- **Zastosowanie**: Karty postaci specjalnych (Cycata kobieta, Mistrz rycerski, Malarz, etc.)
- **Charakterystyka**: Wyraźny, przyciągający uwagę kolor dla kart VIP

#### Neutralne
- **Kolor główny**: `#F5F5F5` (jasnoszary/biały)
- **Kolor tła**: `#FFFFFF` (biały)
- **Kropki tła**: Delikatny wzór kropek (dot pattern) w jasnoszarym odcieniu

### Kolory funkcjonalne

#### Modyfikatory pozytywne
- **Kolor główny**: `#4CAF50` (zielony)
- **Zastosowanie**: Przyciski +10, +1, korzystne efekty
- **Przykłady**: "Jednooki" (+1), "Mistrz rycerski" (+10)

#### Modyfikatory negatywne
- **Kolor główny**: `#FF5733` (czerwono-pomarańczowy)
- **Zastosowanie**: Przyciski -10, -1, niekorzystne efekty
- **Przykłady**: "Gniewny" (-1), "Cycata kobieta" (-10)

#### Portrety - tło
- **Kolor główny**: Gradientowe złoto (od `#F4C430` do `#B8860B`)
- **Zastosowanie**: Tło wszystkich okrągłych portretów postaci
- **Charakterystyka**: Szlachetne, królewskie złoto nadające powagi i prestiżu

---

## 3. Typografia

### Nagłówki kart
- **Krój**: Bezszeryfowy, pogrubiony (bold/black weight)
- **Kolor**: `#000000` (czarny)
- **Wielkość**: Duża, wyraźnie czytelna
- **Przykłady**: "Grubas jedzący kurczaki", "Mistrz rycerski (Mentor)", "Błędni Rycerze / Freelancerzy"

### Opisy i tekst pomocniczy
- **Krój**: Bezszeryfowy, regular/medium weight
- **Kolor**: `#333333` (ciemnoszary) lub `#000000` (czarny)
- **Wielkość**: Średnia, zachowująca czytelność
- **Przykłady**: Opisy zdolności, nazwy umiejętności

### Liczby modyfikatorów
- **Krój**: Bezszeryfowy, extra bold
- **Kolor**: `#FFFFFF` (biały na kolorowym tle)
- **Wielkość**: Bardzo duża, dominująca
- **Format**: "-10", "+10", "-1", "+1"

### Statystyki rycerzy
- **Format**: "Siła: 10 / Celność: 5 / Zręczność: 0"
- **Krój**: Regular, czytelny
- **Layout**: Lista pionowa z wyrównaniem do lewej

---

## 4. Karty - Struktura i Typy

### 4.1 Karty Rycerzy

#### Błędni Rycerze / Freelancerzy
- **Tło nagłówka**: Jasnoszare
- **Styl portretów**: Kolorowy, realistyczny AI art
- **Paleta**: Pełne spektrum kolorów (niebieskie, żółte, czerwone zbroje)
- **Przykłady**: Garen z Raud, Egon z Taar, Kiara z Lestry, Roland z Gers, Gizela z Gauden
- **Charakterystyka**: Różnorodność, indywidualność, kolorowe herby i zbroje

#### Imperialni Rycerze / Rycerze Królestwa / Elita
- **Tło nagłówka**: Jasnoszare
- **Styl portretów**: Ciemny, mroczny, jednolity
- **Paleta**: Czarne/ciemnoszare zbroje, minimalna kolorystyka
- **Przykłady**: Dagan baron Brant, Egmund hrabia Argen, Renhart z Gers, Faro z Gauden, Gwidon z Mereii
- **Charakterystyka**: Jednolitość, groźny wygląd, zamknięte hełmy, czarne konie

#### Struktura karty rycerza
```
┌─────────────────────────┐
│   [Portret pionowy]     │
│                         │
│   [Ramka obrazka]       │
│                         │
├─────────────────────────┤
│ [Nazwa rycerza]         │
│ [Różowy/szary pasek]    │
├─────────────────────────┤
│ [Opis tekstowy]         │
│ [Historia postaci]      │
│                         │
│ Siła: XX               │
│ Celność: XX            │
│ Zręczność: XX          │
└─────────────────────────┘
```

### 4.2 Karty Przydomków

#### Struktura
```
┌─────────────────────────┐
│                         │
│    [Nazwa przydomku]    │
│                         │
│ +X do [cecha] (faza N)  │
│                         │
│       [Badge -1/+1]     │
│                         │
└─────────────────────────┘
```

#### Kolory
- **Tło**: Jasny zielony (`#C8E6C9`)
- **Badge pozytywny**: Zielony okrągły badge z "+1"
- **Badge negatywny**: Czerwono-pomarańczowy okrągły badge z "-1"

#### Przykłady przydomków
- **Gniewny** (-1): +5 do siły rozpędu (faza1)
- **Jednooki** (+1): -5 do trafności (faza 2)
- **Złotoręki** (-1): +5 do trafności (faza 2)
- **Jurny** (+1): -5 do odporności na wpływy z trybun
- **Wytrwały** (-1): +5 do obrony (faza 3)
- **Nieznany** (-1): Po wygranej zdobywasz więcej punktów chwały (+10 lub x2)
- **Niezłomny** (-1): Testy obronne → powtórka rzutu
- **Pobożny** (-1): Można powtórzyć rzut premii od duchownych
- **Piękny** (-1): Dodatkowe punkty za styl (x2), jeżeli jest Lady z winkiem na trybunach

### 4.3 Karty Postaci Specjalnych (Modyfikatory)

#### Struktura
```
┌─────────────────────────┐
│                         │
│   ╭─────────────╮       │
│   │  [Portret]  │       │  <- Okrągły portret
│   │  okrągły    │       │     na złotym tle
│   ╰─────────────╯       │
│                         │
├─────────────────────────┤
│ [Nazwa postaci]         │  <- Różowy pasek
│ [Podtytuł/kategoria]    │
├─────────────────────────┤
│                         │
│     ┌─────────┐         │
│     │  +10    │         │  <- Badge z wartością
│     │  lub    │         │
│     │  -10    │         │
│     └─────────┘         │
│                         │
│ [Opis efektu]           │
│ [Dodatkowy tekst]       │
│                         │
└─────────────────────────┘
```

#### Elementy wizualne
- **Tło karty**: Różowe (`#F8B8D8`)
- **Portret**: Okrągły, białe obramowanie (3-5px)
- **Tło portretu**: Złoty gradient
- **Badge wartości**: Prostokąt z zaokrąglonymi rogami
  - Zielony dla +10
  - Czerwono-pomarańczowy dla -10
- **Typografia wartości**: Biały tekst, extra bold, bardzo duży

#### Przykłady postaci
- **Cycata kobieta / Lokalna piękność** (-10): Do danej fazy dla rycerza męskiego, Rozprasza rycerza
- **Mistrz rycerski (Mentor)** (+10): Do danej fazy dla rycerza, Motywuje rycerza
- **Malarz** (+10/-10): Dodatkowych punktów chwały, Przy przegranej - minus

### 4.4 Karty Wieśniaków

#### Struktura podstawowa
```
┌───────────────┐
│  ╭─────────╮  │
│  │ Portret │  │  <- Okrągły portret
│  ╰─────────╯  │
├───────────────┤
│ [Nazwa]       │  <- Pasek kategorii
│ [Kategoria]   │     (fioletowy/niebieski/różowy)
├───────────────┤
│  ○ ○ ○       │
│  ○ ○ ○       │  <- Siatka 3x3
│  ○ ○ ○       │     pozycjonowania
└───────────────┘
```

#### System siatki pozycjonowania
- **Layout**: 3 rzędy × 3 kolumny = 9 pozycji
- **Elementy**: Okrągłe tokeny
- **Kolory tokenów**:
  - Szary (`#CCCCCC`) - puste miejsce
  - Złoty z portretem - zajęte przez tę postać
  - Zielony - korzystny efekt
  - Czerwony - niekorzystny efekt
  - Strzałki zielone - kierunek efektu

#### Kategorie wieśniaków
1. **AURA** (Fioletowe tło)
2. **RICH** (Niebieskie tło)
3. **LOVE/VIP** (Różowe tło)

---

## 5. Portrety i Ilustracje

### Style portretów

#### Portrety okrągłe (standard)
- **Format**: Okrągły crop
- **Obramowanie**: Białe, grubość 3-5px
- **Tło**: Złoty gradient
- **Styl**: AI-generowany, realistyczny, malarstwo cyfrowe
- **Kompozycja**: Portret popiersiowy lub od pasa w górę
- **Oświetlenie**: Ciepłe, dramatyczne, z wyraźnym kierunkiem światła

#### Portrety rycerzy (pionowe)
- **Format**: Prostokątny, pionowy (proporcje ok. 2:3)
- **Obramowanie**: Delikatne, zaokrąglone rogi
- **Tło**: Realistyczne tła (krajobrazy, niebo, zamki)
- **Kompozycja**: Pełna postać lub od kolan w górę
- **Detale**: Szczegółowe zbroje, herby, konie, tkaniny

### Wymagania techniczne
- **Format**: PNG z przezroczystością (dla okrągłych portretów)
- **Rozdzielczość**: Minimum 512×512px dla portretów okrągłych
- **Rozdzielczość**: Minimum 400×600px dla portretów rycerzy
- **Jakość**: Wysoka, bez widocznej pikselizacji

### Tematyka portretów

#### Rycerze
- Zbroje (pełne plate, chain mail, kombinacje)
- Hełmy (otwarte i zamknięte)
- Konie (w różnych barwach)
- Broń (kopie, miecze)
- Herby i proporce

#### Wieśniacy i postacie specjalne
- **Grubas jedzący kurczaki**: Brodaty mężczyzna z jedzeniem
- **Cycata kobieta**: Atrakcyjna kobieta w średniowiecznym stroju
- **Mistrz rycerski**: Doświadczony wojownik w hełmie
- **Malarz**: Młody artysta z pędzlem
- **Bard**: Muzyk z instrumentem
- **Chorąży**: Postać ze sztandarem
- **Szczurołap**: Prosty człowiek z pułapkami
- **Błazen**: Kolorowa postać w błazeńskim stroju

---

## 6. Layout i Grid System

### Plansza gry (Game Phases)

#### Struktura
```
┌──────────────────────────────────────────────────────────┐
│  PLAYER 1                           PLAYER 2             │
│                                                           │
│  FAZA 1  FAZA 2  FAZA 3  FAZA 4  FAZA 3  FAZA 2  FAZA 1 │
│                                                           │
│  ○○○○○○  ○○○○○○  ○○○○○○  ○○○○○○  ○○○○○○  ○○○○○○  ○○○○○○  │
│  ○○○○○○  ○○○○○○  ○○○○○○  ○○○○○○  ○○○○○○  ○○○○○○  ○○○○○○  │
│  ○○○○○○  ○○○○○○  ○○○○○○  ○○○○○○  ○○○○○○  ○○○○○○  ○○○○○○  │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

#### Specyfikacja
- **Układ**: Symetryczny, 2 graczy naprzeciw siebie
- **Fazy**: 4 główne fazy rozgrywki (rozpęd, trafność, uderzenie, finalizacja)
- **Rzędy**: 3 rzędy w każdej fazie
- **Tokeny**: Okrągłe miejsca na wieśniaków
- **Kolory tokenów**: Szare (puste), złote (zajęte)
- **Tło**: Białe z delikatnym wzorem kropek

### Grid dla kart wieśniaków
- **Format**: 3×3 (9 pozycji)
- **Spacing**: Równomierne odstępy między tokenami
- **Alignment**: Wyśrodkowane w karcie

### Margines i padding
- **Karta - padding zewnętrzny**: 16-24px
- **Karta - padding wewnętrzny sekcji**: 12-16px
- **Odstępy między elementami**: 8-12px
- **Okrągłe tokeny - spacing**: 8px między tokenami

---

## 7. Ikony i Symbole

### Badge'e modyfikatorów
- **Shape**: Zaokrąglony prostokąt (border-radius: 8-12px)
- **Size**:
  - Duże: 80×60px (dla głównych wartości na kartach)
  - Małe: 40×30px (dla kompaktowych widoków)
- **Kolory**:
  - Pozytywne: `#4CAF50` (zielony)
  - Negatywne: `#FF5733` (czerwono-pomarańczowy)
  - Neutralne: `#2196F3` (niebieski)

### Tokeny wieśniaków
- **Shape**: Okrąg
- **Size**: 40-60px średnicy
- **Border**: 2-3px, kolor zależny od stanu
- **Stany**:
  - Pusty: Szary (`#CCCCCC`)
  - Zajęty: Złoty portret
  - Aktywny pozytywnie: Zielony
  - Aktywny negatywnie: Czerwony

### Strzałki efektów
- **Style**: Proste, geometryczne
- **Kolory**: Zielony dla korzystnych efektów
- **Grubość**: 3-4px
- **Zastosowanie**: Wskazywanie kierunku rozprzestrzeniania się efektu (np. Bard wpływa na sąsiadów)

---

## 8. Background Patterns

### Wzór kropek (Dot Pattern)
- **Zastosowanie**: Tło planszy głównej, tła niektórych sekcji
- **Kolor**: Jasnoszary (`#E0E0E0`)
- **Rozmiar**: Małe kropki (2-3px)
- **Spacing**: Równomierne odstępy (15-20px)
- **Styl**: Delikatny, nieprzytłaczający

### Tła kart
- **Standard**: Pełny, płaski kolor kategorii
- **Gradient**: Opcjonalnie subtelny gradient dla głębokości
- **Texture**: Brak - czyste, płaskie kolory dla czytelności

---

## 9. Interaktywność i Stany (dla implementacji cyfrowej)

### Stany kart
1. **Default**: Standardowy wygląd
2. **Hover**: Subtelne podniesienie (shadow), lekkie powiększenie (scale: 1.02)
3. **Active/Selected**: Wyraźniejsza ramka, podniesienie
4. **Disabled**: Opacity: 0.5, grayscale filter

### Animacje
- **Przejścia**: Płynne, 200-300ms
- **Easing**: ease-in-out
- **Efekty**:
  - Karty: Podnoszenie przy hover
  - Tokeny: Pulsowanie przy aktywacji
  - Modyfikatory: Fade in/out przy zmianie wartości

---

## 10. Accessibility

### Kontrast
- Wszystkie kombinacje tekst/tło muszą spełniać WCAG AA (4.5:1)
- Szczególna uwaga na:
  - Biały tekst na zielonym tle (modyfikatory +10)
  - Biały tekst na czerwonym tle (modyfikatory -10)
  - Czarny tekst na pastelowych tłach kart

### Czytelność
- Minimum rozmiaru tekstu: 14px dla opisów
- Minimum rozmiaru tekstu: 16px dla nazw
- Wyraźne kontrasty między sekcjami
- Unikanie tekstu na skomplikowanych tłach

### Alternatywy wizualne
- Nie polegać tylko na kolorze (np. czerwony/zielony)
- Używać również symboli (+/-), kształtów, tekstów
- Zapewnić opisy tekstowe dla portretów (alt text)

---

## 11. Spójność Wizualna - Checklist

Przy dodawaniu nowych elementów graficznych upewnij się, że:

- [ ] Styl portretów jest zgodny (okrągłe ze złotym tłem LUB pionowe pełne)
- [ ] Kolory kategorii są poprawnie użyte (fioletowy/niebieski/różowy)
- [ ] Modyfikatory używają standardowych badge'y (+10/-10, +1/-1)
- [ ] Typografia jest spójna (pogrubione nagłówki, czytelne opisy)
- [ ] Marginesy i paddingi są równomierne
- [ ] Tło kropkowe jest użyte tam gdzie potrzeba
- [ ] Białe obramowanie jest wokół portretów okrągłych
- [ ] Tekst ma odpowiedni kontrast z tłem
- [ ] Elementy są wyśrodkowane i wyrównane

---

## 12. Zasoby i Assets

### Lokalizacja plików
```
public/img/
├── battle-field.png          # Fizyczna plansza z figurkami
├── splash-screen.png         # Ekran powitalny (królik z trąbą)
├── splash-screen-2.png       # Ekran powitalny (scena średniowieczna)
├── game-phases.png           # Plansza faz gry
├── multiple-cards.png        # Przegląd wszystkich typów kart
├── description-1.png         # Opis gry
├── insp-1.png               # Inspiracje
├── insp-2.png               # Inspiracje
├── knights/
│   ├── freelancers.png      # Błędni Rycerze
│   ├── imperials.png        # Imperialni Rycerze
│   └── przydomki.png        # Karty przydomków
├── modifiers/
│   ├── mod-1.png            # Cycata kobieta
│   ├── mod-2.png            # Mistrz rycerski
│   ├── mod-3.png            # Malarz
│   ├── mod-4.png            # [Inny modyfikator]
│   ├── mod-5.png            # [Inny modyfikator]
│   └── mod-6.png            # [Inny modyfikator]
└── cards/
    ├── card-1.png           # Grubas jedzący kurczaki (wieśniak)
    ├── card-2.png           # [Inna karta]
    ├── card-3.png           # [Inna karta]
    ├── card-4.png           # [Inna karta]
    ├── card-5.png           # [Inna karta]
    └── card-6.png           # [Inna karta]
```

### Formaty i standardy
- **Karty**: PNG, 300-400px szerokości
- **Portrety okrągłe**: PNG z transparency, 512×512px
- **Portrety rycerzy**: PNG, 400×600px
- **Plansza**: PNG, wysokiej rozdzielczości dla retina displays
- **Ikony**: SVG preferowane, PNG jako fallback

---

## 13. Inspiracje Wizualne

### Historyczne
- **Codex Manesse** - średniowieczne miniatury
- **Iluminowane manuskrypty** - złocenia, ozdobne ramki
- **Malarstwo portretowe** - realizm, detale postaci

### Współczesne
- **Board game design** - czytelność, funkcjonalność
- **Fantasy card games** - MTG, Hearthstone (kompozycja kart)
- **AI art** - nowoczesne, wysokiej jakości portrety

### Fizyczne elementy
- **Drewniane podstawki** - ciepłe, naturalne materiały
- **Figurki miniaturowe** - Warhammer, D&D
- **Fizyczne tokeny** - okrągłe, intuicyjne w użyciu

---

**Wersja dokumentu**: 1.0
**Data utworzenia**: 2025-11-08
**Ostatnia aktualizacja**: 2025-11-08
