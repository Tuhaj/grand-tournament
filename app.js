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

    // Odtwórz muzykę turnieju
    const audio = document.getElementById('backgroundMusic');
    if (audio) {
        audio.volume = 0.5; // Ustaw głośność na 50%

        // Rozpocznij odtwarzanie (wymaga interakcji użytkownika w niektórych przeglądarkach)
        audio.play().catch(error => {
            console.log('Autoplay został zablokowany przez przeglądarkę:', error);
            // Ikona przycisku wskaże, że muzyka jest zatrzymana
            updateMusicButton(false);
        });
    }

    // Ukryj splash screen po 8 sekundach (dłużej, aby pozwolić muzykę się rozkręcić)
    setTimeout(() => {
        const splashScreen = document.getElementById('splashScreen');
        if (splashScreen) {
            splashScreen.classList.add('hidden');

            // Usuń element z DOM po zakończeniu animacji
            setTimeout(() => {
                splashScreen.remove();
            }, 500);
        }
    }, 8000);
})();

// Karty do gry - każdy gracz dostaje losowe karty na początku gry
const CARDS = [
    {
        id: 1,
        name: "Grubas jedzący kurczaki",
        image: "public/img/cards/card-1.png",
        type: "character",
        effect: "4x duplikacja postaci w grze",
        bonus: { type: "special", value: 0 }
    },
    {
        id: 2,
        name: "Błazen",
        image: "public/img/cards/card-2.png",
        type: "character",
        effect: "2x rzut k10",
        bonus: { type: "dice_roll", dice: 10, count: 2 }
    },
    {
        id: 3,
        name: "Chorąży",
        image: "public/img/cards/card-3.png",
        type: "character",
        effect: "Anuluj 2 pola przeciwnika",
        bonus: { type: "special", value: 0 }
    },
    {
        id: 4,
        name: "Szczurołap",
        image: "public/img/cards/card-4.png",
        type: "character",
        effect: "8x rzut k4",
        bonus: { type: "dice_roll", dice: 4, count: 8 }
    },
    {
        id: 5,
        name: "Bard",
        image: "public/img/cards/card-5.png",
        type: "character",
        effect: "3x k4, 2x k6, 3x k8",
        bonus: { type: "special", value: 0 }
    },
    {
        id: 6,
        name: "Ochroniarz",
        image: "public/img/cards/card-6.png",
        type: "character",
        effect: "Podwójna wartość w środkowym polu",
        bonus: { type: "special", value: 0 }
    },
    {
        id: 7,
        name: "Malarz",
        image: "public/img/cards/card-7.png",
        type: "character",
        effect: "+10 dodatkowych punktów chwały, przy przegranej -10",
        bonus: { type: "glory", win: 10, lose: -10 }
    },
    {
        id: 8,
        name: "Laluś",
        image: "public/img/cards/card-8.png",
        type: "character",
        effect: "-10 do danej fazy dla rycerza damskiego, rozprasza rycerza",
        bonus: { type: "phase_penalty", value: -10 }
    },
    {
        id: 9,
        name: "Mnich",
        image: "public/img/cards/card-9.png",
        type: "character",
        effect: "Powtarzasz rzut z obrone (k20), jeżeli jesteś Pobożny → x2",
        bonus: { type: "reroll", dice: 20, condition: "Pobożny" }
    },
    {
        id: 10,
        name: "Zakonnica",
        image: "public/img/cards/card-10.png",
        type: "character",
        effect: "Powtarzasz rzut z rozpędzenie konia (k20), jeżeli jesteś Pobożny → x2",
        bonus: { type: "reroll", dice: 20, condition: "Pobożny" }
    },
    {
        id: 11,
        name: "Facet jedzący jabłko",
        image: "public/img/cards/card-11.png",
        type: "character",
        effect: "Minus do czego? Rzuca jabłkiem w rycerza. Rząd 1: -10, Rząd 2: -5, Rząd 3: -1",
        bonus: { type: "row_penalty", row1: -10, row2: -5, row3: -1 }
    },
    {
        id: 12,
        name: "Wiedźma",
        image: "public/img/cards/card-12.png",
        type: "character",
        effect: "Powtarzasz nawet najlepszy rzut, kontra do duchownych",
        bonus: { type: "reroll_best", counter: "clergy" }
    },
    {
        id: 13,
        name: "Cycata kobieta / Lokalna piękność",
        image: "public/img/cards/card-13.png",
        type: "character",
        effect: "-10 do danej fazy dla rycerza męskiego, rozprasza rycerza",
        bonus: { type: "phase_penalty", value: -10 }
    },
    {
        id: 14,
        name: "Mistrz rycerski (Mentor)",
        image: "public/img/cards/card-14.png",
        type: "character",
        effect: "+10 do danej fazy dla rycerza, motywuje rycerza",
        bonus: { type: "phase_bonus", value: 10 }
    }
];

// Przedmioty/Artefakty - gracz wybiera które chce użyć
const ITEMS = [
    {
        id: 1,
        name: "Błogosławieństwo Trybun",
        type: "support",
        effect: "+3 do wszystkich rzutów kośćmi",
        bonus: { type: "dice", value: 3 }
    },
    {
        id: 2,
        name: "Zbroja Mistrza",
        type: "equipment",
        effect: "+5 do obrony (faza 3)",
        bonus: { type: "phase", phase: 3, value: 5 }
    },
    {
        id: 3,
        name: "Szybki Koń",
        type: "mount",
        effect: "+4 do rozpędu (faza 1)",
        bonus: { type: "phase", phase: 1, value: 4 }
    },
    {
        id: 4,
        name: "Modlitwa Rycerza",
        type: "blessing",
        effect: "Powtórz jeden rzut kości",
        bonus: { type: "reroll", value: 1 }
    },
    {
        id: 5,
        name: "Precyzyjna Lanca",
        type: "weapon",
        effect: "+5 do celności (faza 2)",
        bonus: { type: "phase", phase: 2, value: 5 }
    },
    {
        id: 6,
        name: "Herb Rodu",
        type: "honor",
        effect: "+15 punktów chwały po zwycięstwie",
        bonus: { type: "glory", value: 15 }
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
let currentPlayerForItems = 1; // Zmienna pomocnicza dla wyboru przedmiotów

const gameState = {
    player1: {
        name: 'Gracz 1',
        knight: null,
        modifier: null,
        cards: [],
        items: [],
        diceRolls: [],
        phases: [0, 0, 0, 0],
        gloryPoints: 0,
        total: 0
    },
    player2: {
        name: 'Gracz 2',
        knight: null,
        modifier: null,
        cards: [],
        items: [],
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

        // Restore player name
        updatePlayerName(player);

        // Update mobile score
        updateMobileScore();
    }
}

function clearSavedGame() {
    localStorage.removeItem('grandTournamentState');
}

// Edit player name
function editPlayerName(player) {
    const currentName = gameState[`player${player}`].name;
    const newName = prompt(`Zmień nazwę gracza:`, currentName);

    if (newName && newName.trim() !== '') {
        gameState[`player${player}`].name = newName.trim();
        updatePlayerName(player);
        updateMobileScore();
        saveGame();
        addToHistory(`✏️ Gracz ${player} zmienił nazwę na: ${newName.trim()}`);
    }
}

// Update player name in UI
function updatePlayerName(player) {
    const playerName = gameState[`player${player}`].name;
    const nameElement = document.getElementById(`playerName${player}`);
    const mobileNameElement = document.getElementById(`mobileName${player}`);

    if (nameElement) {
        nameElement.textContent = playerName;
    }

    if (mobileNameElement) {
        mobileNameElement.innerHTML = `<i class="bi bi-person-fill"></i> ${playerName}`;
    }
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
    addToHistory(`⚔️ ${gameState[`player${player}`].name} wylosował: ${knight.name} (${faction === 'freelancers' ? 'Błędny Rycerz' : 'Imperialny'})`);
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
    addToHistory(`🎭 ${gameState[`player${player}`].name} otrzymał przydomek: ${modifier.name} (${modifier.effect})`);
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
    addToHistory(`🎲 ${gameState[`player${player}`].name} rzucił k${sides}: wynik ${roll}`);

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

    // Bonusy z kart
    let cardsBonus = 0;
    let cardsDiceBonus = 0;
    state.cards.forEach(card => {
        if (card.bonus.type === 'dice') {
            cardsDiceBonus += card.bonus.value;
        } else if (card.bonus.type === 'phase') {
            cardsBonus += card.bonus.value;
        }
    });

    // Bonusy z przedmiotów
    let itemsBonus = 0;
    let itemsDiceBonus = 0;
    state.items.forEach(item => {
        if (item.bonus.type === 'dice') {
            itemsDiceBonus += item.bonus.value;
        } else if (item.bonus.type === 'phase') {
            itemsBonus += item.bonus.value;
        }
    });

    // Dodaj bonusy do kości
    diceSum += cardsDiceBonus + itemsDiceBonus;

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

    const totalScore = diceSum + phaseSum + modifierBonus + knightBonus + cardsBonus + itemsBonus;

    // Wyświetl wynik
    document.getElementById(`total${player}`).textContent = totalScore;

    let bonusesText = '';
    if (cardsBonus > 0 || cardsDiceBonus > 0) bonusesText += `, Karty: ${cardsBonus + cardsDiceBonus}`;
    if (itemsBonus > 0 || itemsDiceBonus > 0) bonusesText += `, Przedmioty: ${itemsBonus + itemsDiceBonus}`;

    addToHistory(`📊 ${gameState[`player${player}`].name} - Wynik całkowity: ${totalScore} (Kości: ${diceSum}, Fazy: ${phaseSum}, Modyfikator: ${modifierBonus}, Rycerz: ${knightBonus}${bonusesText})`);

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
    addToHistory(`⭐ ${gameState[`player${player}`].name} ${action} ${Math.abs(amount)} punktów chwały! Razem: ${gameState[`player${player}`].gloryPoints}`);

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
    // Reset stanu (zachowujemy nazwy graczy)
    const player1Name = gameState.player1.name;
    const player2Name = gameState.player2.name;

    gameState.player1 = {
        name: player1Name,
        knight: null,
        modifier: null,
        cards: [],
        items: [],
        diceRolls: [],
        phases: [0, 0, 0, 0],
        gloryPoints: 0,
        total: 0
    };

    gameState.player2 = {
        name: player2Name,
        knight: null,
        modifier: null,
        cards: [],
        items: [],
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
        `<i class="bi bi-collection"></i> Karty: ${gameState[`player${player}`].name} (${cards.length})`;

    // Pokaż modal
    const modal = new bootstrap.Modal(document.getElementById('cardsModal'));
    modal.show();
}

// Funkcja wyświetlania przedmiotów do wyboru
function showItems(player) {
    currentPlayerForItems = player;
    const playerItems = gameState[`player${player}`].items;
    const itemsList = document.getElementById('itemsList');

    // Zbuduj listę przedmiotów
    let itemsHTML = '';

    ITEMS.forEach((item) => {
        const isChecked = playerItems.some(pItem => pItem.id === item.id);

        itemsHTML += `
            <label class="list-group-item d-flex align-items-start">
                <input class="form-check-input me-3 mt-1 flex-shrink-0" type="checkbox"
                    value="${item.id}" ${isChecked ? 'checked' : ''}
                    data-item='${JSON.stringify(item)}'>
                <div class="flex-grow-1">
                    <div class="d-flex justify-content-between align-items-start mb-1">
                        <h6 class="mb-0">${item.name}</h6>
                        <span class="badge bg-secondary ms-2">${item.type}</span>
                    </div>
                    <p class="text-success fw-bold mb-1 small">${item.effect}</p>
                </div>
            </label>
        `;
    });

    itemsList.innerHTML = itemsHTML;

    // Zaktualizuj tytuł modala
    document.getElementById('itemsModalLabel').innerHTML =
        `<i class="bi bi-box-seam"></i> Wybierz Przedmioty - ${gameState[`player${player}`].name}`;

    // Pokaż modal
    const modal = new bootstrap.Modal(document.getElementById('itemsModal'));
    modal.show();
}

// Funkcja zapisywania wybranych przedmiotów
function saveSelectedItems() {
    const checkboxes = document.querySelectorAll('#itemsList input[type="checkbox"]:checked');
    const selectedItems = [];

    checkboxes.forEach(checkbox => {
        const itemData = JSON.parse(checkbox.dataset.item);
        selectedItems.push(itemData);
    });

    gameState[`player${currentPlayerForItems}`].items = selectedItems;

    const playerName = gameState[`player${currentPlayerForItems}`].name;
    if (selectedItems.length > 0) {
        const itemNames = selectedItems.map(item => item.name).join(', ');
        addToHistory(`📦 ${playerName} wybrał przedmioty: ${itemNames}`);
    } else {
        addToHistory(`📦 ${playerName} usunął wszystkie przedmioty`);
    }

    saveGame();
}

// Eksport funkcji do globalnego scope (dla inline onclick)
window.drawKnight = drawKnight;
window.drawModifier = drawModifier;
window.rollDice = rollDice;
window.calculateTotal = calculateTotal;
window.addGlory = addGlory;
window.showCards = showCards;
window.showItems = showItems;
window.saveSelectedItems = saveSelectedItems;
window.clearDiceRolls = clearDiceRolls;
window.editPlayerName = editPlayerName;
window.showModifiersSummary = showModifiersSummary;

// Dodatkowe funkcje pomocnicze
function clearDiceRolls(player) {
    gameState[`player${player}`].diceRolls = [];
    displayDiceRoll(player);
    addToHistory(`🗑️ ${gameState[`player${player}`].name} wyczyścił rzuty kośćmi`);
    saveGame();
}

// Funkcja wyświetlająca wszystkie aktywne modyfikatory gracza
function showModifiersSummary(player) {
    const state = gameState[`player${player}`];
    const playerName = state.name;

    let summary = `<div class="modifiers-summary">`;
    summary += `<h5 class="mb-3"><i class="bi bi-calculator-fill"></i> Podsumowanie modyfikatorów - ${playerName}</h5>`;

    // Rycerz
    if (state.knight) {
        summary += `<div class="modifier-section mb-3">`;
        summary += `<h6 class="text-primary"><i class="bi bi-shield"></i> Rycerz: ${state.knight.name}</h6>`;
        summary += `<ul class="list-unstyled ms-3">`;
        summary += `<li>Siła: +${state.knight.strength}</li>`;
        summary += `<li>Celność: +${state.knight.accuracy}</li>`;
        summary += `<li>Zręczność: +${state.knight.agility}</li>`;
        summary += `<li class="fw-bold text-success">Suma: +${state.knight.strength + state.knight.accuracy + state.knight.agility}</li>`;
        summary += `</ul></div>`;
    } else {
        summary += `<p class="text-muted">Brak wylosowanego rycerza</p>`;
    }

    // Przydomek
    if (state.modifier) {
        summary += `<div class="modifier-section mb-3">`;
        summary += `<h6 class="text-warning"><i class="bi bi-star"></i> Przydomek: ${state.modifier.name}</h6>`;
        summary += `<p class="ms-3 mb-0">${state.modifier.effect}</p>`;
        if (state.modifier.value !== 0) {
            const sign = state.modifier.value > 0 ? '+' : '';
            summary += `<p class="ms-3 fw-bold ${state.modifier.value > 0 ? 'text-success' : 'text-danger'}">${sign}${state.modifier.value}</p>`;
        }
        summary += `</div>`;
    } else {
        summary += `<p class="text-muted">Brak przydomka</p>`;
    }

    // Karty
    if (state.cards.length > 0) {
        summary += `<div class="modifier-section mb-3">`;
        summary += `<h6 class="text-info"><i class="bi bi-collection"></i> Karty (${state.cards.length})</h6>`;
        summary += `<ul class="list-unstyled ms-3">`;
        state.cards.forEach(card => {
            summary += `<li><strong>${card.name}:</strong> ${card.effect}</li>`;
        });
        summary += `</ul></div>`;
    }

    // Przedmioty
    if (state.items.length > 0) {
        summary += `<div class="modifier-section mb-3">`;
        summary += `<h6 class="text-secondary"><i class="bi bi-box-seam"></i> Przedmioty (${state.items.length})</h6>`;
        summary += `<ul class="list-unstyled ms-3">`;

        let totalItemsBonus = 0;
        state.items.forEach(item => {
            summary += `<li><strong>${item.name}:</strong> ${item.effect}</li>`;
            if (item.bonus.type === 'dice' || item.bonus.type === 'phase') {
                totalItemsBonus += item.bonus.value || 0;
            }
        });

        if (totalItemsBonus > 0) {
            summary += `<li class="fw-bold text-success mt-2">Łączny bonus: +${totalItemsBonus}</li>`;
        }
        summary += `</ul></div>`;
    }

    // Fazy
    const phasesSum = state.phases.reduce((sum, val) => sum + val, 0);
    if (phasesSum > 0) {
        summary += `<div class="modifier-section mb-3">`;
        summary += `<h6 class="text-dark"><i class="bi bi-list-ol"></i> Fazy pojedynku</h6>`;
        summary += `<ul class="list-unstyled ms-3">`;
        if (state.phases[0] > 0) summary += `<li>Faza 1 (Rozpęd): +${state.phases[0]}</li>`;
        if (state.phases[1] > 0) summary += `<li>Faza 2 (Skupienie): +${state.phases[1]}</li>`;
        if (state.phases[2] > 0) summary += `<li>Faza 3 (Uderzenie): +${state.phases[2]}</li>`;
        if (state.phases[3] > 0) summary += `<li>Faza 4 (Finalizacja): +${state.phases[3]}</li>`;
        summary += `<li class="fw-bold text-success mt-2">Suma faz: +${phasesSum}</li>`;
        summary += `</ul></div>`;
    }

    summary += `</div>`;

    // Wyświetl w modalu
    const modalBody = document.querySelector('#modifiersSummaryModal .modal-body');
    const modalLabel = document.getElementById('modifiersSummaryLabel');

    modalLabel.innerHTML = `<i class="bi bi-calculator-fill"></i> Modyfikatory - ${playerName}`;
    modalBody.innerHTML = summary;

    const modal = new bootstrap.Modal(document.getElementById('modifiersSummaryModal'));
    modal.show();
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

// === MUSIC CONTROL ===
function toggleMusic() {
    const audio = document.getElementById('backgroundMusic');
    if (!audio) return;

    if (audio.paused) {
        audio.play().then(() => {
            updateMusicButton(true);
        }).catch(error => {
            console.log('Nie można odtworzyć muzyki:', error);
        });
    } else {
        audio.pause();
        updateMusicButton(false);
    }
}

function updateMusicButton(isPlaying) {
    const button = document.getElementById('musicToggle');
    if (!button) return;

    const icon = button.querySelector('i');
    if (isPlaying) {
        icon.className = 'bi bi-volume-up-fill';
        button.title = 'Zatrzymaj muzykę';
    } else {
        icon.className = 'bi bi-volume-mute-fill';
        button.title = 'Odtwórz muzykę';
    }
}

// Eksportuj funkcje do window
window.toggleMusic = toggleMusic;

console.log('🏰 Grand Tournament loaded! Have a great game!');
