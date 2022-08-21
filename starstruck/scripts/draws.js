function drawhome(){
    
        loadimg('images/home.jpg');
     
}

function drawcreate(){
    
        loadimg('images/char.png');
        console.log(input.value)
        c.font = "bold 30px Arial";
        c.fillStyle = 'white';
        c.fillText("your name is: " + input.value, 10, 50);
    
}




//support function loads and displays background image 
function loadimg(src){
    var img1 = new Image();
                img1.src = src;
                //drawing of the test image - img1
                img1.onload = function () {
                    //draw background image
                    
                    c.fillStyle = "grey";
                    c.fillRect(0,0,canvas.width,canvas.height);
                    c.drawImage(img1, 0, 0,canvas.width,canvas.height);
                    //draw a box over the top
                    // c.fillStyle = "rgba(200, 0, 0, 0.5)";
                    // c.fillRect(0, 0, 500, 500);
                };

                
}