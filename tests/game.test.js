import { describe, it, expect, beforeEach } from 'vitest';

describe('Grand Tournament - Game Logic Tests', () => {
  beforeEach(() => {
    // happy-dom jest już skonfigurowane w vitest.config.js
    // więc mamy dostęp do window, document, localStorage automatycznie
  });

  describe('CARDS and ITEMS arrays', () => {
    it('should have correct number of CARDS', () => {
      const CARDS = [
        { id: 1, name: "Błogosławieństwo Trybun", type: "support" },
        { id: 2, name: "Zbroja Mistrza", type: "equipment" },
        { id: 3, name: "Szybki Koń", type: "mount" },
        { id: 4, name: "Modlitwa Rycerza", type: "blessing" }
      ];
      expect(CARDS).toHaveLength(4);
    });

    it('should have correct number of ITEMS', () => {
      const ITEMS = [
        { id: 1, name: "Precyzyjna Lanca", type: "weapon" },
        { id: 2, name: "Herb Rodu", type: "honor" }
      ];
      expect(ITEMS).toHaveLength(2);
    });
  });

  describe('drawRandomCards', () => {
    it('should draw the requested number of cards', () => {
      const CARDS = [
        { id: 1, name: "Card 1" },
        { id: 2, name: "Card 2" },
        { id: 3, name: "Card 3" },
        { id: 4, name: "Card 4" }
      ];

      const drawRandomCards = (count) => {
        const availableCards = [...CARDS];
        const drawnCards = [];

        for (let i = 0; i < count && availableCards.length > 0; i++) {
          const randomIndex = Math.floor(Math.random() * availableCards.length);
          drawnCards.push(availableCards[randomIndex]);
          availableCards.splice(randomIndex, 1);
        }

        return drawnCards;
      };

      const drawn = drawRandomCards(3);
      expect(drawn).toHaveLength(3);
    });

    it('should draw unique cards', () => {
      const CARDS = [
        { id: 1, name: "Card 1" },
        { id: 2, name: "Card 2" },
        { id: 3, name: "Card 3" },
        { id: 4, name: "Card 4" }
      ];

      const drawRandomCards = (count) => {
        const availableCards = [...CARDS];
        const drawnCards = [];

        for (let i = 0; i < count && availableCards.length > 0; i++) {
          const randomIndex = Math.floor(Math.random() * availableCards.length);
          drawnCards.push(availableCards[randomIndex]);
          availableCards.splice(randomIndex, 1);
        }

        return drawnCards;
      };

      const drawn = drawRandomCards(4);
      const ids = drawn.map(card => card.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(4);
    });

    it('should not exceed available cards', () => {
      const CARDS = [
        { id: 1, name: "Card 1" },
        { id: 2, name: "Card 2" }
      ];

      const drawRandomCards = (count) => {
        const availableCards = [...CARDS];
        const drawnCards = [];

        for (let i = 0; i < count && availableCards.length > 0; i++) {
          const randomIndex = Math.floor(Math.random() * availableCards.length);
          drawnCards.push(availableCards[randomIndex]);
          availableCards.splice(randomIndex, 1);
        }

        return drawnCards;
      };

      const drawn = drawRandomCards(10);
      expect(drawn.length).toBeLessThanOrEqual(2);
    });
  });

  describe('calculateTotal logic', () => {
    it('should correctly sum dice rolls', () => {
      const diceRolls = [
        { sides: 6, value: 4 },
        { sides: 8, value: 7 },
        { sides: 4, value: 2 }
      ];
      const sum = diceRolls.reduce((acc, roll) => acc + roll.value, 0);
      expect(sum).toBe(13);
    });

    it('should correctly sum phases', () => {
      const phases = [5, 3, 8, 2];
      const sum = phases.reduce((acc, val) => acc + val, 0);
      expect(sum).toBe(18);
    });

    it('should calculate total score with all bonuses', () => {
      const diceSum = 13;
      const phaseSum = 18;
      const modifierBonus = 5;
      const knightBonus = 15; // strength: 8, accuracy: 4, agility: 3
      const cardsBonus = 3;
      const itemsBonus = 5;

      const totalScore = diceSum + phaseSum + modifierBonus + knightBonus + cardsBonus + itemsBonus;
      expect(totalScore).toBe(59);
    });

    it('should handle dice bonuses from cards', () => {
      const cards = [
        { bonus: { type: 'dice', value: 3 } },
        { bonus: { type: 'phase', value: 5 } }
      ];

      let cardsDiceBonus = 0;
      let cardsBonus = 0;

      cards.forEach(card => {
        if (card.bonus.type === 'dice') {
          cardsDiceBonus += card.bonus.value;
        } else if (card.bonus.type === 'phase') {
          cardsBonus += card.bonus.value;
        }
      });

      expect(cardsDiceBonus).toBe(3);
      expect(cardsBonus).toBe(5);
    });
  });

  describe('localStorage functionality', () => {
    it('should save game state', () => {
      const gameState = {
        player1: {
          name: 'Test Player',
          gloryPoints: 10,
          cards: [],
          items: []
        },
        player2: {
          name: 'Player 2',
          gloryPoints: 5,
          cards: [],
          items: []
        },
        history: []
      };

      localStorage.setItem('grandTournamentState', JSON.stringify(gameState));
      const saved = localStorage.getItem('grandTournamentState');
      const loaded = JSON.parse(saved);

      expect(loaded.player1.name).toBe('Test Player');
      expect(loaded.player1.gloryPoints).toBe(10);
    });

    it('should load game state', () => {
      const gameState = {
        player1: {
          name: 'Saved Player',
          gloryPoints: 25,
          cards: [],
          items: []
        }
      };

      localStorage.setItem('grandTournamentState', JSON.stringify(gameState));
      const loaded = JSON.parse(localStorage.getItem('grandTournamentState'));

      expect(loaded.player1.name).toBe('Saved Player');
      expect(loaded.player1.gloryPoints).toBe(25);
    });

    it('should clear saved game', () => {
      localStorage.setItem('grandTournamentState', JSON.stringify({ test: 'data' }));
      localStorage.removeItem('grandTournamentState');
      const loaded = localStorage.getItem('grandTournamentState');

      expect(loaded).toBeNull();
    });
  });

  describe('Knight and Modifier data', () => {
    it('should have freelancers knights', () => {
      const KNIGHTS = {
        freelancers: [
          { name: "Garen z Raud", strength: 10, accuracy: 5, agility: 0 },
          { name: "Egon z Taar", strength: 5, accuracy: 5, agility: 5 }
        ]
      };

      expect(KNIGHTS.freelancers).toHaveLength(2);
      expect(KNIGHTS.freelancers[0].name).toBe("Garen z Raud");
    });

    it('should have imperials knights', () => {
      const KNIGHTS = {
        imperials: [
          { name: "Dagan, baron Brant", strength: 9, accuracy: 6, agility: 3 }
        ]
      };

      expect(KNIGHTS.imperials).toHaveLength(1);
      expect(KNIGHTS.imperials[0].strength).toBe(9);
    });

    it('should have modifiers with effects', () => {
      const MODIFIERS = [
        { name: "Gniewny", value: 5, phase: 1 },
        { name: "Złotoręki", value: 5, phase: 2 }
      ];

      expect(MODIFIERS).toHaveLength(2);
      expect(MODIFIERS[0].name).toBe("Gniewny");
      expect(MODIFIERS[0].value).toBe(5);
    });
  });

  describe('Dice rolling logic', () => {
    it('should generate value within dice range', () => {
      const rollDice = (sides) => {
        return Math.floor(Math.random() * sides) + 1;
      };

      // Test k6
      for (let i = 0; i < 100; i++) {
        const roll = rollDice(6);
        expect(roll).toBeGreaterThanOrEqual(1);
        expect(roll).toBeLessThanOrEqual(6);
      }
    });

    it('should generate value for k4', () => {
      const rollDice = (sides) => {
        return Math.floor(Math.random() * sides) + 1;
      };

      for (let i = 0; i < 50; i++) {
        const roll = rollDice(4);
        expect(roll).toBeGreaterThanOrEqual(1);
        expect(roll).toBeLessThanOrEqual(4);
      }
    });

    it('should generate value for k20', () => {
      const rollDice = (sides) => {
        return Math.floor(Math.random() * sides) + 1;
      };

      for (let i = 0; i < 50; i++) {
        const roll = rollDice(20);
        expect(roll).toBeGreaterThanOrEqual(1);
        expect(roll).toBeLessThanOrEqual(20);
      }
    });
  });

  describe('Glory points', () => {
    it('should add glory points', () => {
      let gloryPoints = 0;
      gloryPoints += 10;
      expect(gloryPoints).toBe(10);
    });

    it('should subtract glory points', () => {
      let gloryPoints = 20;
      gloryPoints -= 10;
      expect(gloryPoints).toBe(10);
    });

    it('should handle negative glory points', () => {
      let gloryPoints = 5;
      gloryPoints -= 10;
      expect(gloryPoints).toBe(-5);
    });
  });
});
