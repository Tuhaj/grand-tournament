# Grand Tournament - Turniej Rycerski

Gra karciana osadzona w świecie fantasy, w której gracze kierują drużynami rycerzy walczących o chwałę podczas królewskiego turnieju.

## Opis gry

Witaj w świecie fantasy, gdzie odbywa się wielki turniej rycerski! Gracze posiadają kilkuosobowe drużyny rycerzy, którzy po kolei kruszą ze sobą kopie, walcząc o uznanie króla i zbierając punkty chwały.

## Mechanika rozgrywki

### 1. Przygotowanie do pojedynku

Każdy pojedynek składa się z 4 faz, przez które musi przejść rycerz:
- **Wybór rycerza** - gracz wybiera kartę rycerza ze swojej drużyny
- **Zdolności specjalne** - każdy rycerz posiada unikalne umiejętności (np. jak dobrze jeździ konno)
- **Nadanie przydomka** - gracz przypisuje rycerzowi przydomek z karty przydomków (np. "Wielki", "Szybki", "Odważny")

**Przykład:** Sir Arthur Wielki - przydomek "Wielki" ułatwia trafienie rycerza, ale utrudnia wyrzucenie go z siodła.

### 2. System trybun - Wieśniacy

To tutaj dzieje się cała magia strategii! Wieśniacy na trybunach są kluczem do zwycięstwa.

#### Pozycjonowanie tłumu
- Gracze ustawiają tłum wieśniaków na trybunach
- Aktywują odcinki trybuny odpowiadające fazom pojedynku rycerza:
  - Rozpęd
  - Skupienie
  - Uderzenie
  - Finalizacja

#### System rzędów i premii
Trybuny podzielone są na 3 rzędy, każdy daje inną premię:
1. **Rząd 1 (pierwszy)** - daje premię 1k8 (największa premia)
2. **Rząd 2 (środkowy)** - daje premię 1k6
3. **Rząd 3 (tylny)** - daje premię 1k4 (najmniejsza premia)

### 3. Postacie specjalne

W tłumie wieśniaków mogą znajdować się wyjątkowe postacie! Gracz wyciąga kartę postaci specjalnej i zamienia wybranego wieśniaka na "figurkę specjalną".

#### Przykładowe postacie:

**Bard** (inspirująca)
- Otrzymuje kostkę premii w zależności od rzędu, w którym stoi
- Inspiruje rycerza swoją muzyką
- Wszyscy wieśniacy obok, przed i za Bardem otrzymują kość i śpiewają razem z nim
- Zwiększa tym samym całkowitą premię

**Inne postacie:**
- Baba ze straganu
- Chorąży
- Grubas jedzący kurczaki
- Cycata kobieta
- Szczurołap
- Błazen
- ...i wiele innych!

Postacie mogą być:
- **Inspirujące** - zwiększają wynik rycerza
- **Demotywujące** - zmniejszają wynik przeciwnika

### 4. Strategia

Gracze pozycjonują swoje postacie niczym w szachach, starając się:
- Przepychać wieśniaków, aby zająć najlepsze miejsca
- Umieszczać postacie specjalne w optymalnych rzędach
- Aktywować synergię między postaciami
- Wykręcić jak najwyższy wynik dla swojego rycerza

## Punkty chwały

### Zdobywanie punktów

Po wygranej walce król przyznaje rycerzowi punkty chwały za styl:
- **Skruszenie kopii** - punkty za precyzyjne uderzenie
- **Wyrzucenie z siodła** - punkty za spektakularne zwycięstwo
- **Uderzenie w konia** - punkty karne (odjęcie punktów)

### Wydawanie punktów chwały

Punkty chwały można poświęcić strategicznie:
- Gdy sytuacja rycerza nie wygląda najlepiej
- Gdy brakuje niewiele do spektakularnej wygranej
- Usuwamy wybraną liczbę punktów chwały
- Dodajemy je do wyniku na kości jako premię

## Cel gry

Zbierz najwięcej punktów chwały dla swojej drużyny rycerzy i zdobądź uznanie króla!

## Technologia

Gra działa w przeglądarce i oferuje:
- Tworzenie zestawów kart dla graczy
- Opis zdolności postaci
- Automatyczne obliczanie wyników gry
- Interaktywną rozgrywkę

### Stack technologiczny
- **Vanilla JavaScript** (ES6+) - czysta logika gry bez frameworków
- **HTML5 + CSS3** - responsywny interfejs
- **Bootstrap 5.3.0** - komponenty UI i system gridowy
- **LocalStorage** - automatyczny zapis stanu gry

### Funkcje aplikacji
- **Automatyczny zapis** - gra zapisuje się po każdej akcji
- **System kości** - 6 typów kości (k4, k6, k8, k10, k12, k20)
- **Historia rozgrywki** - pełny log wszystkich akcji
- **Responsywność** - działa na desktopie i urządzeniach mobilnych
- **Punkty chwały** - system meta-waluty do strategicznych decyzji

## Jak uruchomić

### Metoda 1: Bezpośrednio w przeglądarce
Otwórz plik `index.html` w przeglądarce.

### Metoda 2: Lokalny serwer (zalecane)
```bash
# Python 3
python3 -m http.server 8000

# Lub npx
npx http-server -p 8000
```

Następnie otwórz: http://localhost:8000

### Deployment
Projekt jest skonfigurowany do automatycznego deploymentu na Vercel:
```bash
npm run build  # Buduje wersję produkcyjną do folderu dist/
```

## Dokumentacja

- **DESIGN_GUIDELINES.md** - Szczegółowy system projektowania wizualnego
- **INSTRUKCJA.md** - Instrukcja użytkownika i rozwiązywanie problemów
- **CLAUDE.md** - Dokumentacja techniczna dla programistów

## Dane gry

### Rycerze
- **Błędni Rycerze (Freelancerzy):** 5 rycerzy z kolorowymi zbrojami
- **Imperialni Rycerze (Elita):** 5 rycerzy w czarnych zbrojach
- Każdy rycerz ma unikalne statystyki: Siła, Celność, Zręczność

### Przydomki
12 unikalnych przydomków wpływających na różne fazy pojedynku:
- Gniewny, Jednooki, Złotoręki, Jurny, Wytrwały
- Nieznany, Niezłomny, Pobożny, Piękny i inne

### Karty wsparcia
4 karty specjalne rozdawane losowo (3 na gracza):
- Wsparcie, Ekwipunek, Wierzchowiec, Błogosławieństwo

### Przedmioty
2 przedmioty/artefakty do wybrania przez graczy

## Fazy pojedynku

1. **Faza 1 - Rozpęd:** Siła i momentum ataku
2. **Faza 2 - Skupienie:** Celność i precyzja
3. **Faza 3 - Uderzenie:** Główny atak
4. **Faza 4 - Finalizacja:** Zakończenie i efekty końcowe

Wynik = Rzuty kośćmi + Bonusy z faz + Modyfikatory + Statystyki rycerza + Karty + Przedmioty

---

**Have a great Grand Tournament!**
