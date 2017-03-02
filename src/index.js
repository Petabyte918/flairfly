import Play from 'states/Play';
import Preload from 'states/Preload';
import Gameover from 'states/Gameover';
import Mainmenu from 'states/Mainmenu';
import About from 'states/About';

class Game extends Phaser.Game {

	constructor() {
		super(60*18, 60*10, Phaser.AUTO, 'content', null);
        
        //add states
        this.state.add('Preload', Preload, false);
		this.state.add('Play', Play, false);
        this.state.add('Gameover', Gameover, false);
        this.state.add('Mainmenu', Mainmenu, false);
        this.state.add('About', About, false);
        
		this.state.start('Preload');
	}

}

new Game();
