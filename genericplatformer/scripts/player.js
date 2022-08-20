class Player{
    constructor(x,y) {
        this.x =x; 
        this.y =y;
        this.width=50;
        this.friction = 0.1;
        this.height =100;
        this.xvel =0;
        this.yvel = 0;
        this.active = true;
    }//constructor

    update(){
        if(this.active){
            if(!left && !right || left && right){
            
                this.xvel *= this.friction; 
    
            }//if keys are not active slow down or both are
            else if (right){
                this.xvel++;
            }
            else if (left){
                this.xvel --;
            }

            if(up){
                this.yvel -= 15;
            }

            this.x += this.xvel;
            this.y += this.yvel;

        }
    }

    draw(){
        ctx.fillStyle = "red";
        ctx.fillRect(this.x,this.y, this.width,this.height);
    }
}