const utils={
    //returns val multiplied by 16
    //used to measure grid movement
    withGrid(n){
        return n * 16
    }//of with grid
    ,
    asGridCord(x,y){
        //console.log("${x*16},${y*16}")
        return `${x*16},${y*16}` || false;
    },
    nextPosition(initx,inity,direction){
        let x= initx;
        let y = inity;
        const size =16;

        if(direction === "left"){
            x-=size;
        }
        else if(direction === "right"){
            x+=size;
        }
        else if(direction === "up"){
            y-= size;
        }
        else if(direction === "down"){
            y += size;
        }
        return{x,y};

    },
    oppositeDirection(direction){
        if(direction === "left"){return "right";}
        if(direction === "right"){return "left";}
        if(direction === "up"){return"down";}
        return"up";
    },

    wait(ms){
        return new Promise(resolve =>{
        setTimeout(() =>{
            resolve()
        },ms)
        })
    },

    randomFromArray(array){
        return array[Math.floor(Math.random()*array.length)]
    },
    emitEvent(name,detail){
        const event = new CustomEvent(name,{
            detail
        });
        document.dispatchEvent(event);
    }
}