console.log("Character Actions Loaded");

// Listen for keydown events to move the character
function characterAction(event, character) {
    // Save the previous position for boundary checking
    const previousX = character.x;
    const previousY = character.y;

    if (event.key === 'ArrowLeft') {
        character.x -= character.speed;  // Move left
    }
    if (event.key === 'ArrowRight') {
        character.x += character.speed;  // Move right
    }
    if (event.key === 'ArrowUp') {
        character.y -= character.speed;  // Move up
    }
    if (event.key === 'ArrowDown') {
        character.y += character.speed;  // Move down
    }

    // Ensure the character stays within the canvas boundaries
    character.x = Math.max(0, Math.min(character.x, canvas.width - 200));
    character.y = Math.max(0, Math.min(character.y, canvas.height - 200));

    // Redraw if the player moved
    if (previousX !== character.x || previousY !== character.y) {
        redraw(character);
    }
}

// Function to redraw everything (background, player, and enemy)
function redraw(player, enemy) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    if (player) {
        player.draw(ctx);
    }

    if (enemy) {
        enemy.draw(ctx);
    }
}
