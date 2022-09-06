class Sprite{
    constructor(config){
        //setup image 
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload=()=>{
            this.isLoaded = true;
        }//this makes it so we dont draw till ready


        //shadow 
        this.shadow = new Image();
        this.useShadow = true; // config.useShadow || false;
        this.shadow.src =  "images/characters/shadow.png";
        if(this.useShadow){
            this.shadow.onload = () =>{
                this.isShadowLoaded = true;
            }
        }//if shadow needs to be used

        //config animation and animation state 
        this.animations = config.animations || {
            //default animation frame
            idleDown:[
                [0,0]
            ]          
        }
        this.currentAnimation = config.currentAnimation || "idleDown";
        this.currentAnimationFrame = 0;

        //refrence the game object 
        this.gameObject = config.gameObject;
    }//of sprite constructor 

    draw(ctx){
        //nudging standarised to get clean grid 
        //drawing
        const x = this.gameObject.x  -8;
        const y = this.gameObject.y  -18;

        //checks and draws the shadow
        this.isShadowLoaded && ctx.drawImage(this.shadow,x,y);

        //checks that the sprite is loaded before
        //trying to draw
       this.isLoaded && ctx.drawImage(this.image,
            0,0,// left cut | top cut
            32,32,//size of cut | size of cut
            x,y,//position | position
            32,32//size of | size of
            
        )

    }
}