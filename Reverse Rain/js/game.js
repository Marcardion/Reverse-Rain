"use strict";

var GameState = function(game) {};

GameState.prototype.preload = function() {
    
    this.game.load.image('player', 'assets/player.png');
    this.game.load.image('platform', 'assets/wallHorizontal.png');
    this.game.load.audio('jumpSound', 'assets/jump.ogg');
    this.game.load.image('coin', 'assets/coin.png');
    this.game.load.audio('coinSound', 'assets/coin.ogg');
}

var cursors;
var firstJump = true;

GameState.prototype.create = function(){
    //Activate physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.game.stage.backgroundColor = "3399ff";
    
    this.platformVerticalSpeed = 50;
    
    //set player in stage
    this.player = this.game.add.sprite(400, 400, 'player');
    this.player.anchor.setTo(0.5, 0.5);
    
    //activate physics on player
    this.game.physics.enable(this.player);
    
    //activate gravity force to player
    this.player.body.gravity.y = 750;
    
    //creating platform
    this.platforms = this.game.add.group();
    this.platforms.enableBody = true;
    
    this.movingPlatform = this.platforms.create(300, 450, 'platform');
    this.normalPlatform = this.platforms.create(200, 300, 'platform');
    this.movingPlatform2 = this.platforms.create(300, 150, 'platform');
    this.normalPlatform2 = this.platforms.create(200, 0, 'platform');
    this.normalPlatform3 = this.platforms.create(100, -100, 'platform');
    this.platforms.setAll('body.immovable', true);
    
    //set platform velocity
    this.movingPlatform.body.velocity.x = -100;
    this.movingPlatform2.body.velocity.x = -100;
    
    //ADD sounds
    this.jumpSound = this.game.add.audio('jumpSound');
    this.coinSound = this.game.add.audio('coinSound');
    
    console.debug("Mensagem de teste");
    
    this.spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    cursors = game.input.keyboard.createCursorKeys();
    
    // Game State
    this.coinCount = 3;

    this.coins = this.game.add.group();
    this.coins.enableBody = true;
    this.coins.setAll('body.immovable', true);
    
    this.gameTime = 0;
    this.coundown = this.game.add.text(15, 15, "Your Time: "  + this.gameTime, {fill: "#ffffff"});
}

GameState.prototype.coinCollision = function(player, coin)
{
    this.coinSound.play();
    this.coinCount--;
    coin.kill();
}

GameState.prototype.update = function() {
    
    if(this.player.y > 650)
    {
        this.game.state.start('lose');
    }
    
    //Collide with group
    this.game.physics.arcade.collide(this.player, this.platforms);
    this.game.physics.arcade.overlap(this.player, this.coins, this.coinCollision, null, this);
    
    //UP and DOWN controls
    
    //if((this.spaceBar.isDown || cursors.up.isDown) && (this.player.body.touching.down || (!this.player.body.touching.down && firstJump))){
    if((this.player.body.touching.down || (!this.player.body.touching.down && firstJump))){
         
        //play sound
        this.jumpSound.play();
        this.player.angle = 0;
        this.game.add.tween(this.player).to( {angle: 360}, 750, Phaser.Easing.Exponential.Out).start();
        
        this.player.body.velocity.y = -450;
        if(firstJump) firstJump = false;
        else firstJump = true;
    }
 
    
    else if (cursors.down.isDown && !this.player.body.touching.down){
             
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 550;
    }
    
    
    //LEFT and RIGHT controls
    
    if (cursors.left.isDown)
    {
           this.player.body.velocity.x = -150;       
    }
    else if (cursors.right.isDown)
    {
         this.player.body.velocity.x = 150;
    }
    else if (this.player.body.touching.down){
        
         this.player.body.velocity.x = 0;
    }
    
    //Set platform vertical movement
    this.movingPlatform.body.velocity.y = this.platformVerticalSpeed;
    this.normalPlatform.body.velocity.y = this.platformVerticalSpeed;
    this.normalPlatform2.body.velocity.y = this.platformVerticalSpeed;
    this.normalPlatform3.body.velocity.y = this.platformVerticalSpeed;
    this.movingPlatform2.body.velocity.y = this.platformVerticalSpeed;
    
    
    //set moving platform 1
    if(this.movingPlatform.x < 100){
        
        this.movingPlatform.body.velocity.x = 100; 
        
    }else if(this.movingPlatform.x > 500){
             
        this.movingPlatform.body.velocity.x = -100;          
        
    }
    
     if(this.movingPlatform.x < 100){
        
        this.movingPlatform.body.velocity.x = 100; 
        
    }else if(this.movingPlatform.x > 500){
             
        this.movingPlatform.body.velocity.x = -100;          
        
    }
    
    //set moving platform 2
    if(this.movingPlatform2.x < 100){
        
        this.movingPlatform2.body.velocity.x = 100; 
        
    }else if(this.movingPlatform2.x > 500){
             
        this.movingPlatform2.body.velocity.x = -100;          
        
    }
    
     if(this.movingPlatform2.x < 100){
        
        this.movingPlatform.body.velocity.x = 100; 
        
    }else if(this.movingPlatform2.x > 500){
             
        this.movingPlatform2.body.velocity.x = -100;          
        
    }
    
   
    
    if(this.movingPlatform.position.y > 650)
        {
            this.movingPlatform.position.x = game.rnd.integerInRange(50, 600);
            this.movingPlatform.position.y = game.rnd.integerInRange(-25, 25);
        }
    if(this.normalPlatform.position.y > 650)
        {
            this.normalPlatform.position.x = game.rnd.integerInRange(50, 600);
            this.normalPlatform.position.y = game.rnd.integerInRange(-25, 25);
        }
     if(this.normalPlatform2.position.y > 650)
        {
            this.normalPlatform2.position.x = game.rnd.integerInRange(50, 600);
            this.normalPlatform2.position.y = game.rnd.integerInRange(-25, 25);
        }
     if(this.normalPlatform3.position.y > 650)
        {
            this.normalPlatform3.position.x = game.rnd.integerInRange(50, 600);
            this.normalPlatform3.position.y = game.rnd.integerInRange(-25, 25);
        }
     if(this.movingPlatform2.position.y > 650)
        {
            this.movingPlatform2.position.x = game.rnd.integerInRange(50, 600);
            this.movingPlatform2.position.y = game.rnd.integerInRange(-25, 25);
        }
    
    this.platformVerticalSpeed = this.platformVerticalSpeed + 0.030;
    this.gameTime = this.gameTime + 0.030;
    this.coundown.text = "Your Time: "  + this.gameTime.toPrecision(2);
    
    if(this.gameTime >= 20 && this.gameTime <= 40)
        {
           this.game.stage.backgroundColor = "#1e5b99";
        }
    else if(this.gameTime >= 40)
        {
           this.game.stage.backgroundColor = "#050f19";  
        }
}
