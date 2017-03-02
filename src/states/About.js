import Play from './Play';

class About extends Phaser.State {
   
	create() {    
        
                       
        //game over message
        this.msgText = this.game.add.text(200, 150, 'About Falirfly', { fontSize: '40px', fill: 'white' });
        this.msgText.x = this.game.width/2 - this.msgText.width/2;

        var text = "Use 'SPACE', 'UP ARROW', 'LEFT CLICK' to fly.\nRun through the colored boxes between the walls to earn points. \nDeveloped By : Bibhuti \nGame concept : https://www.joshmorony.com/build-a-flappy-bird-jetpack-joyride-hybrid-game-in-phaser/";
        this.description = this.game.add.text(330, 280, text, { fontSize: '15px', fill: 'whitesmoke', boundsAlignH: "center" });
        this.description.x = this.game.width/2 - this.description.width/2;
      
        this.restart =  this.game.add.button(this.game.width/2 - this.game.cache.getImage('start').width/2, 400, 'start', restart, this, 2, 1, 0);
       
        function restart(){
            this.state.start('Play');
        }                  

	} 	
}

export default About;
