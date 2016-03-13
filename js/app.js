// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // current x position
    this.x = 0;
    // current y position
    this.y = 0;
    // width - used for collision detection
    this.w = 60;
    // height - used for collision detection
    this.h = 60;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += 10 * dt;

    this.hasReachedBoundary();

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// position enemy at random point on the screen - lanes only
Enemy.prototype.generateRandomStartPos = function() {

    this.x = 110 * utils.randomNumber(0, 4);
    this.y = 90 * utils.randomNumber(1, 3) - 40 ;

};

// get boundaries of the enemy
Enemy.prototype.getBounds = function() {

    var bounds = {};

    bounds.start_x = this.x;
    bounds.start_y = this.y;
    bounds.end_x = this.x + this.w;
    bounds.end_y = this.y + this.h;

    return bounds;

};

// check whether the enemy left the canvas and if required put it back to random lane
Enemy.prototype.hasReachedBoundary = function() {

    if ( this.x > canvasWidth) {

        this.generateRandomStartPos();
        this.x = 0;

    }

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {

    this.sprite = 'images/char-boy.png';

    // current x and y positions
    this.x = 0;
    this.y = 0;
    // width and height of the player
    this.w = 83;
    this.h = 101;

    // step sizes - along x and y axises
    this.step_x = 101;
    this.step_y = 83;

};

// update function invokes check collision function every time - performance optimization is required
Player.prototype.update = function(dt) {

    this.checkCOllision();

};

// render function to draw the player in the right x and y position of the canvas
Player.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// put the player in random position on the grass
Player.prototype.generateRandomStartPos = function() {

    this.x = 101 * utils.randomNumber(0, 4);
    this.y = 83 * utils.randomNumber(4, 5) - 12;

};

// get player's boundaries
Player.prototype.getBounds = function() {

    var bounds = {};

    bounds.start_x = this.x;
    bounds.start_y = this.y;
    bounds.end_x = this.x + this.w;
    bounds.end_y = this.y + this.h;

    return bounds;

};

// check player's collision with all enemies and restart the game if required
Player.prototype.checkCOllision = function() {

    var player_bounds =  this.getBounds();

    allEnemies.forEach(function(enemy) {

        var enemy_bounds = enemy.getBounds();

        if (player_bounds.start_x < enemy_bounds.end_x &&
            player_bounds.end_x > enemy_bounds.start_x &&
            player_bounds.start_y < enemy_bounds.end_y &&
            player_bounds.end_y > enemy_bounds.start_y) {

            $("#console").text("He he he... Try again!");

            music.over.play();

            this.generateRandomStartPos();

            allEnemies.forEach(function(enemy) {
                enemy.generateRandomStartPos();
            });

            return true;
        }

    }.bind(this));

    return false;

};

// check pressed key and move the player if it is not outside the boundaries
// the game is restarted if the player reaches the water
Player.prototype.handleInput = function(key) {

    switch(key){

        case 'up':

            if(this.y > this.step_y) {

                this.y -= this.step_y;
                music.jump.play();

            } else {

                $("#console").text("Congratulations!");

                music.water.play();

                this.generateRandomStartPos();

                allEnemies.forEach(function(enemy) {
                    enemy.generateRandomStartPos();
                });

            }

            break;

        case 'down':

            if(this.y < this.step_y * 4) {

                this.y += this.step_y;
                music.jump.play();

            } else {

                $("#console").text("go the opposite direction...");
            }

            break;

        case 'right':

            if(this.x < this.step_x * 4) {

                this.x += this.step_x;
                music.jump.play();

            } else {

                $("#console").text("there is no escape from this world...");
            }

            break;

        case 'left':

            if(this.x >= this.step_x) {

                this.x -= this.step_x;
                music.jump.play();

            } else {

                $("#console").text("where're you going?!");
            }

            break;
    }

};


// Additional useful functions
window.utils = window.utils || {};

/*
 Random Number Generator.

 Pretty awesome explanation here:
 http://stackoverflow.com/a/1527820
 */
utils.randomNumber = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

utils.isInt = function(number) {
    return parseFloat(number) === parseInt(number);
};

utils.intersect = function(bounds1, bounds2) {

    return !(
        bounds1.end_x < bounds2.start_x ||
        bounds2.end_x < bounds1.start_x ||
        bounds1.end_y < bounds2.start_y ||
        bounds2.end_y < bounds1.start_y
    );

};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var canvasHeight = 606;
var canvasWidth = 505;

// change number of enemies if needed
var allEnemies = [],
    number_enemies = 7;

// create enemies in loop
for (var i = 0; i < number_enemies; i++) {
    allEnemies.push(new Enemy());
}

// generate random start position for each enemy
allEnemies.forEach(function(enemy) {
    enemy.generateRandomStartPos();
});

// crate player
var player = new Player();

// generate random position for the player
player.generateRandomStartPos();

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


$( document ).ready(function() {


    // add text/console to the html where all notes to the player will be shown
    $("body").append("<div id='console'>Do your best and cross the road... if you are brave enough:)</div>");

    // create global music object and load sounds for player's movement and game events
    music = {};
    music.loop = document.getElementById("loop");
    music.jump = document.getElementById("jump");
    music.water = document.getElementById("water");
    music.over = document.getElementById("over");
    music.loop.volume = 0.2;
    music.isMute = false;

    music.loop.play();

    // Mute the game if button is clicked
    $("#mute").click(function() {

        if(music.isMute == false) {

            for (var sound in music) {
                if (music.hasOwnProperty(sound)) {
                    music[sound].volume = 0;
                }
            }

            music.isMute = true;

            $("#mute").text("Play Sound");

        } else {

            for (var sound in music) {
                if (music.hasOwnProperty(sound)) {
                    music[sound].volume = 0.2;
                }
            }

            music.isMute = false;

            $("#mute").text("Mute Sound");

        }
    });

});
