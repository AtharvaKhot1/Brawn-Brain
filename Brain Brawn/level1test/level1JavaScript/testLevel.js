console.log("Level Loaded");

// Get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Background image
const background = new Image();
background.src = 'level1graphics/OpenMapField.webp';

// Game objects (player and enemy)
let player = null;
let enemy = null;

// Game initialization
background.onload = function() {
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Draw background
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Create player (assuming createPlayer exists)
    player = createPlayer(
        'level1graphics/RightKnight.png',
        canvas.width / 2,
        canvas.height - 150,
        300, 300,
        25, 5, 10
    );

    // Create enemy using Killer Bunny image
    enemy = createEnemy(
        'level1graphics/KillerBunny2.png', // ← final image to use
        canvas.width / 2,
        canvas.height / 2,
        100, 100,
        25, 5, 2, 200
    );

    gameLoop();
};

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear canvas before redrawing
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);  // Redraw the background

    if (enemy) {
        enemy.move();
        enemy.draw(ctx);
    }

    if (player) {
        player.draw(ctx);
    }

    requestAnimationFrame(gameLoop);
}

//Adding music to the level 1

// Select the audio element
const bgMusic = document.getElementById('bg-music');

// Play the music when the game starts
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        // Check if the start screen is visible and space was pressed
        if (startScreen.style.display !== 'none') {
            startScreen.style.display = 'none';
            gameControls.style.display = 'flex';

            // Start background music
            bgMusic.play().catch(error => console.log("Music play error:", error));
            console.log("Game started with music!");

            // Hide the back button
            const backButton = document.getElementById('backButton');
            if (backButton) {
                backButton.style.display = 'none'; // Hide the back button
            } else {
                console.error("Back button not found!");
            }
        }
    }
});

// Optionally, stop or pause music when leaving the page or game over
window.addEventListener('beforeunload', () => {
    bgMusic.pause();
    bgMusic.currentTime = 0;  // Reset the music
});

