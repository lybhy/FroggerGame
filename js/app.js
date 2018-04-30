/******************************************************
    E N E M I E S
 *****************************************************/

// Enemy - constructor function

const Enemy = function(x,y,speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update enemy's position
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    // new speed after enemy goes off screen
    this.offScreenX = 505;
    this.startingX = -100;
    if (this.x >= this.offScreenX) {
        this.x = this.startingX;
        this.randomSpeed();
    }
    this.checkCollision();
};

// Random speed
let speedFactor = 25; //to increase difficulty in game progress
Enemy.prototype.randomSpeed = function (){
    this.speed = speedFactor * Math.floor(Math.random() * 10 + 1);
};

// Draw enemy
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Check Collision
Enemy.prototype.checkCollision = function() {
    const playerPosition = {x: player.x, y: player.y, width: 50, height: 40};
    const enemyPosition = {x: this.x, y: this.y, width: 60, height: 70};
    // Check collisions if position is equal
    if (playerPosition.x < enemyPosition.x + enemyPosition.width &&
        playerPosition.x + playerPosition.width > enemyPosition.x &&
        playerPosition.y < enemyPosition.y + enemyPosition.height &&
        playerPosition.height + playerPosition.y > enemyPosition.y) {
        this.collided();
    }
};

// Action for Collision
Enemy.prototype.collided = function() {
    player.playerLives -= 1;
    player.characterReset();
};

/******************************************************
    P L A Y E R
 *****************************************************/

// Player - constructor function

const Player = function() {
    this.startingX = 200;
    this.startingY = 400;
    this.x = this.startingX;
    this.y = this.startingY;
    this.sprite = 'images/char-boy.png';
    this.playerScore = 0;
    this.playerLives = 3;
};

// Check playerLives: if 0 call reset
Player.prototype.update = function() {
    if (this.playerLives === 0) {
        reset();
    }
};

// Resets player's position
Player.prototype.characterReset = function() {
    this.startingX = 200;
    this.startingY = 400;
    this.x = this.startingX;
    this.y = this.startingY;
};

// Score & Difficulty sets if player arrives at top
Player.prototype.success = function() {
    this.playerScore += 10;
    speedFactor += 2;
    this.characterReset();
};

// Draw player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Keypress handling, player moves
Player.prototype.handleInput = function(allowedKeys) {
    switch (allowedKeys) {
        case "left":
            if (this.x > 0) {
                this.x -= 101;
            }
            break;
        case "right":
            if (this.x < 402) {
                this.x += 101;
            }
            break;
        case "up":
            if (this.y < 0) {
                this.success();
            } else {
                this.y -= 83;
            }
            break;
        case "down":
            if (this.y < 400) {
                this.y += 83;
            }
            break;
    }
};


/******************************************************
    G E M S
 *****************************************************/

// Gems - constructor function
const Gem = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Gem_Blue.png';
    this.gemWaitTime = undefined;
};

// Update gem
Gem.prototype.update = function() {
     this.checkCollision();
};

// Draw gem
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Check for collision
Gem.prototype.checkCollision = function() {
    const playerPosition = {x: player.x, y: player.y, width: 50, height: 40};
    const gemPosition = {x: this.x, y: this.y, width: 60, height: 70};
    // Check collisions if position is equal
    if (playerPosition.x < gemPosition.x + gemPosition.width &&
        playerPosition.x + playerPosition.width > gemPosition.x &&
        playerPosition.y < gemPosition.y + gemPosition.height &&
        playerPosition.height + playerPosition.y > gemPosition.y) {
        this.collisionDetected();
    }
};

// if Gem collision detected, increase score
Gem.prototype.collisionDetected = function() {
    //hide gem off canvas
    this.x = 1000;
    this.y = 1000;
    //increase player's score
    player.playerScore += 30;
    //wait before resetting gem
    this.wait();
};

// waiting
Gem.prototype.wait = function() {
    this.gemWaitTime = setTimeout( function() {
        gem.gemReset();
    }, 5000);
};

// Reset gem to a new position
Gem.prototype.gemReset = function() {
    this.x = (101 * Math.floor(Math.random() * 4) + 0);
    this.y = (60 + (85 * Math.floor(Math.random() * 3) + 0));
};


/******************************************************
    H E A R T S
 *****************************************************/

// Heart - constructor function
const Heart = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Heart.png';
    this.heartWaitTime = undefined;
};

// Update heart, call checkCollision
Heart.prototype.update = function() {
    this.checkCollision();
};

// Draw heart
Heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Check for collision
Heart.prototype.checkCollision = function() {
    const playerPosition = {x: player.x, y: player.y, width: 50, height: 40};
    const heartBPosition = {x: this.x, y: this.y, width: 60, height: 70};
    // Check for collisions
    if (playerPosition.x < heartBPosition.x + heartBPosition.width &&
        playerPosition.x + playerPosition.width > heartBPosition.x &&
        playerPosition.y < heartBPosition.y + heartBPosition.height &&
        playerPosition.height + playerPosition.y > heartBPosition.y) {
        // Collision detected, call collisionDetected function
        this.collisionDetected();
    }
};

// if Heart collision detected, increase lives
Heart.prototype.collisionDetected = function() {
    this.x = 900;
    this.y = 900;
    player.playerLives += 1;
    this.wait();
};

// waiting
Heart.prototype.wait = function() {
    this.heartWaitTime = setTimeout( function() {
        heart.heartReset(); // this.heartReset() doesn't work
    }, 30000);
};

// Reset heart to a new position
Heart.prototype.heartReset = function() {
    this.x = (101 * Math.floor(Math.random() * 4) + 0);
    this.y = (70 + (85 * Math.floor(Math.random() * 3) + 0));
};


/******************************************************
    I N S T A N C E S
 *****************************************************/

// Player
let player = new Player();

// Enemies
let allEnemies = [];
for (let i = 0; i < 3; i++) {
    let startSpeed = speedFactor * Math.floor(Math.random() * 10 + 1);
    allEnemies.push(new Enemy(-100, 60 + (85 * i), startSpeed));
}

// Gems
let gem = new Gem (101 * Math.floor(Math.random() * 4) + 0, 60 +
    (85 * Math.floor(Math.random() * 3) + 0));

// Heart
let heart = new Heart (101 * Math.floor(Math.random() * 4) + 0, 70 +
    (85 * Math.floor(Math.random() * 3) + 0));


/******************************************************
    E V E N T    L I S T E N E R S
 *****************************************************/

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
const keypressing = function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
};
document.addEventListener('keyup', keypressing);
