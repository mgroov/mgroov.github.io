class Overworld{

    constructor(config){
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx =  this.canvas.getContext("2d");
        this.map = null;
        this.maxFPS = 60;
        this.lastFrameTimeMs = 0;
    }//of constructor

    //starts the game loop to draw 
    //etc 
    startGameLoop(){
        const step =(timestamp) =>{

            if (timestamp < this.lastFrameTimeMs + (1000 / this.maxFPS)) {
                requestAnimationFrame(step);
                return;
            }
            this.lastFrameTimeMs = timestamp;

            //update all objects before drawing to avoid artifacts
            Object.values(this.map.gameObject).forEach(Object =>{
                Object.update({
                    arrow:this.directionInput.direction,
                    map: this.map
                });
            })

            
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

            //establish camera person
            const cameraperson = this.map.gameObject.hero;

            

            //Draw lower layer
            this.map.drawLowerImage(this.ctx,cameraperson);

            //Draw Game Objects
            Object.values(this.map.gameObject).sort((a,b) => {
                return a.y - b.y;
            }).forEach(Object =>{
                Object.sprite.draw(this.ctx, cameraperson);
            })

            //Draw upper 
            this.map.drawUpperImage(this.ctx,cameraperson);
            //calls a step per animation frame
            requestAnimationFrame(step);
        }//of game loop 
        requestAnimationFrame(step);
        console.log("hi");
    }//of start game loop 

    bindActionInput(){
        new KeyPressListener("Enter",()=>{
            //Is there a person here that we can talk to
            this.map.checkForActionCutscene();
        })
        new KeyPressListener("e",()=>{
            //Is there a person here that we can talk to
            this.map.checkForActionCutscene();
        })
    }

    bindHeroPositionCheck(){
        document.addEventListener("personWalkingComplete",e=>{
            if(e.detail.whoId ==="hero"){
               //heros position changed check events
               //console.log("Movement check")
               this.map.checkForFootstepCutscene(); 
            }
        })
    }

    startMap(mapConfig){
        this.map =  new OverworldMap(mapConfig);
        this.map.overworld = this;
        this.map.mountObjects();
    }

    //initalises overworld 
    init(){
        //starts game loop
        this.startMap(window.OverworldMaps.DemoRoom);
        
        this.directionInput =  new DirectionInput();
        this.directionInput.init();
        //console.log(this.map.walls)


        this.bindActionInput();
        this.bindHeroPositionCheck();

        this.startGameLoop();

        this.map.startCutscene([
            {type:"battle"}
            //{type:"changeMap",map:"DemoRoom"}
             //{type:"textMessage",text:"This is a long message to test if my code is working"},
         
        ]);
    

    }//of init

}//of overall class