// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // console.log("update");
    this.x += 1;

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {

    // console.log("update");
};

Player.prototype.render = function() {
    
    


    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    
    var step_x = 101,
        step_y = 83,
        canvasHeight = 606,
        canvasWidth = 505;

    var music = document.getElementById("jump");
        music.volume = 0.3;

    


    switch(key){
                
        case 'up':
            
            if((this.y - step_y) > 0){
                this.y -= step_y;    
            } 
            
            music.play();

            break;

        case 'down':
            
            if((this.y + step_y) < canvasHeight){
                console.log(this.y);
                this.y += step_y;    
            }
            music.play();

            break;

        case 'right':

            this.x += step_x;
            music.play();

            break;

        case 'left':
            

            if((this.x - step_x) > 0){
                this.x -= step_x;    
            } 
            music.play();


            break;   
    }

    // if(key === 'up'){
        
    //     console.log(key);
    // }


    
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(), new Enemy(), new Enemy()];

allEnemies[0].x = 101 * utils.randomNumber(1, 4);
allEnemies[0].y = 75 * utils.randomNumber(1, 3);

allEnemies[1].x = 101 * utils.randomNumber(1, 4);
allEnemies[1].y = 75 * utils.randomNumber(1, 3);

allEnemies[2].x = 101 * utils.randomNumber(1, 4);
allEnemies[2].y = 75 * utils.randomNumber(1, 3);


var player = new Player();

player.x = 101 * utils.randomNumber(1, 4);
player.y = 75 * 4;


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
