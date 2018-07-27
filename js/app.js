"use strict";
//create an array of starting points(y) and speed.
var startingPoint = [50, 140, 225];
var eSpeed = [20, 40, 80, 90];
//bool so i dont keep getting 'win' alerts when player is less than 0
var touchStar = false;
var level = 0;

//-----CHARCTER-------//
/*A class that extends to the enemy and player with useful constructors*/
class chara {
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }
};
//renders the both player and enemy character.
chara.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//-----ENEMY-----//
class Enemy extends chara {
    constructor(x, y, sprite) {
        super();
        this.x = -100;
        //enemy is given random speed and starting point to give the enemies variation
        this.y = startingPoint[Math.floor(Math.random() * startingPoint.length)];
        this.sprite = 'images/enemy-bug.png';
        this.speed = eSpeed[Math.floor(Math.random() * eSpeed.length)];
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    checkCollisions(this);
};


//-------PLAYER------//
class player extends chara {
    constructor(x, y, sprite) {
        super();
        this.x = 200;
        this.y = 400
        this.sprite = 'images/char-princess-girl.png';
    }
};

//IF the player is cought by the enemy start the player over again
player.prototype.again = function() {
    this.y = 400;
    this.x = 200;
    touchStar = false;
    winMessage.style.display = "none";
};
//update()
player.prototype.update = function() {
    //Win condition/message
    var winMessage = document.getElementById('winMessage');
    if (level == 1 && this.y <= 20   && touchStar == true) {
        winMessage.style.display = "block";
        setTimeout(function() {
            _player.again();
            //alert("You win! Want to play again?");
        }, 900);

        console.log(touchStar);


    }
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

var _Enemy = new Enemy;
var _player = new player();

// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var enemyAmount = 7;
for (var i = 0; i < enemyAmount; i++) {
    allEnemies.push(_Enemy);
};
// Place the player object in a variable called player




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    _player.handleInput(allowedKeys[e.keyCode]);
});

//----COLLISION------//
function checkCollisions(touched){
//collision for all objects
/* The # is the object's gap(height or width/the space the enemy takes)
https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection*/
if (_player.x < touched.x + 60 &&
    _player.x + 60 > touched.x &&
    _player.y < touched.y + 60 &&
    _player.y + 60 > touched.y ) {
      //reset player if touch enemy
    if(touched.constructor.name === "Enemy"){
    _player.again();
     level = 0;
    console.log(touched.constructor.name);
    //console.log(allEnemies.indexOf(this) , this.y+ " speed "+ this.speed);
    //if touch trigger move to next lvl
  }else if (touched.constructor.name === "trigger"){
    if(level == 0){
      level = 1;
    }else if (level == 1){
      level = 0;
    };
    touchStar = true;
    _player.again();
    console.log("new Level "+ level);
  }
}
//If the enemy has reached the end of the canvas start from the beginnig again
if (_Enemy.x - 65 > 400) {
    //reset enemy
    // x,y position
    _Enemy.x = -100;
    _Enemy.y = startingPoint[Math.floor(Math.random() * startingPoint.length)];

    //speed
    _Enemy.speed = eSpeed[Math.floor(Math.random() * eSpeed.length)];
    //console.log("enemy at end");
}
};

//-----TRIGGER OBJECT----//
class trigger extends chara {
    constructor(x, y, sprite) {
        super();
        this.x = 1;//1
        this.y = -40;//-40
        this.sprite = 'images/selector.png';
    }
};
var _object = new trigger();


trigger.prototype.update = function() {
  checkCollisions(this);
};
