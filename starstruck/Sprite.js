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
            //default animation frames
            "idle-down":    [[0,0]],
            "idle-right":   [[0,1]],
            "idle-up":      [[0,2]],
            "idle-left":    [[0,3]],
            "walk-down":    [[1,0],[0,0],[3,0],[0,0]],   
            "walk-right":   [[1,1],[0,1],[3,1],[0,1]], 
            "walk-up":      [[1,2],[0,2],[3,2],[0,2]], 
            "walk-left":    [[1,3],[0,3],[3,3],[0,3]],       
        }
        this.currentAnimation =  config.currentAnimation || "idle-down";
        //console.log(this.currentAnimation)
        this.currentAnimationFrame = 0;

        //speed of animation
        this.animationFrameLimit = config.animationFrameLimit || 4;
        this.animationFrameProgress = this.animationFrameLimit;

        //refrence the game object 
        this.gameObject = config.gameObject;
    }//of sprite constructor 

    get frame(){
        return this.animations[this.currentAnimation][this.currentAnimationFrame]
    }

    setAnimation(key){
        if(this.currentAnimation !== key){
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit;
        }
    }

    updateAnimationProgress(){
        //Downtick frame progress
        if(this.animationFrameProgress > 0){
            this.animationFrameProgress -=1;
            return;
        }

        //otherwise reset progress 
        this.animationFrameProgress =  this.animationFrameLimit;
        this.currentAnimationFrame +=1;

        if(this.frame === undefined){
            this.currentAnimationFrame =0;
        }
    }

    draw(ctx, cameraperson){
        //nudging standarised to get clean grid 
        //drawing
        const x = this.gameObject.x  -8 + utils.withGrid(10.5) -cameraperson.x;
        const y = this.gameObject.y  -18 + utils.withGrid(6) - cameraperson.y;

        //checks and draws the shadow
        this.isShadowLoaded && ctx.drawImage(this.shadow,x,y);


        const[framex,framey] = this.frame;

        //checks that the sprite is loaded before
        //trying to draw
       this.isLoaded && ctx.drawImage(this.image,
            framex*32 ,framey *32,// left cut | top cut
            32,32,//size of cut | size of cut
            x,y,//position | position
            32,32//size of | size of
            
        );

        this.updateAnimationProgress();

    }
}