//this is how we create things such as boxes etc
class GameObject{
    constructor(config){
        this.id = null;
        this.isMounted=false;
        this.x =config.x || 0;
        this.y =config.y || 0;
        this.direction = config.direction || "down";
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "images/characters/people/hero.png",
            

        });
        this.behaviorLoop = config.behaviorLoop || [];
        this.behaviorLoopIndex =0;
    }
    
    mount(map){
        this.isMounted = true;
        map.addwall(this.x,this.y);

        //if we have a behavior, kick off after a short delay
        setTimeout(()=>{
            this.doBehaviorEvent(map);
        },10)
    }

    update(){

    }

    async doBehaviorEvent(map){

        //if global cutscene running or non-existant behavior loop
        if(map.isCutscenePlaying || this.behaviorLoop.length ===0){
            return;
        }


        //setting events relevant info 
        let eventConfig  = this.behaviorLoop[this.behaviorLoopIndex];
        eventConfig.who = this.id;

        //create a event instance with our next config 
        const eventHandler = new OverworldEvent({ map,event:eventConfig});
        await eventHandler.init();

        //setting the next event to fire 
        this.behaviorLoopIndex +=1;

        if(this.behaviorLoopIndex ==  this.behaviorLoop.length){
            this.behaviorLoopIndex =0;
        }

        //do it again!
        this.doBehaviorEvent(map);
    }
}//of game object class 