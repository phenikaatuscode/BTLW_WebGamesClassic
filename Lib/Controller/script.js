document.addEventListener("DOMContentLoaded", function() {
    const gameSectionsContainer = document.getElementById('gameSectionsContainer');

    // Create a game item with an image, title, and short description
    function createGameItem(game) {
        const id = game.getAttribute('id');
        const title = game.getElementsByTagName('title')[0]?.textContent || '';
        const shortDescription = game.getElementsByTagName('short_description')[0]?.textContent || '';
        const image = game.getElementsByTagName('image')[0]?.textContent || '';

        const gameItem = document.createElement('div');
        gameItem.className = 'game-item';
        gameItem.innerHTML = `
            <img src="${image}" alt="${title}">
            <div class="game-item-content">
                <h3>${title}</h3>
                <p>${shortDescription}</p>
            </div>
        `;

        gameItem.onclick = () => {
            const gameData = {
                title: title,
                shortDescription: shortDescription,
                fullDescription: game.getElementsByTagName('full_description')[0]?.textContent || '',
                release_date: game.getElementsByTagName('release_date')[0]?.textContent || '',
                rating: game.getElementsByTagName('rating')[0]?.textContent || '',
                author: game.getElementsByTagName('author')[0]?.textContent || '',
                publisher: game.getElementsByTagName('publisher')[0]?.textContent || '',
                price: game.getElementsByTagName('price')[0]?.textContent || '',
                video: game.getElementsByTagName('video')[0]?.textContent || '',
                image: image
            };
            localStorage.setItem('selectedGame', JSON.stringify(gameData));

            // Use BroadcastChannel to send the message to the game item page
            const channel = new BroadcastChannel("gameItemChannel");
            channel.postMessage(gameData);

            // Redirect to the game item page
            window.location.href = 'Lib/Pages/gameItemPage.html';
        };

        return gameItem;
    }

    // Create a game category section with a title and a grid of game items
    function createGameCategory(categoryElement, category) {
        const section = document.createElement('section');
        section.className = 'grid';
        const h2 = document.createElement('h2');
        h2.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} Games`;
        section.appendChild(h2);

        // Add the category description
        const categoryDescription = categoryElement.getElementsByTagName('description')[0];
        if (categoryDescription) {
            const p = document.createElement('p');
            p.textContent = categoryDescription.textContent;
            section.appendChild(p);
        }

        const gridContainer = document.createElement('div');
        gridContainer.className = 'grid-container';
        gridContainer.id = `${category}Container`;
        section.appendChild(gridContainer);

        const games = categoryElement.getElementsByTagName('game');
        for (let i = 0; i < games.length; i++) {
            const gameItem = createGameItem(games[i]);
            gridContainer.appendChild(gameItem);
        }

        gameSectionsContainer.appendChild(section);
    }

    // Function to fetch and process XML data
    function fetchAndProcessXML(url, category) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(data, "application/xml");
                const categoryElement = xmlDoc.getElementsByTagName(category)[0];
                if (categoryElement) {
                    const games = categoryElement.getElementsByTagName('game');
                    // Check if there is no data in the category
                    if (games.length === 0) {
                        console.warn(`No data found for category: ${category}`);
                        return;
                    }
                    createGameCategory(categoryElement, category);
                } else {
                    console.warn(`Category element not found: ${category}`);
                }
            })
            .catch(error => {
                console.error(`Error fetching or parsing XML for ${category}:`, error);
            });
    }

    // Fetch and process XML data for each category
    const categories = {
        latest: 'Lib/Model/latestCatagory.xml',
        popular: 'Lib/Model/popularCatagory.xml',
        retro: 'Lib/Model/retroCatagory.xml'
    };

    Object.keys(categories).forEach(category => {
        fetchAndProcessXML(categories[category], category);
    });
});
