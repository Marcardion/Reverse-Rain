"use strict";

var LoseState = function(game) {};

LoseState.prototype.preload = function() {
    
}

LoseState.prototype.create = function(){

    this.game.add.text(300, 300, "You Lose", {fill: "#ffffff"});
    
    this.game.add.text(250, 500, "Press Space to Retry", {fill: "#ffffff"});
    
    this.spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

LoseState.prototype.update = function() {
    
    
    if(this.spaceBar.isDown)
    {
              this.game.state.start('game');
    }
}