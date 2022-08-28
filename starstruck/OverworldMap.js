class OverworldMap{
    constructor(config){
        this.gameObject = config.gameObjects;
        //drawn below char
        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;
        this.lowerSrc = config.lowerSrc;

        //drawn above char
        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
    }//of overworld map constructor
    
    drawLowerImage(ctx){
        ctx.drawImage(this.lowerImage,0,0);
    }//of lower image

    drawUpperImage(ctx){
        ctx.drawImage(this.upperImage,0,0);
    }//of upper image 
}//of overworld map

window.OverworldMaps={
    DemoRoom:{
        lowerSrc: "images/maps/DemoLower.png",
        upperSrc: "images/maps/DemoUpper.png",
        gameObjects:{
            hero: new GameObject({
                x:5,
                y:6
            }),
            npc1: new GameObject({
                x:7,
                y:9,
                src:"images/characters/people/npc1.png"
            })
        }
    },
    Kitchen:{
        lowerSrc: "images/maps/KitchenLower.png",
        upperSrc: "images/maps/Kitchenupper.png",
        gameObjects:{
            hero: new GameObject({
                x:5,
                y:9
            }),
            npc1: new GameObject({
                x:5,
                y:6,
                src:"images/characters/people/npc1.png"
            }),
            npc2: new GameObject({
                x:7,
                y:9,
                src:"images/characters/people/npc2.png"
            })
        }
    },
}