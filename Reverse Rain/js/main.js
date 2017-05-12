var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-canvas');

game.state.add('game', GameState);
game.state.add('win', HelloState);
game.state.add('lose', LoseState);
game.state.start('win');
