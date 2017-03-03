import Play from './Play';

class Gameover extends Phaser.State {
    
    init(score){
        this.score = score;
    }

	create() {    
        
                       
        //game over message
        this.msgText = this.game.add.text(200, 150, 'Game Over ', { fontSize: '80px', fill: 'gray' });
        this.msgText.x = this.game.width/2 - this.msgText.width/2;

        this.scoreText = this.game.add.text(330, 280, 'Score : ' + this.score, { fontSize: '30px', fill: 'gold' });
        this.scoreText.x = this.game.width/2 - this.scoreText.width/2;

        this.restart =  this.game.add.button(this.game.width/2 - this.game.cache.getImage('start').width/2, 350, 'start', restart, this, 2, 1, 0);
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.spaceKey.onDown.add(restart, this);
        function restart(){
            this.state.start('Play');
        }                  

	} 	
}

export default Gameover;
