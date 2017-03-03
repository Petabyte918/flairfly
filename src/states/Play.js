class Play extends Phaser.State {
    
	create() {  

        //set physics engine
        this.game.physics.startSystem(Phaser.Physics.ARCADE);    
        
        //player         
        this.player = this.game.add.sprite(200, this.game.world.height/2, 'player');
        this.player.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(this.player);  
        //this.player.body.collideWorldBounds = true;             
        this.player.body.gravity.y = 2000;        
       
        //globals        
        this.RSPEED = 7;
        this.wallColors = ['green', 'pink', 'blue', 'maroon', 'orange', 'brown', 'purple']; 
      
        //groups
        this.doors = this.game.add.group(); 
        this.walls = this.game.add.group();
              
        //score
        this.score = 0;
        this.scoreText = this.game.add.text(this.game.world.width/2, 20, '0', { fontSize: '90px', fill: 'whitesmoke' });  

        // player particles
        this.emitter = this.game.add.emitter(this.game.world.centerX, 200, 200);        
        this.emitter.makeParticles('pixel_player');
        this.emitter.minParticleSpeed.setTo(-100, -100);
        this.emitter.maxParticleSpeed.setTo(-200, -200);       
        this.emitter.start(false, 1000, 5);        
                
                
        //enemyTimer
        this.wallTimer = this.game.time.create(false);        
        this.wallTimer.loop(2000, this.generateWall, this);        
        this.wallTimer.start();

        //controls
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.spaceKey.onDown.add(fire, this);
        function fire(){this.rise();}        
        this.game.input.mouse.capture = true;
    }  
    
    update(){

        this.player.angle += this.RSPEED; 
        this.emitter.x = this.player.body.x + this.game.cache.getImage('player').width/2;
        this.emitter.y = this.player.body.y + this.game.cache.getImage('player').height/2;
               
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            this.rise();            
        }        

        if(this.game.input.activePointer.leftButton.isDown){
            this.rise();
        }
        
        //collide with door
        this.game.physics.arcade.overlap(this.player, this.doors, incScore, null, this);
        function incScore (player, door) { 
            door.kill();  
            this.score++;
            this.scoreText.setText(this.score);
            this.particleBurst(door.body.x + this.game.cache.getImage('wall_green').width/2, door.body.y + this.game.cache.getImage('wall_green').height/2, door._color);            
        }
        
        //collide with wall
        this.game.physics.arcade.overlap(this.player, this.walls, die, null, this);
        function die(player, wall) {           
            this.gameover();
        }
        
        //collide with bounds
        if(this.player.body.y < -100 || this.player.body.y > this.game.world.height + 100) this.gameover();;
                         
        //check bounds
        this.walls.forEachAlive(function(e){
            if(e.body.x < -100) e.kill();           
        });  
        this.doors.forEachAlive(function(e){
            if(e.body.x < -100) e.kill();           
        });
    }

    rise(){
        this.player.body.velocity.y = -550;
    }

    generateWall(){
        
        var randomWallPos = this.random(0, 7);        
        var x = 60*18;
        var speed = -500;
        var a = -100;

        for(var i=0; i<10; i++){            
            if(i === randomWallPos){ 
                var randomColor = (this.wallColors[this.random(0, 6)]);                
                var d = this.game.add.sprite(x, (0 + i*60), 'wall_'+ randomColor ); 
                d._color = randomColor;
                this.game.physics.arcade.enable(d);
                d.body.velocity.x = speed;
                d.body.acceleration.x = a;
                this.doors.add(d);
                i+=2;                
            }            
            var w = this.game.add.sprite(x, (0 + i*60), 'wall_white');  
            this.game.physics.arcade.enable(w);
            this.walls.add(w);            
            w.body.velocity.x = speed;
            w.body.acceleration.x = a;
        }
        
    }
    
    particleBurst(x, y, color) { 
        
        //burst particles
        this.burstEmitter = this.game.add.emitter(0, 0, 100);        
        this.burstEmitter.minParticleSpeed.setTo(-300, -100);
        this.burstEmitter.maxParticleSpeed.setTo(-400, -200);
        this.burstEmitter.makeParticles('pixel_'+color);
        this.burstEmitter.x = x;
        this.burstEmitter.y = y;
        this.burstEmitter.start(true, 2000, null, 50);
        
        this.game.time.events.add(1000, this.destroyEmitter, this);
    }
    
    destroyEmitter(){
        this.burstEmitter.destroy();
    }

    gameover(){

        try{
            var self = this;
            self.emitter.destroy();
            self.scoreText.kill();   

            //pause everything
            self.walls.forEachAlive(function(e){
                e.body.velocity.x = 0;
                e.body.acceleration.x = 0;               
            });
            self.doors.forEachAlive(function(e){
                e.body.velocity.x = 0;
                e.body.acceleration.x = 0;               
            });

            self.player.body.moves = false;              

            self.state.start('Gameover', false, true, self.score);  
           
        }catch(e){}
    }
        
    random(min, max){  
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    
}

export default Play;
