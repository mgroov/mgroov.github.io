//this is the script to manage light and darkmode across all pages
//<!--script for light dark toggle listener given by Dr.Hamilton Nmsu-->
//<!--added p to elements toggled to change font -->
document.getElementsByClassName("toggle")[0].onclick = function(){
    document.getElementsByTagName("body")[0].classList.toggle("dark");
    ptoggle()

    //toggle session storage when switch is clicked
    let x = sessionStorage.getItem("drk")
    if(x == "dark"){
        sessionStorage.setItem("drk","")
    }
    else{
        sessionStorage.setItem("drk","dark")
    }
};

//tutorial for session storage followed by 
//https://www.w3schools.com/jsref/prop_win_sessionstorage.asp
//ensure that each state is respected by the new page on load
let x = sessionStorage.getItem("drk")
if(x == "dark"){
    document.getElementsByTagName("body")[0].classList.add("dark");
    padd()
    console.log(sessionStorage.getItem("drk"))
}
else{
    document.getElementsByTagName("body")[0].classList.remove("dark");
    premove()
    console.log(sessionStorage.getItem("drk"))
}


//series of function that light and dark mode all paragraphs
//code inspired by
//https://stackoverflow.com/questions/157260/whats-the-best-way-to-loop-through-a-set-of-elements-in-javascript

function padd(){
    var p = document.getElementsByTagName("P");
    for (var i = p.length - 1; i >= 0; i--)
    {
        p[i].classList.add("dark");
    }
}

function ptoggle(){
    var p = document.getElementsByTagName("P");
    for (var i = p.length - 1; i >= 0; i--)
    {
        p[i].classList.toggle("dark");
    }
}

function premove(){
    var p = document.getElementsByTagName("P");
    for (var i = p.length - 1; i >= 0; i--)
    {
        p[i].classList.remove("dark");
    }
}