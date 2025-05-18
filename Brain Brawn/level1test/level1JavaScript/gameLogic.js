let playerHealth = 50;
let enemyHealth = 50;

const playerHealthBar = document.createElement('div');
const enemyHealthBar = document.createElement('div');

playerHealthBar.id = 'playerHealth';
enemyHealthBar.id = 'enemyHealth';

document.body.appendChild(playerHealthBar);
document.body.appendChild(enemyHealthBar);

function updateHealthBars() {
    playerHealthBar.textContent = `Player HP: ${playerHealth}`;
    enemyHealthBar.textContent = `Enemy HP: ${enemyHealth}`;
}

function checkWinCondition() {
    if (playerHealth <= 0) {
        showEndMessage("Game Over! Try again?", () => location.reload());
    } else if (enemyHealth <= 0) {
        window.location.href = "UserInterface/level-complete.html"; // <-- updated path
    }
}

function showEndMessage(message, callback) {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';

    const box = document.createElement('div');
    box.className = 'message-box';

    const title = document.createElement('h2');
    title.textContent = message;

    const yesBtn = document.createElement('button');
    yesBtn.textContent = 'Yes';
    yesBtn.onclick = callback;

    const noBtn = document.createElement('button');
    noBtn.textContent = 'No';
    noBtn.onclick = () => overlay.remove();

    box.appendChild(title);
    box.appendChild(yesBtn);
    box.appendChild(noBtn);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
}

updateHealthBars(); // 
