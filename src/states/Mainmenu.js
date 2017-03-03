import Play from './Play';

class Mainmenu extends Phaser.State {
    
	create() {    
        
        //background
        this.msgText = this.game.add.text(200, 150, 'FlairFly', { fontSize: '80px', fill: 'Whitesmoke' });
        this.msgText.x = this.game.width/2 - this.msgText.width/2;

        this.start =  this.game.add.button(this.game.width/2 - this.game.cache.getImage('start').width/2, 350, 'start', start, this, 2, 1, 0);
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.spaceKey.onDown.add(start, this);
        function start(){
            this.state.start('Play');
        }  

        this.about =  this.game.add.button(this.game.width/2 - this.game.cache.getImage('start').width/2, 450, 'about', help, this, 2, 1, 0);

        function help(){
            this.state.start('About');
        }

        //left
        this.emitterR = this.game.add.emitter(this.game.world.width, this.game.world.height/2, 200);        
        this.emitterR.makeParticles('pixel_green');
        this.emitterR.minParticleSpeed.setTo(-100, -100);
        this.emitterR.maxParticleSpeed.setTo(-200, -200);       
        this.emitterR.start(false, 1000, 5);

        //right
        this.emitterL = this.game.add.emitter(0, this.game.world.height/2, 200);        
        this.emitterL.makeParticles('pixel_orange');
        this.emitterL.minParticleSpeed.setTo(100, -100);
        this.emitterL.maxParticleSpeed.setTo(200, -200);       
        this.emitterL.start(false, 1000, 5);               
        
	} 	
}

export default Mainmenu;
