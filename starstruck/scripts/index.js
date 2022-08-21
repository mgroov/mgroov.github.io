const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d'); //gets relation for drawing

//const buttons = document.getElementsByClassName('button')

const b1 = document.createElement('button')
const b2 = document.createElement('button')
const b3 = document.createElement('button')
const b4 = document.createElement('button')

b1.addEventListener('click',b1click);
b2.addEventListener("click",b2click);
b3.addEventListener("click",b3click);
b4.addEventListener("click",b4click);

//b1.addEventListener()

canvas.width = 854;
canvas.height  = 480;

var gameLoop;

var state = 'home';

c.fillStyle = 'grey'
c.fillRect(0,0,canvas.width,canvas.height)//highlight the canvas''


// b1.addEventListener("click",b1click());

window.onload = function(){

    

    c.fillStyle = 'grey'
    c.fillRect(0,0,canvas.width,canvas.height)//highlight the canvas''


    canvas.width = 854;
    canvas.height  = 480;

 

    //runs 30 times a sec 
    //gameLoop =  setInterval(mainloop,1000/30);

    b1.innerText = 'create';
    b2.innerText = 'load';
    b3.innerText = 'settings';
    b4.innerText = ' ';

    b4.disabled = true;

    b1.classList.add("button");
    b2.classList.add("button");
    b3.classList.add("button");
    b4.classList.add("button");

    document.body.appendChild(b1);
    document.body.appendChild(b2);
    document.body.appendChild(b3);
    document.body.appendChild(b4);
  
    loadimg('images/home.jpg');

    mainloop();
    

}//esentially the start function


function mainloop(){
    
    update();
    draw();

}//the main game loop

function update(){
    if(state=='home'){
       homeupd();
    }
    if(state=='creation'){
       createupd();
    }

}

function draw(){
    if(state=='home'){
        drawhome();
     }
     if(state=='creation'){
        drawcreate();
     }
    
    

   
}//draws everything




