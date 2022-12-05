window.Actions = {
    damage1: {
        name:"Whomp",
        success:[
            {type:"textMessage",text:"{CASTER} uses {ACTION}!"},
            {type:"animation",animation:"spin"},
            {type:"stateChange", damage:10},
        ]

    },
    saucyStatus: {
        name:"Zone",
        targetType:"friendly",
        success:[
            {type:"textMessage",text:"{CASTER} uses {ACTION}!"},
            {type:"stateChange", status:{ type:"saucy", expiresIn:2}},
        ]

    },
    clumsyStatus: {
        name:"cublicane bender",
        success:[
            {type:"textMessage",text:"{CASTER} uses {ACTION}!"},
            {type:"animation",animation:"glob",color:"white"},
            {type:"stateChange", status:{ type:"clumsy", expiresIn:2}},
            {type:"textMessage",text:"{TARGET} goes on a bender!"},
        ]

    },

}