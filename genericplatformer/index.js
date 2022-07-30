const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d'); //gets relation for drawing

canvas.width = 750
canvas.height  = 950


const gravity = 0.2 //the amount the player falls by

c.fillStyle = 'grey'
c.fillRect(0,0,canvas.width,canvas.height)//highlight the canvas

const player1 =  new player({
    position:{ //initialize player
        x:canvas.width/2,
        y:canvas.height - 150
    },
    velocity:{
        x:0,
        y:0
    }
})
// width of line , thickness , color , location
floor = new line(canvas.width, 1, "black", 0,canvas.height-10); 


function gameloop(){
    window.requestAnimationFrame(gameloop)
    c.fillStyle = 'grey'
    c.fillRect(0,0,canvas.width,canvas.height)
    player1.update()
    floor.update()  

    player1.velocity.x=0
    if(keys.l.pressed && lastkey=='l'){
        player1.velocity.x =-2
    }
    else if(keys.r.pressed && lastkey == 'r'){
        player1.velocity.x =2
    }
    else if(!keys.j.pressed){
        player1.height=75
        keys.j.pressed=true
    }
   
   
}

gameloop()