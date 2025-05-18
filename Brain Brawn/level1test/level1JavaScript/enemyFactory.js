console.log("Enemy Creation Loaded");

function createEnemy(imageSrc, x, y, width, height, health, attack, speed) {
    const enemy = {
        image: new Image(),
        x: x,
        y: y,
        width: width,
        height: height,
        health: health,
        attack: attack,
        speed: speed,
        isLoaded: false,
        direction: '',
        velocityX: 0,
        velocityY: 0,
        moveInterval: 500,
        lastMoveTime: Date.now(),

        draw: function(ctx) {
            if (this.isLoaded) {
                ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            } else {
                ctx.fillStyle = 'purple';
                ctx.fillRect(this.x, this.y, this.width, this.height);
                ctx.fillStyle = 'white';
                ctx.font = '12px Arial';
                ctx.fillText('Loading Enemy...', this.x, this.y - 5);
            }
        },

        move: function() {
            const currentTime = Date.now();
            if (currentTime - this.lastMoveTime >= this.moveInterval) {
                this.randomMove();
                this.lastMoveTime = currentTime;
            }

            this.x += this.velocityX;
            this.y += this.velocityY;

            const canvasWidth = document.getElementById('gameCanvas').width;
            const canvasHeight = document.getElementById('gameCanvas').height;

            this.x = Math.max(0, Math.min(this.x, canvasWidth - this.width));
            this.y = Math.max(0, Math.min(this.y, canvasHeight - this.height));
        },

        randomMove: function() {
            const directions = ['left', 'right', 'up', 'down'];
            const randomDirection = directions[Math.floor(Math.random() * directions.length)];

            switch (randomDirection) {
                case 'left':
                    this.velocityX = -this.speed;
                    this.velocityY = 0;
                    break;
                case 'right':
                    this.velocityX = this.speed;
                    this.velocityY = 0;
                    break;
                case 'up':
                    this.velocityX = 0;
                    this.velocityY = -this.speed;
                    break;
                case 'down':
                    this.velocityX = 0;
                    this.velocityY = this.speed;
                    break;
            }
        }
    };

    enemy.image.src = imageSrc;
    console.log("Attempting to load enemy image from:", imageSrc);

    enemy.image.onload = function() {
        enemy.isLoaded = true;
        console.log("Enemy image loaded:", imageSrc);
    };

    enemy.image.onerror = function() {
        console.error("Failed to load enemy image:", imageSrc);
        enemy.image.src = 'level1graphics/KillerBunny2.webp'; // fallback
    };

    return enemy;
}
