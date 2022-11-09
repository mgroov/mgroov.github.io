class OverworldEvent{
    constructor({map,event}) {
        this.map = map;
        this.event = event;
    }

    //sets solution to the async so it ends
    init(){
        return new Promise(resolve =>{
            this[this.event.type](resolve);
        })
    }

    stand(resolve){

        const who = this.map.gameObject[this.event.who];
        who.startBehavior({
            map:this.map,
        },{
            type:"stand",
            direction: this.event.direction,
            time: this.event.time
        
        })

        //sets up a handler to resolve behavior loop when person is done walking
        const completeHandler = e =>{
            if(e.detail.whoId == this.event.who){
                document.removeEventListener("personStanding", completeHandler);
                resolve();
            }
        }

        document.addEventListener("personStanding", completeHandler)

    }

    walk(resolve){
        const who = this.map.gameObject[this.event.who];
        who.startBehavior({
            map:this.map,
        },{
            type:"walk",
            direction: this.event.direction,
            retry:true
        })
        
        //sets up a handler to resolve behavior loop when person is done walking
        const completeHandler = e =>{
            if(e.detail.whoId == this.event.who){
                document.removeEventListener("personWalkingComplete", completeHandler);
                resolve();
            }
        }

        document.addEventListener("personWalkingComplete", completeHandler)

    }

    textMessage(resolve){

        if(this.event.faceHero){
            const obj=this.map.gameObject[this.event.faceHero];
            obj.direction = utils.oppositeDirection(this.map.gameObject["hero"].direction);
        }

        const message = new TextMessage({
          text: this.event.text,
          onComplete:  () =>resolve() 
        })

        message.init(document.querySelector(".game-container"));
    }

    changeMap(resolve){

        const scenetran = new SceneTransition();
        scenetran.init(document.querySelector(".game-container"), ()=>{
            console.log('done');
             this.map.overworld.startMap(window.OverworldMaps[this.event.map]);
             resolve();

             scenetran.fadeOut();
        }); 
    }

    battle(resolve){
        const battle =  new Battle({
            onComplete: () =>{
                resolve();
            }
        })

        battle.init(document.querySelector(".game-container"));

    }
}