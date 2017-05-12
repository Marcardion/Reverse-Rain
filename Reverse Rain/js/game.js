"use strict";

var GameState = function(game) {};

GameState.prototype.preload = function() {
    
    this.game.load.image('player', 'assets/gotinha_03.png');
    this.game.load.image('platform', 'assets/wallhorizontal.png');
    this.game.load.image('moving platform', 'assets/wall horizontal roxa.png');
    this.game.load.image('splash', 'assets/pixel.png');
    this.game.load.audio('jumpSound', 'assets/jump.ogg');
    this.game.load.audio('bgMusic', 'assets/bg_music.ogg');
    
    this.game.load.image('bottom', 'assets/bottom.png');
    this.game.load.image('cloud', 'assets/cloud.png');
    this.game.load.image('cloud side', 'assets/cloud_side.png');
}

var cursors;
var firstJump = true;
var playingMusic = false;
var emitter;

GameState.prototype.create = function(){
    
    //Activate physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.game.stage.backgroundColor = "BC8BB2";
    
    this.game.add.sprite(0, 300, 'bottom');
    this.game.add.sprite(100, 100, 'cloud');
    this.game.add.sprite(-100, -50, 'cloud side');
    this.game.add.sprite(640, -20, 'cloud side');
    
    
    this.platformVerticalSpeed = 50;
    
    //create particle
    this.particleEmitter = this.game.add.emitter(0, 0, 100);
    // Utilizando o asset particle para compor as partículas
    this.particleEmitter.makeParticles('splash');
    
    
    //set player in stage
    this.player = this.game.add.sprite(400, 400, 'player');
    this.player.scale.setTo(0.12, 0.12);
    this.player.anchor.setTo(0.5, 0.5);
    
    //activate physics on player
    this.game.physics.enable(this.player);
    
    //activate gravity force to player
    this.player.body.gravity.y = 750;
    
    //creating platform
    this.platforms = this.game.add.group();
    this.platforms.enableBody = true;
    
    this.movingPlatform = this.platforms.create(300, 450, 'moving platform');
    this.normalPlatform = this.platforms.create(200, 300, 'platform');
    this.movingPlatform2 = this.platforms.create(300, 150, 'moving platform');
    this.normalPlatform2 = this.platforms.create(200, 0, 'platform');
    this.normalPlatform3 = this.platforms.create(100, -100, 'platform');
    this.platforms.setAll('body.immovable', true);
    
    //set platform velocity
    this.movingPlatform.body.velocity.x = -100;
    this.movingPlatform2.body.velocity.x = -100;
    
    //ADD sounds
    this.jumpSound = this.game.add.audio('jumpSound');
    this.bgMusic = this.game.add.audio('bgMusic');
    
    console.debug("Mensagem de teste");
    
    this.spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    cursors = game.input.keyboard.createCursorKeys();
    
    
    this.gameTime = 0;
    this.coundown = this.game.add.text(15, 15, "Your Time: "  + this.gameTime, {fill: "#ffffff"});
    this.weather = 0;
}

GameState.prototype.update = function() {
    
    if(!playingMusic){
        
         //Play music
        this.bgMusic.play();
        playingMusic = true;
        
    }
    
    //emitter splash
    this.game.physics.arcade.overlap(this.player, this.platforms, this.platformCollision, null, this);
    
    
    if(this.player.y > 650)
    {
        this.game.state.start('lose');
    }
    
    //Collide with group
    this.game.physics.arcade.collide(this.player, this.platforms);
    
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
    
   
    // Resetting the platforms that go beyond the boundaries
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
    
    //Increasing Speed and Game Time
    this.platformVerticalSpeed = this.platformVerticalSpeed + 0.030;
    this.gameTime = this.gameTime + 0.030;
    this.weather = this.weather + 0.030
    this.coundown.text = "Your Time: "  + this.gameTime.toPrecision(4);
    
    // Change BGColor
    if(this.weather >= 20 && this.weather <= 40)
        {
           this.game.stage.backgroundColor = "EFD970";
        }
    else if(this.weather >= 40 && this.weather <= 60)
        {
           this.game.stage.backgroundColor = "E2B76A";  
        }
    else if(this.weather >= 60 && this.weather <= 80)
        {
           this.game.stage.backgroundColor = "81C4C6";  
        }
    else if(this.weather >= 80 && this.weather <= 100)
        {
           this.game.stage.backgroundColor = "6DC6BD";  
        }
    else if(this.weather >= 100 && this.weather <= 120)
        {
           this.game.stage.backgroundColor = "4D5E7A";  
        }
    else if(this.weather >= 120)
        {
           this.game.stage.backgroundColor = "BC8BB2"; 
           this.weather = 0;
        }
}

function ChangeBGColor()
{
    
}





GameState.prototype.platformCollision = function(player, platform){
   
    this.particleEmitter.x = player.x;
    this.particleEmitter.y = player.y;
    // Depois disso, é só ativá-lo com os parâmetros abaixo:
    // "true" indica que irá emitir todas as partículas simultaneamente
    // 500 é o tempo de emissão em milissegundos
    // o terceiro parâmetro pode ficar como null
    // 10 é o número de partículas
    this.particleEmitter.start(true, 500, null, 10);
    // Por fim, vamos remover a moeda do jogo
    
}



function destroyEmitter() {

    emitter.destroy();

}