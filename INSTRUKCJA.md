# Instrukcja Uruchomienia Aplikacji Web

## Szybki Start

Aplikacja Grand Tournament to prosta aplikacja webowa, która działa bezpośrednio w przeglądarce.

### Metoda 1: Otwarcie pliku HTML

1. Otwórz plik `index.html` bezpośrednio w przeglądarce:
   - Kliknij dwukrotnie na `index.html`
   - LUB przeciągnij plik do okna przeglądarki
   - LUB kliknij prawym przyciskiem → "Otwórz za pomocą" → wybierz przeglądarkę

### Metoda 2: Lokalny serwer HTTP (zalecane dla development)

#### Używając Python:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Następnie otwórz: `http://localhost:8000`

#### Używając Node.js (npx):
```bash
npx http-server -p 8000
```

Następnie otwórz: `http://localhost:8000`

#### Używając PHP:
```bash
php -S localhost:8000
```

Następnie otwórz: `http://localhost:8000`

## Struktura Projektu

```
grand-tournament/
├── index.html          # Główny plik aplikacji
├── styles.css          # Style zgodne z Design Guidelines
├── app.js             # Logika gry
├── public/            # Zasoby graficzne
│   └── img/          # Obrazy kart, rycerzy, modyfikatorów
├── tests/             # Testy jednostkowe
│   └── game.test.js  # Testy logiki gry
├── README.md          # Opis gry
├── DESIGN_GUIDELINES.md  # Wytyczne projektowe
├── TESTING.md         # Dokumentacja testów
├── INSTRUKCJA.md      # Ten plik
├── package.json       # Zależności i skrypty
└── vitest.config.js   # Konfiguracja testów
```

## Jak Grać

### 1. Rozpoczęcie Gry

- Kliknij "Nowa Gra" aby rozpocząć
- Każdy gracz losuje swojego rycerza i przydomek

### 2. Losowanie Kart

**Rycerze:**
- Kliknij "Losuj Rycerza"
- Wylosowany zostanie rycerz z frakcji Błędnych lub Imperialnych
- Każdy rycerz ma unikalne statystyki: Siła, Celność, Zręczność

**Przydomki:**
- Kliknij "Losuj Przydomek"
- Przydomki dają bonusy/kary do różnych faz pojedynku
- Przykłady: "Gniewny" (+5 rozpęd, -1), "Wielki" (ułatwia trafienie)

### 3. Rzucanie Kośćmi

- **k4** - kość 4-ścienna (wartość 1-4)
- **k6** - kość 6-ścienna (wartość 1-6)
- **k8** - kość 8-ścienna (wartość 1-8)

Możesz rzucać wielokrotnie różnymi kośćmi. Wszystkie rzuty są sumowane.

### 4. Fazy Pojedynku

Wprowadź wartości dla każdej z 4 faz:

1. **Faza 1 - Rozpęd**: Siła i prędkość konia
2. **Faza 2 - Skupienie**: Trafność i celność
3. **Faza 3 - Uderzenie**: Moc uderzenia kopią
4. **Faza 4 - Finalizacja**: Końcowy wynik pojedynku

Wartości te reprezentują premie z trybun (wieśniacy, postacie specjalne).

### 5. Obliczanie Wyniku

Kliknij **"Oblicz Wynik"** aby zsumować:
- Rzuty kośćmi
- Wartości z 4 faz
- Bonusy z przydomka
- Statystyki rycerza (siła + celność + zręczność)

### 6. Punkty Chwały

- Kliknij **"+10 Chwały"** aby dodać 10 punktów
- Kliknij **"-10 Chwały"** aby odjąć 10 punktów
- Punkty chwały można wydać na poprawienie wyniku rycerza

## Funkcje Aplikacji

### ✅ Zaimplementowane

- ✅ Losowanie rycerzy (2 frakcje: Błędni i Imperialni)
- ✅ Losowanie przydomków z efektami
- ✅ Rzucanie kośćmi (k4, k6, k8)
- ✅ Wielokrotne rzuty z automatycznym sumowaniem
- ✅ 4 fazy pojedynku z polami do wprowadzania wartości
- ✅ Automatyczne obliczanie wyniku końcowego
- ✅ System punktów chwały dla 2 graczy
- ✅ Historia akcji w grze
- ✅ Przycisk reset/nowa gra
- ✅ Responsywny design
- ✅ Animacje i efekty wizualne

### 🔮 Planowane rozszerzenia (opcjonalne)

- ✅ Zapis/wczytywanie stanu gry (localStorage) - ZAIMPLEMENTOWANE
- ✅ Wizualizacja kart z grafikami - ZAIMPLEMENTOWANE
- ✅ System kart i przedmiotów - ZAIMPLEMENTOWANE
- Pełna plansza z wieśniakami i postaciami specjalnymi
- System trybun z 3 rzędami (k8, k6, k4)
- Tryb multiplayer online
- Eksport wyników do PDF

## Testowanie

Aplikacja posiada testy jednostkowe sprawdzające poprawność logiki gry.

### Uruchamianie testów

```bash
# Instalacja zależności
npm install

# Jednorazowe uruchomienie testów
npm test

# Tryb watch (auto-reload)
npm run test:watch

# Testy z pokryciem kodu
npm run test:coverage
```

Więcej informacji w pliku [TESTING.md](TESTING.md)

## Wsparcie Przeglądarek

Aplikacja działa w nowoczesnych przeglądarkach:
- ✅ Chrome/Edge (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)
- ✅ Opera (v76+)

## Rozwiązywanie Problemów

### Problem: Obrazy się nie ładują
**Rozwiązanie**: Upewnij się, że katalog `public/img/` znajduje się w tym samym folderze co `index.html`

### Problem: Przyciski nie działają
**Rozwiązanie**: Sprawdź konsolę przeglądarki (F12) w poszukiwaniu błędów JavaScript

### Problem: Style się nie aplikują
**Rozwiązanie**: Upewnij się, że `styles.css` jest w tym samym katalogu co `index.html`

## Kontakt i Feedback

Masz sugestie lub znalazłeś błąd? Utwórz issue w repozytorium projektu!

---

**Have a great Grand Tournament!** 🏰⚔️🎲
