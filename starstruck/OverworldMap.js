class OverworldMap{
    constructor(config){
        this.overworld=null;
        this.gameObject = config.gameObjects;
        this.walls = config.walls || {}
        this.custceneSpaces = config.custceneSpaces||{};

        //drawn below char
        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;
        this.lowerSrc = config.lowerSrc;
        

        //drawn above char
        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;

        //if global cutscene var 
        this.isCutscenePlaying = false;
    }//of overworld map constructor
    
    drawLowerImage(ctx,cameraperson){
        ctx.drawImage(this.lowerImage,utils.withGrid(10.5)-cameraperson.x,
        utils.withGrid(6)-cameraperson.y);
    }//of lower image

    drawUpperImage(ctx,cameraperson){
        ctx.drawImage(this.upperImage,
        utils.withGrid(10.5)-cameraperson.x,
        utils.withGrid(6)-cameraperson.y);
    }//of upper image 

    isSpaceTaken(currentx,currenty,direction){
        const {x,y} = utils.nextPosition(currentx,currenty,direction);
        //console.log(x,y)
        // console.log(this.walls)
        return this.walls[`${x},${y}`] || false
    }

    mountObjects(){
        Object.keys(this.gameObject).forEach(key =>{

            let object = this.gameObject[key];
            object.id = key;

            //TODO: determine if this object should mount
            object.mount(this);
        });
    }

    checkForActionCutscene(){
        const hero = this.gameObject["hero"];
        const nextCoords = utils.nextPosition(hero.x,hero.y,hero.direction);
        const match = Object.values(this.gameObject).find(object =>{
            return `${object.x},${object.y}`=== `${nextCoords.x},${nextCoords.y}`
        });

        if(!this.isCutscenePlaying && match && match.talking.length){
            this.startCutscene(match.talking[0].events)
        }
    }

    checkForFootstepCutscene(){
        //grap hero location and check it against 
        //cutscene spaces
        const hero = this.gameObject["hero"];
        const match = this.custceneSpaces[`${hero.x},${hero.y}`];

        if(!this.isCutscenePlaying && match){
            this.startCutscene(match[0].events)
        }

    }

    async startCutscene(events){
        this.isCutscenePlaying = true;

        //start a loop of async events 
        //await each one
        for(let i=0;i<events.length;i++){
            const eventHandler = new OverworldEvent({
               event: events[i],
               map: this, 
            })
            await eventHandler.init();
        }

        this.isCutscenePlaying = false;

        //reset npcs to idle
        Object.values(this.gameObject).forEach(object => object.doBehaviorEvent(this))
    }


    //methods to manage walls on game objects
    addwall(x,y){
        this.walls[`${x},${y}`] = true;
    }
    removewall(x,y){
        this.walls[`${x},${y}`] = false;
    }
    movewall(wasx,wasy,direction){
        this.removewall(wasx,wasy);
        const {x,y} = utils.nextPosition(wasx,wasy,direction);
        this.addwall(x,y);
    }
}//of overworld map

window.OverworldMaps={
    DemoRoom:{
        lowerSrc: "images/maps/DemoLower.png",
        upperSrc: "images/maps/DemoUpper.png",
        gameObjects:{
            hero: new Person({
                isPlayerControlled: true,
                x:utils.withGrid(5),
                y:utils.withGrid(6)
            }),
            npc1: new Person({
                x:utils.withGrid(7),
                y:utils.withGrid(9),
                src:"images/characters/people/npc1.png",
                behaviorLoop:[
                    {type: "stand", direction:"left",time:800},
                    {type: "stand", direction:"up",time:500},
                    {type: "stand", direction:"down",time:2000},
                    {type: "stand", direction:"up",time:1200},
                ],
                talking:[
                  {
                  events:[
                    {type:"textMessage",text:"Dont enter that closet",faceHero:"npc1"},
                    {type:"textMessage",text:"or leave through the front"},
                    {who:"hero",type: "walk", direction: "left"},
                   ]
                  } 
                ]
            }),
            npc2: new Person({
                x:utils.withGrid(8),
                y:utils.withGrid(5),
                src:"images/characters/people/npc2.png",
                behaviorLoop:[
                    //walk in a loop with pause
                    // {type: "walk", direction: "left"},
                    // {type: "stand", direction:"up",time:800},
                    // {type: "walk", direction: "up"},
                    // {type: "walk", direction: "right"},
                    // {type: "walk", direction: "down"},

                ]
            }),
         },
        walls:{
            //"16,16": true
            [utils.asGridCord(7,6)] : true,
            [utils.asGridCord(8,6)] : true,
            [utils.asGridCord(7,7)] : true,
            [utils.asGridCord(8,7)] : true,
            
        },
        custceneSpaces: {
        [utils.asGridCord(7,4)]: [
            {
                events: [
                    {who:"npc2",type:"walk",direction:"left"},
                    {who:"npc2",type:"stand",direction:"up",time:500},
                    {type:"textMessage",text:"you cant be in there!!!"},
                    {who:"npc2",type:"walk",direction:"right"},

                    {who:"hero",type:"walk",direction:"down"},
                    {who:"hero",type:"walk",direction:"left"},
                ]
            }
        ],
        [utils.asGridCord(5,10)]: [
            {
                events:[
                    {type:"battle"}
                ]
            }
        ],
        
        }
    },
    Kitchen:{
        lowerSrc: "images/maps/KitchenLower.png",
        upperSrc: "images/maps/KitchenUpper.png",
        gameObjects:{
            hero: new Person({
                isPlayerControlled: true,
                x:utils.withGrid(5),
                y:utils.withGrid(5)
            }),
            npc3: new Person({
                x:utils.withGrid(10),
                y:utils.withGrid(8),
                src:"images/characters/people/npc3.png",
                talking:[
                    {
                        events:[
                            {type:"textMessage",text:"you made it!", faceHero:["npc3"]},

                        ]
                    }
                ],
            })
        }
    },
}