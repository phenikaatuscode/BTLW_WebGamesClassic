document.addEventListener("DOMContentLoaded", function() {
    const gameSectionsContainer = document.getElementById('gameSectionsContainer');

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

    function createGameCategory(category, games) {
        const section = document.createElement('section');
        section.className = 'grid';
        const h2 = document.createElement('h2');
        h2.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} Games`;
        section.appendChild(h2);

        const gridContainer = document.createElement('div');
        gridContainer.className = 'grid-container';
        gridContainer.id = `${category}Container`;
        section.appendChild(gridContainer);

        for (let i = 0; i < games.length; i++) {
            const gameItem = createGameItem(games[i]);
            gridContainer.appendChild(gameItem);
        }

        gameSectionsContainer.appendChild(section);
    }

    fetch('/main/Lib/Model/data.xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "application/xml");

            ['popular', 'retro', 'latest'].forEach(category => {
                const games = xmlDoc.getElementsByTagName(category)[0].getElementsByTagName('game');
                // Check if there is no data in the category
                if (games.length == 0) {
                    console.warn(`No data found for category: ${category}`);
                    return;
                }
                createGameCategory(category, games);
            });
        })
        .catch(error => {
            console.error('Error fetching or parsing XML:', error);
        });
});
