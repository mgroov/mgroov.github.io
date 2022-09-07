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
}