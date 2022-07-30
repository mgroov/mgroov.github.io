const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d'); //gets relation for drawing

canvas.width = 1024
canvas.height  = 576

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



function gameloop(){
    window.requestAnimationFrame(gameloop)
    c.fillStyle = 'grey'
    c.fillRect(0,0,canvas.width,canvas.height)
    player1.height =150
    player1.update()

    player1.velocity.x=0
    if(keys.l.pressed && lastkey=='l'){
        player1.velocity.x =-2
    }
    else if(keys.r.pressed && lastkey == 'r'){
        player1.velocity.x =2
    }
    else if(!keys.j.pressed){
        player1.height=150
        keys.j.pressed=true
    }
   
   
}

gameloop()