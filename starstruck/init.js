//this function calls itself
(function(){

    //initialising overworld 
    const overworld = new Overworld({
        element:document.querySelector(".game-container")
    });

    overworld.init();
    //end of overwold init

})();//end of function calling itself