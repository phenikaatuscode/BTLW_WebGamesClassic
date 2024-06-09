document.addEventListener("DOMContentLoaded", () => {
    const gameData = JSON.parse(localStorage.getItem('selectedGame'));

    if (gameData) {
        document.getElementById('gameTitle').textContent = gameData.title;
        document.getElementById('gameImage').src = gameData.image;
        document.getElementById('gameFullDescription').textContent = gameData.fullDescription;
        document.getElementById('releaseDate').textContent = gameData.release_date;
        document.getElementById('rating').textContent = gameData.rating;
        document.getElementById('author').textContent = gameData.author;
        document.getElementById('publisher').textContent = gameData.publisher;
        document.getElementById('price').textContent = gameData.price;
        document.getElementById('title').textContent = gameData.title;

        try {
            document.body.style.backgroundImage = `url(${gameData.image})`;
        } catch (error) {
            document.body.style.backgroundImage = none;
        }
        
        const videoSrc = gameData.video;
        // Check if video source or play source is available
        if (videoSrc != '') {

            document.getElementById('playGame').style.display = 'none';
            const embedUrl = convertToEmbedUrl(videoSrc);
            document.getElementById('gameVideo').src = embedUrl;
        } else if (gameData.play != '') {
            document.getElementById('gameVideo').style.display = 'none';
            document.getElementById('playGame').src = gameData.play;
        } else {
            document.getElementById('gameVideo').style.display = 'none';
            document.getElementById('playGame').style.display = 'none';
        }
    } else {
        console.error("No game data found in localStorage");
    }
});

function convertToEmbedUrl(url) {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') {
        const videoId = urlObj.searchParams.get('v');
        return `https://www.youtube.com/embed/${videoId}`;
    } else if (urlObj.hostname === 'youtu.be') {
        const videoId = urlObj.pathname.slice(1);
        return `https://www.youtube.com/embed/${videoId}`;
    } else {
        return url;
    }
}
