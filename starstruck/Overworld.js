class Overworld{

    constructor(config){
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx =  this.canvas.getContext("2d");
    }//of constructor

    init(){
        console.log("overworld starting", this);
        //loading an image to the canvas
        const image = new Image();
        //draws the image once we load it to memory
        image.onload = () =>{
            this.ctx.drawImage(image,0,0);
        };
        image.src="/images/maps/DemoLower.png";
        //end of loading image to canvas

        //drawing works in layers on top last
        const hero = new Image();
        hero.onload = () =>{
            this.ctx.drawImage(hero,0,0);
        };
        image.src = "/images/charachters/people/hero.png";

    }//of init

}//of overall class