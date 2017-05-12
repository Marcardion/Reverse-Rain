"use strict";

var HelloState = function(game) {};

HelloState.prototype.preload = function() {
    
    this.game.load.image('logo', 'assets/reverse-rain-logo-png.png');
    this.game.load.image('bottom', 'assets/bottom.png');
    this.game.load.image('cloud', 'assets/cloud.png');
    this.game.load.image('cloud side', 'assets/cloud_side.png');
    
}

HelloState.prototype.create = function(){
    
    this.game.stage.backgroundColor = "BC8BB3";
    
   
    this.game.add.sprite(0, 300, 'bottom');
    this.game.add.sprite(100, 100, 'cloud');
    this.game.add.sprite(-100, -50, 'cloud side');
    this.game.add.sprite(640, -20, 'cloud side');
    this.game.add.sprite(180, 80, 'logo');
    
    this.game.add.text(160, 500, "Use the left and right arrows to move", {fill: "#ffffff"});
    this.game.add.text(260, 550, "Press Space to Play", {fill: "#ffffff"});
    
    this.spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

HelloState.prototype.update = function() 
{
     if(this.spaceBar.isDown)
    {
              this.game.state.start('game');
    }   
}

