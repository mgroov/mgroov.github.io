window.PizzaTypes = {
    normal:"normal",
    spicy:"spicy",
    veggie: "veggie",
    fungi: "fungi",
    chill: "chill"
}

window.Pizzas = {
    "s001":{
        name:"slice samurai",
        type: PizzaTypes.spicy,
        src: "images/characters/people/npc1.png",
        icon: "images/icons/spicy.png",
        isPlayerControlled:true,
        actions:["saucyStatus","clumsyStatus","damage1"],
    },
    "v001":{
        name:"Kale",
        type: PizzaTypes.veggie,
        src: "images/characters/people/npc2.png",
        icon: "images/icons/veggie.png",
        actions:["damage1"],
    },
    "f001":{
        name:"portabello",
        type: PizzaTypes.fungi,
        src: "images/characters/people/npc3.png",
        icon: "images/icons/fungi.png",
        actions:["damage1"],
    },
}