// Grand Tournament - Game Logic
// Aplikacja do losowania kart, rzucania kośćmi i liczenia punktów

// Splash Screen
(function() {
    const splashImages = [
        'public/img/splash-screen.png',
        'public/img/splash-screen-2.png'
    ];

    // Losowy wybór obrazka
    const randomImage = splashImages[Math.floor(Math.random() * splashImages.length)];
    const splashImageElement = document.getElementById('splashImage');

    if (splashImageElement) {
        splashImageElement.src = randomImage;
    }

    // Ukryj splash screen po 2.5 sekundach
    setTimeout(() => {
        const splashScreen = document.getElementById('splashScreen');
        if (splashScreen) {
            splashScreen.classList.add('hidden');

            // Usuń element z DOM po zakończeniu animacji
            setTimeout(() => {
                splashScreen.remove();
            }, 500);
        }
    }, 2500);
})();

// Karty do gry - każdy gracz dostaje losowe karty na początku gry
const CARDS = [
    {
        id: 1,
        name: "Błogosławieństwo Trybun",
        image: "public/img/cards/card-1.png",
        type: "support",
        effect: "+3 do wszystkich rzutów kośćmi",
        description: "Doping z trybun dodaje pewności siebie",
        bonus: { type: "dice", value: 3 }
    },
    {
        id: 2,
        name: "Zbroja Mistrza",
        image: "public/img/cards/card-2.png",
        type: "equipment",
        effect: "+5 do obrony (faza 3)",
        description: "Zbroja wykuta przez najlepszego kowala",
        bonus: { type: "phase", phase: 3, value: 5 }
    },
    {
        id: 3,
        name: "Szybki Koń",
        image: "public/img/cards/card-3.png",
        type: "mount",
        effect: "+4 do rozpędu (faza 1)",
        description: "Rasowy wierzchowiec zwiększa prędkość",
        bonus: { type: "phase", phase: 1, value: 4 }
    },
    {
        id: 4,
        name: "Precyzyjna Lanca",
        image: "public/img/cards/card-4.png",
        type: "weapon",
        effect: "+5 do celności (faza 2)",
        description: "Idealnie wyważona broń turniejowa",
        bonus: { type: "phase", phase: 2, value: 5 }
    },
    {
        id: 5,
        name: "Herb Rodu",
        image: "public/img/cards/card-5.png",
        type: "honor",
        effect: "+15 punktów chwały po zwycięstwie",
        description: "Honor rodziny motywuje do walki",
        bonus: { type: "glory", value: 15 }
    },
    {
        id: 6,
        name: "Modlitwa Rycerza",
        image: "public/img/cards/card-6.png",
        type: "blessing",
        effect: "Powtórz jeden rzut kości",
        description: "Boskie wsparcie w krytycznym momencie",
        bonus: { type: "reroll", value: 1 }
    }
];

// Dane gry
const KNIGHTS = {
    freelancers: [
        { name: "Garen z Raud", strength: 10, accuracy: 5, agility: 0, description: "Nieustępliwy margrabia" },
        { name: "Egon z Taar", strength: 5, accuracy: 5, agility: 5, description: "Były wojownik" },
        { name: "Kiara z Lestry", strength: 8, accuracy: 7, agility: 3, description: "Dzielna wojowniczka" },
        { name: "Roland z Gers", strength: 7, accuracy: 6, agility: 4, description: "Trzeźwy jeździec" },
        { name: "Gizela z Gauden", strength: 6, accuracy: 8, agility: 5, description: "Zaufana córka margrabiego" }
    ],
    imperials: [
        { name: "Dagan, baron Brant", strength: 9, accuracy: 6, agility: 3, description: "Wasal Królestwa" },
        { name: "Egmund, hrabia Argen", strength: 8, accuracy: 7, agility: 4, description: "Bohater Królestwa" },
        { name: "Renhart z Gers", strength: 10, accuracy: 5, agility: 2, description: "Wasal hrabiego Gers" },
        { name: "Faro z Gauden", strength: 7, accuracy: 9, agility: 5, description: "Pierwszy syn margrabiego" },
        { name: "Gwidon z Mereii", strength: 6, accuracy: 8, agility: 7, description: "Tajny rycerz margrabiego" }
    ]
};

const MODIFIERS = [
    { name: "Gniewny", effect: "+5 do siły rozpędu (faza 1)", modifier: -1, value: 5, phase: 1 },
    { name: "Jednooki", effect: "-5 do trafności (faza 2)", modifier: 1, value: -5, phase: 2 },
    { name: "Złotoręki", effect: "+5 do trafności (faza 2)", modifier: -1, value: 5, phase: 2 },
    { name: "Jurny", effect: "-5 do odporności na wpływy z trybun", modifier: 1, value: -5, phase: 0 },
    { name: "Wytrwały", effect: "+5 do obrony (faza 3)", modifier: -1, value: 5, phase: 3 },
    { name: "Nieznany", effect: "+10 punktów chwały po wygranej (x2)", modifier: -1, value: 10, phase: 0 },
    { name: "Niezłomny", effect: "Testy obronne → powtórka rzutu", modifier: -1, value: 0, phase: 0 },
    { name: "Pobożny", effect: "Można powtórzyć rzut premii od duchownych", modifier: -1, value: 0, phase: 0 },
    { name: "Piękny", effect: "Dodatkowe punkty za styl (x2)", modifier: -1, value: 0, phase: 0 },
    { name: "Wielki", effect: "Ułatwia trafienie, utrudnia wyrzucenie", modifier: -1, value: 3, phase: 2 },
    { name: "Szybki", effect: "+5 do rozpędu (faza 1)", modifier: 1, value: 5, phase: 1 },
    { name: "Odważny", effect: "+3 do wszystkich faz", modifier: -1, value: 3, phase: 0 }
];

// Stan gry
const gameState = {
    player1: {
        knight: null,
        modifier: null,
        cards: [],
        diceRolls: [],
        phases: [0, 0, 0, 0],
        gloryPoints: 0,
        total: 0
    },
    player2: {
        knight: null,
        modifier: null,
        cards: [],
        diceRolls: [],
        phases: [0, 0, 0, 0],
        gloryPoints: 0,
        total: 0
    },
    history: []
};

// LocalStorage functions
function saveGame() {
    try {
        localStorage.setItem('grandTournamentState', JSON.stringify(gameState));
    } catch (e) {
        console.error('Error saving game to localStorage:', e);
    }
}

function loadGame() {
    try {
        const saved = localStorage.getItem('grandTournamentState');
        if (saved) {
            const loaded = JSON.parse(saved);
            Object.assign(gameState, loaded);

            // Restore UI
            restoreUI();
            addToHistory('💾 Gra wczytana z ostatniego zapisu');
            return true;
        }
    } catch (e) {
        console.error('Error loading game from localStorage:', e);
    }
    return false;
}

function restoreUI() {
    // Restore knights
    for (let player = 1; player <= 2; player++) {
        const playerState = gameState[`player${player}`];

        if (playerState.knight) {
            displayKnight(player, playerState.knight, playerState.knight.faction);
        }

        if (playerState.modifier) {
            displayModifier(player, playerState.modifier);
        }

        if (playerState.diceRolls.length > 0) {
            displayDiceRoll(player);
        }

        // Restore phases
        for (let i = 1; i <= 4; i++) {
            const value = playerState.phases[i - 1];
            if (value > 0) {
                document.getElementById(`phase${i}_${player}`).value = value;
            }
        }

        // Restore glory points
        document.getElementById(`glory${player}`).textContent = playerState.gloryPoints;

        // Update mobile score
        updateMobileScore();
    }
}

function clearSavedGame() {
    localStorage.removeItem('grandTournamentState');
}

// Update mobile score display
function updateMobileScore() {
    const score1 = gameState.player1.gloryPoints;
    const score2 = gameState.player2.gloryPoints;

    const mobileScore1 = document.getElementById('mobileScore1');
    const mobileScore2 = document.getElementById('mobileScore2');

    if (mobileScore1) mobileScore1.textContent = score1;
    if (mobileScore2) mobileScore2.textContent = score2;

    // Highlight winner
    const tab1 = document.querySelector('[data-bs-target="#player1Tab"]');
    const tab2 = document.querySelector('[data-bs-target="#player2Tab"]');

    if (tab1 && tab2) {
        tab1.classList.remove('winning');
        tab2.classList.remove('winning');

        if (score1 > score2 && score1 > 0) {
            tab1.classList.add('winning');
        } else if (score2 > score1 && score2 > 0) {
            tab2.classList.add('winning');
        }
    }
}

// Inicjalizacja
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();

    // Try to load saved game
    if (!loadGame()) {
        addToHistory('🎮 Gra rozpoczęta! Wybierzcie rycerzy i przydomki.');
    }

    updateMobileScore();
});

function setupEventListeners() {
    document.getElementById('newGameBtn').addEventListener('click', newGame);
    document.getElementById('resetBtn').addEventListener('click', resetGame);
}

// Sprawdź czy gra została rozpoczęta
function checkGameStarted() {
    return gameState.player1.cards.length > 0 || gameState.player2.cards.length > 0;
}

// Losowanie rycerza
function drawKnight(player) {
    // Sprawdź czy gra została rozpoczęta
    if (!checkGameStarted()) {
        if (confirm('Najpierw musisz rozpocząć nową grę! Czy chcesz rozpocząć teraz?')) {
            newGame();
            // Po rozpoczęciu gry, kontynuuj losowanie
        } else {
            return;
        }
    }

    const faction = Math.random() > 0.5 ? 'freelancers' : 'imperials';
    const knights = KNIGHTS[faction];
    const knight = knights[Math.floor(Math.random() * knights.length)];

    gameState[`player${player}`].knight = { ...knight, faction };

    displayKnight(player, knight, faction);
    addToHistory(`⚔️ Gracz ${player} wylosował: ${knight.name} (${faction === 'freelancers' ? 'Błędny Rycerz' : 'Imperialny'})`);
    saveGame();
}

function displayKnight(player, knight, faction) {
    const container = document.getElementById(`knight${player}`);
    const factionBadge = faction === 'freelancers'
        ? '<span class="badge bg-purple text-white">Błędny Rycerz</span>'
        : '<span class="badge bg-info text-dark">Imperialny</span>';

    container.innerHTML = `
        <div class="card-content fade-in">
            <div class="card-name">${knight.name}</div>
            ${factionBadge}
            <div class="card-stats mt-2">
                <span class="stat-badge stat-strength"><i class="bi bi-lightning-fill"></i> Siła: ${knight.strength}</span>
                <span class="stat-badge stat-accuracy"><i class="bi bi-bullseye"></i> Celność: ${knight.accuracy}</span>
                <span class="stat-badge stat-agility"><i class="bi bi-speedometer"></i> Zręczność: ${knight.agility}</span>
            </div>
            <p class="card-description">${knight.description}</p>
        </div>
    `;
}

// Losowanie przydomka
function drawModifier(player) {
    // Sprawdź czy gra została rozpoczęta
    if (!checkGameStarted()) {
        if (confirm('Najpierw musisz rozpocząć nową grę! Czy chcesz rozpocząć teraz?')) {
            newGame();
            // Po rozpoczęciu gry, kontynuuj losowanie
        } else {
            return;
        }
    }

    const modifier = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];

    gameState[`player${player}`].modifier = modifier;

    displayModifier(player, modifier);
    addToHistory(`🎭 Gracz ${player} otrzymał przydomek: ${modifier.name} (${modifier.effect})`);
    saveGame();
}

function displayModifier(player, modifier) {
    const container = document.getElementById(`modifier${player}`);
    const modifierClass = modifier.modifier > 0 ? 'modifier-negative' : 'modifier-positive';
    const modifierIcon = modifier.modifier > 0 ? '⚠️' : '✨';

    container.innerHTML = `
        <div class="card-content fade-in">
            <div class="card-name">${modifierIcon} ${modifier.name}</div>
            <span class="badge ${modifierClass === 'modifier-positive' ? 'bg-success' : 'bg-danger'} mb-2">
                ${modifier.effect}
            </span>
        </div>
    `;
}

// Rzucanie kośćmi
function rollDice(player, sides) {
    const roll = Math.floor(Math.random() * sides) + 1;

    gameState[`player${player}`].diceRolls.push({ sides, value: roll });

    displayDiceRoll(player);
    addToHistory(`🎲 Gracz ${player} rzucił k${sides}: wynik ${roll}`);

    // Animacja
    const resultContainer = document.getElementById(`diceResult${player}`);
    resultContainer.classList.add('pulse');
    setTimeout(() => resultContainer.classList.remove('pulse'), 500);

    saveGame();
}

function displayDiceRoll(player) {
    const rolls = gameState[`player${player}`].diceRolls;
    const container = document.getElementById(`diceResult${player}`).querySelector('.result-display');

    if (rolls.length === 0) {
        container.innerHTML = '-';
        return;
    }

    let html = '';
    let sum = 0;

    rolls.forEach(roll => {
        html += `<span class="roll-item">k${roll.sides}: ${roll.value}</span>`;
        sum += roll.value;
    });

    container.innerHTML = html;
    document.getElementById(`total${player}`).textContent = sum;

    gameState[`player${player}`].total = sum;
}

// Obliczanie wyniku
function calculateTotal(player) {
    const state = gameState[`player${player}`];

    // Pobierz wartości z faz
    for (let i = 1; i <= 4; i++) {
        const input = document.getElementById(`phase${i}_${player}`);
        state.phases[i - 1] = parseInt(input.value) || 0;
    }

    // Suma z kości
    let diceSum = state.diceRolls.reduce((sum, roll) => sum + roll.value, 0);

    // Suma z faz
    let phaseSum = state.phases.reduce((sum, val) => sum + val, 0);

    // Modyfikator z przydomka
    let modifierBonus = 0;
    if (state.modifier) {
        modifierBonus = state.modifier.value;
    }

    // Statystyki rycerza
    let knightBonus = 0;
    if (state.knight) {
        knightBonus = state.knight.strength + state.knight.accuracy + state.knight.agility;
    }

    const totalScore = diceSum + phaseSum + modifierBonus + knightBonus;

    // Wyświetl wynik
    document.getElementById(`total${player}`).textContent = totalScore;

    addToHistory(`📊 Gracz ${player} - Wynik całkowity: ${totalScore} (Kości: ${diceSum}, Fazy: ${phaseSum}, Modyfikator: ${modifierBonus}, Rycerz: ${knightBonus})`);

    // Animacja
    const totalElement = document.getElementById(`total${player}`);
    totalElement.parentElement.classList.add('pulse');
    setTimeout(() => totalElement.parentElement.classList.remove('pulse'), 500);

    saveGame();
    return totalScore;
}

// Dodawanie/odejmowanie punktów chwały
function addGlory(player, amount) {
    gameState[`player${player}`].gloryPoints += amount;

    const gloryElement = document.getElementById(`glory${player}`);
    gloryElement.textContent = gameState[`player${player}`].gloryPoints;

    // Animacja
    gloryElement.classList.add('pulse');
    setTimeout(() => gloryElement.classList.remove('pulse'), 500);

    const action = amount > 0 ? 'zdobył' : 'stracił';
    addToHistory(`⭐ Gracz ${player} ${action} ${Math.abs(amount)} punktów chwały! Razem: ${gameState[`player${player}`].gloryPoints}`);

    updateMobileScore();
    saveGame();
}

// Historia
function addToHistory(message) {
    const timestamp = new Date().toLocaleTimeString('pl-PL');
    const historyItem = {
        time: timestamp,
        message: message
    };

    gameState.history.unshift(historyItem);

    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyContainer = document.getElementById('history');

    if (gameState.history.length === 0) {
        historyContainer.innerHTML = '<p style="color: #999; text-align: center;">Historia jest pusta</p>';
        return;
    }

    let html = '';
    gameState.history.slice(0, 20).forEach(item => {
        html += `
            <div class="history-item fade-in">
                <span class="timestamp">${item.time}</span>
                ${item.message}
            </div>
        `;
    });

    historyContainer.innerHTML = html;
}

// Losowanie unikalnych kart
function drawRandomCards(count) {
    const availableCards = [...CARDS];
    const drawnCards = [];

    for (let i = 0; i < count && availableCards.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * availableCards.length);
        drawnCards.push(availableCards[randomIndex]);
        availableCards.splice(randomIndex, 1);
    }

    return drawnCards;
}

// Nowa gra
function newGame() {
    if (confirm('Czy na pewno chcesz rozpocząć nową grę? Obecny postęp zostanie utracony.')) {
        clearSavedGame();
        resetGame();

        // Rozdaj karty graczom
        gameState.player1.cards = drawRandomCards(3);
        gameState.player2.cards = drawRandomCards(3);

        addToHistory('🎮 Rozpoczęto nową grę!');
        addToHistory(`🃏 Gracz 1 otrzymał ${gameState.player1.cards.length} kart`);
        addToHistory(`🃏 Gracz 2 otrzymał ${gameState.player2.cards.length} kart`);

        updateMobileScore();
        saveGame();
    }
}

// Reset gry
function resetGame() {
    // Reset stanu
    gameState.player1 = {
        knight: null,
        modifier: null,
        cards: [],
        diceRolls: [],
        phases: [0, 0, 0, 0],
        gloryPoints: 0,
        total: 0
    };

    gameState.player2 = {
        knight: null,
        modifier: null,
        cards: [],
        diceRolls: [],
        phases: [0, 0, 0, 0],
        gloryPoints: 0,
        total: 0
    };

    // Reset UI
    for (let player = 1; player <= 2; player++) {
        // Karty
        document.getElementById(`knight${player}`).innerHTML = '<button class="btn-draw" onclick="drawKnight(' + player + ')">Losuj Rycerza</button>';
        document.getElementById(`modifier${player}`).innerHTML = '<button class="btn-draw" onclick="drawModifier(' + player + ')">Losuj Przydomek</button>';

        // Kości
        document.getElementById(`diceResult${player}`).querySelector('.result-display').innerHTML = '-';
        document.getElementById(`total${player}`).textContent = '0';

        // Fazy
        for (let i = 1; i <= 4; i++) {
            document.getElementById(`phase${i}_${player}`).value = '';
        }

        // Punkty chwały
        document.getElementById(`glory${player}`).textContent = '0';
    }

    addToHistory('🔄 Gra zresetowana');
}

// Wyświetl karty gracza w karuzeli
function showCards(player) {
    const cards = gameState[`player${player}`].cards;

    if (cards.length === 0) {
        alert('Najpierw rozpocznij nową grę, aby otrzymać karty!');
        return;
    }

    const carouselContent = document.getElementById('carouselContent');
    const carouselIndicators = document.getElementById('carouselIndicators');

    // Zbuduj karuzele
    let carouselHTML = '';
    let indicatorsHTML = '';

    cards.forEach((card, index) => {
        const activeClass = index === 0 ? 'active' : '';

        carouselHTML += `
            <div class="carousel-item ${activeClass}">
                <div class="card-carousel-content text-center p-4">
                    <img src="${card.image}" class="d-block w-100 mb-3" alt="${card.name}" style="max-height: 400px; object-fit: contain;">
                    <h4 class="card-title mb-2">${card.name}</h4>
                    <p class="badge bg-secondary mb-2">${card.type}</p>
                    <p class="text-success fw-bold fs-5">${card.effect}</p>
                    <p class="text-muted">${card.description}</p>
                </div>
            </div>
        `;

        indicatorsHTML += `
            <button type="button" data-bs-target="#cardsCarousel" data-bs-slide-to="${index}"
                class="${activeClass}" aria-label="Karta ${index + 1}">
                ${index + 1}
            </button>
        `;
    });

    carouselContent.innerHTML = carouselHTML;
    carouselIndicators.innerHTML = indicatorsHTML;

    // Zaktualizuj tytuł modala
    document.getElementById('cardsModalLabel').innerHTML =
        `<i class="bi bi-collection"></i> Karty Gracza ${player} (${cards.length})`;

    // Pokaż modal
    const modal = new bootstrap.Modal(document.getElementById('cardsModal'));
    modal.show();
}

// Eksport funkcji do globalnego scope (dla inline onclick)
window.drawKnight = drawKnight;
window.drawModifier = drawModifier;
window.rollDice = rollDice;
window.calculateTotal = calculateTotal;
window.addGlory = addGlory;
window.showCards = showCards;
window.clearDiceRolls = clearDiceRolls;

// Dodatkowe funkcje pomocnicze
function clearDiceRolls(player) {
    gameState[`player${player}`].diceRolls = [];
    displayDiceRoll(player);
    addToHistory(`🗑️ Gracz ${player} wyczyścił rzuty kośćmi`);
    saveGame();
}

// Skróty klawiszowe (opcjonalne)
document.addEventListener('keydown', (e) => {
    // Spacebar - losuj rycerza dla gracza 1
    if (e.code === 'Space' && e.shiftKey) {
        e.preventDefault();
        drawKnight(1);
    }

    // Enter - oblicz wynik dla gracza 1
    if (e.code === 'Enter' && e.ctrlKey) {
        e.preventDefault();
        calculateTotal(1);
    }
});

console.log('🏰 Grand Tournament loaded! Have a great game!');
