document.addEventListener("DOMContentLoaded", function() {
    const n = 8; 
    const gameContainer = document.getElementById('lastestContainer');
    
    for (let i = 1; i <= n; i++) {
        const gameItem = document.createElement('div');
        gameItem.className = 'game-item';
        gameItem.innerHTML = `
            <img src="/main/Assets/Games/game${i}.png" alt="Game ${i}">
            <h3>Game ${i}</h3>
            <p>Description of game ${i}</p>
        `;
        gameContainer.appendChild(gameItem);
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const n = 8; 
    const gameContainer = document.getElementById('popularContainer');
    
    for (let i = 1; i <= n; i++) {
        const gameItem = document.createElement('div');
        gameItem.className = 'game-item';
        gameItem.innerHTML = `
            <img src="/main/Assets/Games/game${i}.png" alt="Game ${i}">
            <h3>Game ${i}</h3>
            <p>Description of game ${i}</p>
        `;
        gameContainer.appendChild(gameItem);
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const n = 8; 
    const gameContainer = document.getElementById('retroContainer');
    
    for (let i = 1; i <= n; i++) {
        const gameItem = document.createElement('div');
        gameItem.className = 'game-item';
        gameItem.innerHTML = `
            <img src="/main/Assets/Games/game${i}.png" alt="Game ${i}">
            <h3>Game ${i}</h3>
            <p>Description of game ${i}</p>
        `;
        gameContainer.appendChild(gameItem);
    }
});



