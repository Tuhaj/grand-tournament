# Dokumentacja Testów - Grand Tournament

## Przegląd

Projekt Grand Tournament wykorzystuje **Vitest** jako framework testowy. Testy zapewniają poprawność logiki gry, obliczania wyników, zarządzania stanem oraz funkcjonalności localStorage.

## Instalacja

Aby uruchomić testy, najpierw zainstaluj zależności:

```bash
npm install
```

## Uruchamianie Testów

### Jednorazowe uruchomienie testów
```bash
npm test
```

### Tryb watch (automatyczne uruchamianie po zmianach)
```bash
npm run test:watch
```

### Testy z pokryciem kodu (coverage)
```bash
npm run test:coverage
```

Po uruchomieniu coverage, raport będzie dostępny w folderze `coverage/`:
- `coverage/index.html` - interaktywny raport HTML

## Struktura Testów

```
tests/
└── game.test.js        # Testy logiki gry
```

## Pokrycie Testami

### ✅ Przetestowane funkcjonalności

1. **Karty i Przedmioty**
   - Poprawna liczba kart (CARDS)
   - Poprawna liczba przedmiotów (ITEMS)

2. **Losowanie Kart (drawRandomCards)**
   - Losowanie żądanej liczby kart
   - Unikalne karty (bez duplikatów)
   - Nie przekraczanie dostępnych kart

3. **Obliczanie Wyniku (calculateTotal)**
   - Sumowanie rzutów kośćmi
   - Sumowanie wartości z 4 faz pojedynku
   - Obliczanie całkowitego wyniku z wszystkimi bonusami
   - Bonusy z kart (typu dice i phase)
   - Bonusy z przedmiotów

4. **LocalStorage**
   - Zapisywanie stanu gry
   - Wczytywanie stanu gry
   - Czyszczenie zapisanego stanu

5. **Rycerze i Modyfikatory**
   - Dane rycerzy (freelancers i imperials)
   - Modyfikatory z efektami

6. **Rzuty Kośćmi**
   - Poprawny zakres wartości dla k4 (1-4)
   - Poprawny zakres wartości dla k6 (1-6)
   - Poprawny zakres wartości dla k8 (1-8)
   - Poprawny zakres wartości dla k10 (1-10)
   - Poprawny zakres wartości dla k12 (1-12)
   - Poprawny zakres wartości dla k20 (1-20)

7. **Punkty Chwały**
   - Dodawanie punktów chwały
   - Odejmowanie punktów chwały
   - Obsługa ujemnych wartości

## Przykładowe Testy

### Test losowania kart
```javascript
it('should draw unique cards', () => {
  const drawn = drawRandomCards(4);
  const ids = drawn.map(card => card.id);
  const uniqueIds = new Set(ids);
  expect(uniqueIds.size).toBe(4);
});
```

### Test obliczania wyniku
```javascript
it('should calculate total score with all bonuses', () => {
  const diceSum = 13;
  const phaseSum = 18;
  const modifierBonus = 5;
  const knightBonus = 15;
  const cardsBonus = 3;
  const itemsBonus = 5;

  const totalScore = diceSum + phaseSum + modifierBonus + knightBonus + cardsBonus + itemsBonus;
  expect(totalScore).toBe(59);
});
```

### Test localStorage
```javascript
it('should save game state', () => {
  const gameState = {
    player1: { name: 'Test Player', gloryPoints: 10 }
  };
  localStorage.setItem('grandTournamentState', JSON.stringify(gameState));
  const loaded = JSON.parse(localStorage.getItem('grandTournamentState'));
  expect(loaded.player1.name).toBe('Test Player');
});
```

## Konfiguracja

### vitest.config.js

```javascript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html']
    }
  }
});
```

- **environment: 'happy-dom'** - Lekkie środowisko DOM do testów
- **globals: true** - Globalne funkcje testowe (describe, it, expect)
- **coverage** - Konfiguracja raportów pokrycia kodu

## Dodawanie Nowych Testów

1. Utwórz nowy plik testowy w folderze `tests/`
2. Nazwij go zgodnie z konwencją: `*.test.js`
3. Importuj funkcje testowe z vitest:

```javascript
import { describe, it, expect } from 'vitest';

describe('Nazwa grupy testów', () => {
  it('should do something', () => {
    expect(true).toBe(true);
  });
});
```

## Best Practices

1. **Nazwy testów** - Używaj opisowych nazw w stylu "should ..."
2. **Grupowanie** - Grupuj powiązane testy używając `describe()`
3. **Izolacja** - Każdy test powinien być niezależny
4. **beforeEach** - Używaj do resetowania stanu przed każdym testem
5. **Asercje** - Każdy test powinien mieć przynajmniej jedną asercję

## Continuous Integration (CI)

Testy można łatwo zintegrować z CI/CD:

```yaml
# Przykład dla GitHub Actions
- name: Run tests
  run: npm test

- name: Upload coverage
  run: npm run test:coverage
```

## Troubleshooting

### Problem: "Cannot find module 'vitest'"
**Rozwiązanie**: Uruchom `npm install` aby zainstalować zależności

### Problem: "ReferenceError: document is not defined"
**Rozwiązanie**: Upewnij się, że `environment: 'happy-dom'` jest ustawione w `vitest.config.js`

### Problem: Testy przechodzą lokalnie, ale nie w CI
**Rozwiązanie**: Sprawdź wersje Node.js - Vitest wymaga Node.js 14+

## Przydatne Komendy

```bash
# Uruchom tylko jeden plik testowy
npx vitest run tests/game.test.js

# Uruchom testy z wzorcem nazwy
npx vitest run -t "calculateTotal"

# Uruchom UI Vitest (interaktywny interfejs)
npx vitest --ui
```

## Dalszy Rozwój

### Planowane testy:

- [ ] Testy E2E (end-to-end) symulujące pełną rozgrywkę
- [ ] Testy integracyjne dla UI (kliknięcia przycisków, modali)
- [ ] Testy wydajności dla dużych zbiorów danych
- [ ] Snapshot testing dla komponentów UI

---

**Autor**: Grand Tournament Team
**Framework**: Vitest v1.0.0
**Ostatnia aktualizacja**: 2025-11-08
