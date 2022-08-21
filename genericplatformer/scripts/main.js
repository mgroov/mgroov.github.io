//create drawing variables
var canvas;
var ctx;

var player1;

var gameLoop;

var state = 'main';

var up,left,right,charge;

//runs once page has loaded
window.onload = function(){

    canvas=document.getElementById("gamescreen");
    ctx = canvas.getContext("2d");

    player1 = new Player(100,200);

    //runs 30 times a sec 
    gameLoop =  setInterval(mainloop,1000/30);


}//esentially the start function


function mainloop(){
    player1.update();

    draw();
}//the main game loop

function draw(){
    //clear canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,600,800);
    

    player1.draw();
}//draws everything

//adds keylistener for press 
document.addEventListener("keydown",function(event){
    console.log(event) 

    switch(event.key){
        case "ArrowUp":
            up=true;
        break;
        case "ArrowDown":
            charge = true;
        break;
        case "ArrowLeft":
            left = true;
        break;
        case "ArrowRight":
            right = true;
        break;
        default:
        break;
    }

});



document.addEventListener("keyup",function(event){
    console.log(event.key)

    switch(event.key){
        case "ArrowUp":
            up=false;
        break;
        case "ArrowDown":
            charge = false;
        break;
        case "ArrowLeft":
            left = false;
        break;
        case "ArrowRight":
            right = false;
        break;
        default:
        break;
    }

});