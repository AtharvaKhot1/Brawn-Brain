console.log("Character Creation Loaded");

// Factory method to create the character
function createPlayer(imageSrc, x, y, width, height, health, attack, speed) {
    // Create the character object
    const character = {
        image: new Image(),  // Correctly initialize the image property once
        x: x,
        y: y,
        width: width,
        height: height,
        health: health,
        attack: attack,
        speed: speed, // Movement speed

        // Draw function to render the character on the canvas
        draw: function(ctx) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);  // Draw character
        }
    };

    // Set the character's image source
    character.image.src = imageSrc;

    // Ensure the character is drawn only after the image is fully loaded
    character.image.onload = () => {
        character.draw(ctx);  // Draw the character on the canvas
    };

    // Check if the character image failed to load
    character.image.onerror = () => {
        console.error("Failed to load character image: " + imageSrc);
    };

    // Listen for keydown events to move the character
    document.addEventListener('keydown', (event) => characterAction(event, character));

    return character; // Return the created character
}