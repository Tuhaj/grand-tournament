// Grand Tournament - Game Logic
// Aplikacja do losowania kart, rzucania kośćmi i liczenia punktów

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
        diceRolls: [],
        phases: [0, 0, 0, 0],
        gloryPoints: 0,
        total: 0
    },
    player2: {
        knight: null,
        modifier: null,
        diceRolls: [],
        phases: [0, 0, 0, 0],
        gloryPoints: 0,
        total: 0
    },
    history: []
};

// Inicjalizacja
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    addToHistory('🎮 Gra rozpoczęta! Wybierzcie rycerzy i przydomki.');
});

function setupEventListeners() {
    document.getElementById('newGameBtn').addEventListener('click', newGame);
    document.getElementById('resetBtn').addEventListener('click', resetGame);
}

// Losowanie rycerza
function drawKnight(player) {
    const faction = Math.random() > 0.5 ? 'freelancers' : 'imperials';
    const knights = KNIGHTS[faction];
    const knight = knights[Math.floor(Math.random() * knights.length)];

    gameState[`player${player}`].knight = { ...knight, faction };

    displayKnight(player, knight, faction);
    addToHistory(`⚔️ Gracz ${player} wylosował: ${knight.name} (${faction === 'freelancers' ? 'Błędny Rycerz' : 'Imperialny'})`);
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
    const modifier = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];

    gameState[`player${player}`].modifier = modifier;

    displayModifier(player, modifier);
    addToHistory(`🎭 Gracz ${player} otrzymał przydomek: ${modifier.name} (${modifier.effect})`);
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

// Nowa gra
function newGame() {
    if (confirm('Czy na pewno chcesz rozpocząć nową grę? Obecny postęp zostanie utracony.')) {
        resetGame();
        addToHistory('🎮 Rozpoczęto nową grę!');
    }
}

// Reset gry
function resetGame() {
    // Reset stanu
    gameState.player1 = {
        knight: null,
        modifier: null,
        diceRolls: [],
        phases: [0, 0, 0, 0],
        gloryPoints: 0,
        total: 0
    };

    gameState.player2 = {
        knight: null,
        modifier: null,
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

// Eksport funkcji do globalnego scope (dla inline onclick)
window.drawKnight = drawKnight;
window.drawModifier = drawModifier;
window.rollDice = rollDice;
window.calculateTotal = calculateTotal;
window.addGlory = addGlory;

// Dodatkowe funkcje pomocnicze
function clearDiceRolls(player) {
    gameState[`player${player}`].diceRolls = [];
    displayDiceRoll(player);
    addToHistory(`🗑️ Gracz ${player} wyczyścił rzuty kośćmi`);
}

// Auto-save do localStorage (opcjonalne)
function saveGame() {
    localStorage.setItem('grandTournamentState', JSON.stringify(gameState));
}

function loadGame() {
    const saved = localStorage.getItem('grandTournamentState');
    if (saved) {
        Object.assign(gameState, JSON.parse(saved));
        // Tutaj można dodać kod do odświeżenia UI
        addToHistory('💾 Wczytano zapisany stan gry');
    }
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
