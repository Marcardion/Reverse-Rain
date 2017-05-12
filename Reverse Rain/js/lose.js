"use strict";

var LoseState = function(game) {};

LoseState.prototype.preload = function() 
{
    this.game.load.image('bottom', 'assets/bottom.png');
    this.game.load.image('cloud', 'assets/cloud.png');
    this.game.load.image('cloud side', 'assets/cloud_side.png');
    
}

LoseState.prototype.create = function(){

    
    this.game.add.sprite(0, 300, 'bottom');
    this.game.add.sprite(100, 100, 'cloud');
    this.game.add.sprite(-100, -50, 'cloud side');
    this.game.add.sprite(640, -20, 'cloud side');
    
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