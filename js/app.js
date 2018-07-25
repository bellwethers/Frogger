//create an array of starting points(y) and speed.
var startingPoint = [50, 140, 225];
var eSpeed = [20, 40, 80, 90];
//bool so i dont keep getting 'win' alerts when less than 0
var win = false;

//-----ENEMY-----//
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // x,y position
    this.x = -100;
    //the y is picked randomly from array
    this.y = startingPoint[Math.floor(Math.random() * startingPoint.length)];

    //speed
    //the speed is picked randomly from array
    this.speed = eSpeed[Math.floor(Math.random() * eSpeed.length)];

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    //collision? If x coordinates are the same then their touching
    /* The # is the object's gap(height or width/the space the enemy takes)
    https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection*/
    if (player.x < this.x + 60 &&
        player.x + 60 > this.x &&
        player.y < this.y + 60 &&
        player.y + 60 > this.y) {
        player.again();
        //console.log("reset player");
        //console.log(allEnemies.indexOf(this) , this.y+ " speed "+ this.speed);
    };



    //if enemy has reached the end
    if (this.x - 65 > 400) {
        //reset enemy
        // x,y position
        this.x = -100;
        this.y = startingPoint[Math.floor(Math.random() * startingPoint.length)];

        //speed
        this.speed = eSpeed[Math.floor(Math.random() * eSpeed.length)];
        //console.log("enemy at end");
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//-------PLAYER------//
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player = function() {
    this.y = 400;
    this.x = 200;
    this.sprite = 'images/char-princess-girl.png';

};

player.prototype.again = function() {
    player.y = 400;
    player.x = 200;
    win = false;
};
//update()
player.prototype.update = function(dt) {
    //Win?
    if (player.y <= 20 && win == false) {
        win = true;
        setTimeout(function() {
            player.again();
            alert("You win! Want to play again?");
        }, 500);

        console.log("win ");


    }
};

player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

player.prototype.handleInput = function(keys) {
    if (keys === "left" && this.x > 0) {
        this.x -= 100;
    }
    if (keys === "right" && this.x < 400) {
        this.x += 100;
    }
    if (keys === "up" && this.y > 0) {
        this.y -= 90;
    }
    if (keys === "down" && this.y < 400) {
        this.y += 90;
    }
};
// Now instantiate your objects.


// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var enemyAmount = 7;
for (var i = 0; i < enemyAmount; i++) {
    allEnemies.push(new Enemy);
};
// Place the player object in a variable called player

var player = new player();

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
