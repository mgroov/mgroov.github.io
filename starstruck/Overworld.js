class Overworld{

    constructor(config){
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx =  this.canvas.getContext("2d");
        this.map = null;
    }//of constructor

    //starts the game loop to draw 
    //etc 
    startGameLoop(){
        const step =() =>{
            
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

            //Draw lower layer
            this.map.drawLowerImage(this.ctx);

            //Draw Game Objects
            Object.values(this.map.gameObject).forEach(Object =>{
                Object.sprite.draw(this.ctx);
            })

            //Draw upper 
            this.map.drawUpperImage(this.ctx);

            //calls a step per animation frame
            requestAnimationFrame(() =>{
                step();
            })
            
        }//of game loop 
        step();
    }//of start game loop 

    //initalises overworld 
    init(){
        //starts game loop
        this.map =  new OverworldMap(window.OverworldMaps.Kitchen);
        this.startGameLoop();


        //placeholder draw loop
        // setTimeout(() =>{
        //     hero.sprite.draw(this.ctx);
        //     npc1.sprite.draw(this.ctx);
        // },200)
    

    }//of init

}//of overall class