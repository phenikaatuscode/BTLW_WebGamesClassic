document.addEventListener("DOMContentLoaded", function() {
    const gameContainers = {
        popular: document.getElementById('popularContainer'),
        retro: document.getElementById('retroContainer'),
        latest: document.getElementById('latestContainer'),
    };

    function createGameItem(game) {
        const id = game.getAttribute('id');
        const title = game.getElementsByTagName('title')[0].textContent;
        const description = game.getElementsByTagName('description')[0].textContent;
        const image = game.getElementsByTagName('image')[0].textContent;

        const gameItem = document.createElement('div');
        gameItem.className = 'game-item';
        gameItem.innerHTML = `
            <img src="${image}" alt="${title}">
            <h3>${title}</h3>
            <p>${description}</p>
        `;
        return gameItem;
    }

    fetch('/main/Lib/Model/data.xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "application/xml");

            ['popular', 'retro', 'latest'].forEach(category => {
                const games = xmlDoc.getElementsByTagName(category)[0].getElementsByTagName('game');
                // Check if there is no data in the category -TusAnh!
                if (games.length == 0 ) {
                    console.warn('Category data return zero');
                    return;
                }
                for (let i = 0; i < games.length; i++) {
                    const gameItem = createGameItem(games[i]);
                    gameContainers[category].appendChild(gameItem);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching or parsing XML:', error);
        });
});
