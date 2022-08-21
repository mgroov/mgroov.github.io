function b1click(){
    if(state=='home'){
        state = 'creation';
        mainloop();
    }
    if (state == 'creation'){
        c.fillText("",10,50)
        console.log(input.value)
        c.font = "bold 30px Arial";
        c.fillStyle = 'white';
        c.fillText("your name is: " + input.value, 10, 50); 
        mainloop()
    }
    console.log('b1');
    //b1.disabled = true;

}
function b2click(){

    console.log('b2');

}
function b3click(){

    console.log('b3');

}
function b4click(){

    console.log('b4');

}
