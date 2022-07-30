class player{
    constructor({position,velocity}){
        this.position =position
        this.velocity = velocity
        this.height = 75
        this.touchedground = true
    }

    draw(){
        c.fillStyle = "red"
        c.fillRect(this.position.x,this.position.y,50,this.height)
    }

    update(){
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
     

        if(this.position.y+this.height+this.velocity.y >= canvas.height){
            this.velocity.y =0
            this.touchedground = true
        }//if at bottom 
        else{
            this.velocity.y += gravity
            
        }//if not at bottom add velocity till it is
    }
}

const keys = {
    l: {
        pressed: false
    },
    r: {
        pressed: false
    },
    j: {
        pressed: true
    }

}

let lastkey
let velocitystore =1

window.addEventListener('keydown', (event) => {
    switch(event.key){
        case'ArrowUp':
            if(player1.touchedground == true){
                player1.velocity.y =-10
                player1.touchedground =false
            }
        break
        case' ':
            if(player1.touchedground == true){
                player1.velocity.y =-10
                player1.touchedground =false
            }
        break
        case'ArrowRight':
        keys.r.pressed = true
        lastkey='r'
        break
        case'ArrowLeft':
        keys.l.pressed = true
        lastkey='l'
        break
        case'ArrowDown':
            if(velocitystore <= 5){
                velocitystore += 1
                player1.height -= player1.height*0.05
            }
        break
        
    }
  console.log(event);
})

window.addEventListener('keyup', (event) => {
    switch(event.key){
        case' ':
        break
        case'ArrowRight':
        keys.r.pressed = false
        break
        case'ArrowLeft':
        keys.l.pressed = false
        break
        case'ArrowDown':
        if(player1.touchedground == true){
            player1.velocity.y = (-2*velocitystore)
            player1.touchedground =false
            velocitystore=0
            keys.j.pressed=false;
        }
        break
    }
  console.log(event);
})

