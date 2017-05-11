"use strict";

var HelloState = function(game) {};

HelloState.prototype.preload = function() {
    
}

HelloState.prototype.create = function(){

    this.game.add.text(400, 300, "You Win", {fill: "#ffffff"});
}

HelloState.prototype.update = function() {
    
    
}

