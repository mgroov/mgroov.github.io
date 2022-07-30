class line{
     constructor(width, height, color, a, b) {  
            this.width = width;  
            this.height = height;  
            this.a = a;  
            this.b = b;
            this.color = color      
            c.fillStyle = color;  
            c.fillRect(this.a, this.b, this.width, this.height);  
        }  

        update(){
            this.draw()
        }

        draw(){
            c.fillStyle = this.color
            c.fillRect(this.a, this.b, this.width, this.height);
        }
}