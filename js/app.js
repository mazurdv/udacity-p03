// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = 0;
    this.y = 0;
    this.w = 60;
    this.h = 33;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    console.log(dt);
    this.x += 10 * dt;

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Enemy.prototype.generateRandomStartPos = function() {

    this.x = 101 * utils.randomNumber(0, 4);
    this.y = 75 * utils.randomNumber(1, 3);

};

Enemy.prototype.getBounds = function() {

    var bounds = {};

    bounds.start_x = this.x;
    bounds.start_y = this.y;
    bounds.end_x = this.x + this.w;
    bounds.end_y = this.y + this.h;

    return bounds;

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {

    this.sprite = 'images/char-boy.png';

    this.x = 0;
    this.y = 0;
    this.w = 83;
    this.h = 101;

    this.music = {};

    this.music.jump = document.getElementById("jump");
    this.music.water = document.getElementById("water");
    this.music.over = document.getElementById("over");
    this.music.volume = 0.3;

    //sound
    //player_dead
};

Player.prototype.update = function(dt) {

    // console.log("update");

    this.checkCOllision();

    //console.log(this.hasReachedBoundary());
};

Player.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Player.prototype.generateRandomStartPos = function() {

    this.x = 101 * utils.randomNumber(0, 4);
    this.y = 75 * utils.randomNumber(4, 5);

};

Player.prototype.getBounds = function() {

    var bounds = {};

    bounds.start_x = this.x;
    bounds.start_y = this.y;
    bounds.end_x = this.x + this.w;
    bounds.end_y = this.y + this.h;

    return bounds;

};

Player.prototype.hasReachedBoundary = function() {

    var bounds = this.getBounds();

    //console.log("start_x: " + bounds.start_x );
    //console.log("end_x: " + bounds.end_x );
    //
    //console.log("start_y: " + bounds.start_y );
    //console.log("end_y: " + bounds.end_y );


    if ( bounds.start_y < 0 ) {

        console.log("Congratulations!");

        this.music.water.play();

        player.generateRandomStartPos();

        allEnemies.forEach(function(enemy) {
            enemy.generateRandomStartPos();
        });

        return true;

    }  else {

        if ( bounds.end_y > 476) {

            this.y = 5 * 75;

            return false;

        }

    }

    if ( bounds.start_x < 0) {

        this.x = 0;

        return true;

    } else {

        if ( bounds.end_x > 486) {

            this.x = 4 * 101;

            return false;

        }

    }

    return false;

};

Player.prototype.checkCOllision = function() {


    var player = this;
    var player_bounds =  player.getBounds();

    var i = 0;

    allEnemies.forEach(function(enemy) {

        var enemy_bounds = enemy.getBounds();

        i++;

        console.log(enemy.x);
        console.log("check collision");
        console.log(enemy.start_x);


        if (player_bounds.start_x < enemy_bounds.end_x &&
            player_bounds.end_x > enemy_bounds.start_x &&
            player_bounds.start_y < enemy_bounds.end_y &&
            player_bounds.end_y > enemy_bounds.start_y) {


            console.log("The END!");

            player.music.over.play();

            player.generateRandomStartPos();

            allEnemies.forEach(function(enemy) {
                enemy.generateRandomStartPos();
            });

            return true;

        }



    });

    return false;


};

Player.prototype.handleInput = function(key) {

    var step_x = 101,
        step_y = 83,
        canvasHeight = 606,
        canvasWidth = 505;

    switch(key){

        case 'up':

            //console.log(this.hasReachedBoundary());

            if(!this.hasReachedBoundary()) {

                this.y -= step_y;
                this.music.jump.play();

            } else {

                player.generateRandomStartPos();

                allEnemies.forEach(function(enemy) {
                    enemy.generateRandomStartPos();
                });

            }


            break;

        case 'down':

            //console.log(this.hasReachedBoundary());

            if(!this.hasReachedBoundary()) {

                this.y += step_y;
                this.music.jump.play();

            }

            break;

        case 'right':


            //console.log(this.hasReachedBoundary());

            if(!this.hasReachedBoundary()) {

                this.x += step_x;
                this.music.jump.play();

            }

            break;

        case 'left':

            //console.log(this.hasReachedBoundary());

            if(!this.hasReachedBoundary()) {

                this.x -= step_x;
                this.music.jump.play();

            }

            break;
    }


};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [],
    number_enemies = 10;

for (i = 0; i < number_enemies; i++) {
    allEnemies.push(new Enemy());
}

allEnemies.forEach(function(enemy) {
    enemy.generateRandomStartPos();
});

var player = new Player();

player.generateRandomStartPos();

//generateRandomVelocity() // enemy only

//hasReachedBoundary() // for player & for enemy

//init() // for player & for enemy
//checkCOllision() // enemy with enemy, player with enemy
//
//utils.intersect(boy_bounds, bug_bounds)
//
//Player class

//
//Enemy class
//x, y, w, h
//img
//sound
//enemy_bounds // start_x, start_y, end_x, end_y

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


