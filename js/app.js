    // Enemies our player must avoid
    var Enemy = function() {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.init();
    };

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    Enemy.prototype.update = function(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * 150 * dt;
        if (this.x > 505) {
            this.init();
        }
    };
    // Inititalize the the enemy's x,y co-ordinate values
    // and also set a random speed
    Enemy.prototype.init = function() {
        var rLane = Math.floor(Math.random() * 10) % 3 + 1;
        var randomSpeed = Math.floor(Math.random() * 10) % 3 + 1;
        this.x = 0;
        this.y = rLane * 83;
        this.speed = randomSpeed;
    };
    // Draw the enemy on the screen, required method for game
    Enemy.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
    var score = 0;
    // Now write your own ``` player class
    // This class requires an update(), render() and
    // a handleInput() method.
    var Player = function() {
        this.sprite = 'images/char-boy.png';
        this.x = this.posX = 2 * 101;
        this.y = this.posY = 5 * 83;
    };
    //Updates player position every time
    Player.prototype.update = function() {
        this.x = this.posX;
        this.y = this.posY;
        if (this.posY === 0) {
            score += 10;
            pointsCounter(score);
            this.reset();
        }
    };

    // Points / score counter function
    function pointsCounter() {
        // Get the element with the "points" id
        var pointContainer = document.getElementById("points");
        // Set it equal to the score variable
        pointContainer.innerHTML = score;
    }
    // Add function for changing by selecting the player image
    Player.prototype.newPlayer = function() {
        var currentImg = document.getElementById('player-select').options[document.getElementById('player-select').selectedIndex].value;
        if (currentImg=='boy') {
            this.sprite = 'images/char-boy.png';
        } else if (currentImg=='cat') {
            this.sprite = 'images/char-cat-girl.png';
        } else if (currentImg=='horn-girl') {
            this.sprite = 'images/char-horn-girl.png';
        } else if (currentImg=='pink-girl') {
            this.sprite = 'images/char-pink-girl.png';
        } else if (currentImg=='princess') {
            this.sprite = 'images/char-princess-girl.png';
        }
    };
    // Draws Player on the screen
    Player.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
    // Resets the player position when player reaches the water
    Player.prototype.reset = function() {
        this.x = this.posX = 2 * 101;
        this.y = this.posY = 5 * 83;
    };

    // Define hanleInput method to receive user input from allowedKeys.
    // Player must not go beyond the boders of the game board in all directions.
    Player.prototype.handleInput = function(direction) {
        switch (direction) {
            case 'left':
                if (this.posX > 0) this.posX = this.posX - 101;
                break;
            case 'right':
                if (this.posX < 4 * 101) this.posX = this.posX + 101;
                break;
            case 'up':
                if (this.posY >= 83) this.posY = this.posY - 83;
                break;
            case 'down':
                if (this.posY < 5 * 83) this.posY = this.posY + 83;
                break;
        }
    };

    // Now instantiate your objects.
    // Place all enemy objects in an array called allEnemies
    var allEnemies = [new Enemy(),
        new Enemy(),
        new Enemy(),
        new Enemy(),
    ];

    // Place the player object in a variable called player
    var player = new Player();

    // This listens for key presses and sends the keys to your
    // Player.handleInput() method. You don't need to modify this.
    document.addEventListener('keyup', function(e) {
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };

        player.handleInput(allowedKeys[e.keyCode]);
    });
