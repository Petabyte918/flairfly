
class Preload extends Phaser.State {    
    preload(){
        
        //
        this.msgText = this.game.add.text(200, 150, 'Loading...', { fontSize: '30px', fill: 'whitesmoke' });
        this.msgText.x = this.game.width/2 - this.msgText.width/2;
        this.msgText.y = this.game.height/2 - this.msgText.height/2;

        //player
        this.load.image('player', 'assets/player.png');
        this.load.image('pixel_player', 'assets/pixel_player.png');
        
        //wall
        this.load.image('wall_white', 'assets/wall_white.png');
        this.load.image('wall_green', 'assets/wall_green.png');
        this.load.image('wall_blue', 'assets/wall_blue.png');
        this.load.image('wall_brown', 'assets/wall_brown.png');
        this.load.image('wall_purple', 'assets/wall_purple.png');
        this.load.image('wall_yellow', 'assets/wall_yellow.png');
        this.load.image('wall_maroon', 'assets/wall_maroon.png');
        this.load.image('wall_orange', 'assets/wall_orange.png');
        this.load.image('wall_pink', 'assets/wall_pink.png');
        
        //particles
        this.load.image('pixel_player', 'assets/pixel_player.png');
        this.load.image('pixel_green', 'assets/pixel_green.png');
        this.load.image('pixel_blue', 'assets/pixel_blue.png');
        this.load.image('pixel_brown', 'assets/pixel_brown.png');
        this.load.image('pixel_purple', 'assets/pixel_purple.png');
        this.load.image('pixel_yellow', 'assets/pixel_yellow.png');
        this.load.image('pixel_maroon', 'assets/pixel_maroon.png');
        this.load.image('pixel_orange', 'assets/pixel_orange.png');
        this.load.image('pixel_pink', 'assets/pixel_pink.png');

        //button
        this.load.image('start', 'assets/btnStart.png');  
        this.load.image('about', 'assets/btnAbout.png');          
    }  
    
    create(){
        this.state.start('Mainmenu');
    }
    
	
}

export default Preload;
