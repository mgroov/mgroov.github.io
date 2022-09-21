class Person extends GameObject{
    constructor(config){
        //uses game object constructor to init values
        super(config);
        this.movingProgressRemaining = 0;
        this.isStanding =false;

        this.isPlayerControlled = config.isPlayerControlled || false;

        //this.direction =  "down";

        //creates a directory of how to change the position
        //based on direction
        this.directionUpdate = {
            "up":["y",-1],
            "down":["y",1],
            "left":["x",-1],
            "right":["x",1],
        }//of direction map
    }//of constructor

    update(state){
        if(this.movingProgressRemaining > 0){
            this.updatePosition();
        }
        else{

            //more cases for walks will come here

            //keyboard ready and have arrow pressed
            if(!state.map.isCutscenePlaying && this.isPlayerControlled && state.arrow){
                this.startBehavior(state,{
                    type:"walk",
                    direction:state.arrow
                })
            }

            this.updateSprite(state);

        }

    }

    startBehavior(state,behavior){
        //setting charachter direction
        this.direction = behavior.direction;
        if(behavior.type === "walk"){
            //stop here if space isnt free
            //console.log(state.map.isSpaceTaken(this.x,this.y,this.direction))
            if(state.map.isSpaceTaken(this.x,this.y,this.direction)){
                behavior.retry && setTimeout(()=>{
                    this.startBehavior(state,behavior)
                },10)
                return;
            } 

            //ready to walk
            state.map.movewall(this.x,this.y,this.direction);
            this.movingProgressRemaining =8;
            this.updateSprite(state);
        }

        //of if behavior is stand
        if(behavior.type === "stand"){
            //prevents queing multiple stand events causing 
            //cascading timeout issues
            this.isStanding = true;
            setTimeout(() =>{
                utils.emitEvent("personStanding",{
                    whoId:this.id
                })
                this.isStanding = false;
            },behavior.time)
        }
    }

    updatePosition(){
        // use the direction and map
        // to change position
        const[property,change] = this.directionUpdate[this.direction];
        this[property] += change;
        this.movingProgressRemaining -=1;

        //we finished the walk so send global check
        if(this.movingProgressRemaining === 0){
           
            //emit if walk completes 
            utils.emitEvent("personWalkingComplete",{
                whoId: this.id
            })
        }
    }//of update position

    updateSprite(){
        if(this.movingProgressRemaining > 0 ){
            this.sprite.setAnimation("walk-"+this.direction);
            return;
        }
        this.sprite.setAnimation("idle-"+this.direction);
    }
}