class Person extends GameObject{
    constructor(config){
        //uses game object constructor to init values
        super(config);
        this.movingProgressRemaining = 0;

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
        this.updatePosition();

        if(this.isPlayerControlled && this.movingProgressRemaining === 0 && state.arrow){
            this.direction = state.arrow;
            this.movingProgressRemaining +=16;
        }
    }

    updatePosition(){
        //if we still have movement to go use the direction and map
        // to change position
        if(this.movingProgressRemaining > 0){
            const[property,change] = this.directionUpdate[this.direction];
            this[property] += change;
            this.movingProgressRemaining -=1;
        }//movement check and change



    }//of update position
}