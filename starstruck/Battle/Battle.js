class Battle{
    constructor(){
        this.combatants = {
            "player1" : new Combatant({
                //pulls all values defined already
                ...Pizzas.s001,
                team: "player",
                hp:30,
                maxHp:50,
                xp:75,
                maxXp: 100,
                level:0,
                status:null,
                isPlayerControlled:true,
             },this),
            //  "enemy1" : new Combatant({
            //     //pulls all values defined already
            //     ...Pizzas.v001,
            //     team: "enemy",
            //     hp:50,
            //     maxHp:50,
            //     xp:20,
            //     maxXp: 100,
            //     level:1,
            //     status:null,
            //  },this),
             "enemy2" : new Combatant({
                //pulls all values defined already
                ...Pizzas.f001,
                team: "enemy",
                hp:50,
                maxHp:50,
                xp:30,
                maxXp: 100,
                level:1,
                status:null,
             },this)
        }
        this.activeCombatants={
            player: "player1",
            enemy: "enemy2",
        }
    }

    createElement(){
        this.element =  document.createElement("div");
        this.element.classList.add("Battle");
        this.element.innerHTML = (`
        <div class = "Battle_hero">
            <img src = "${'/images/characters/people/hero.png'}" alt = "Hero" />
        </div>
        <div class = "Battle_enemy">
            <img src = "${'/images/characters/people/npc3.png'}" alt = "Enemy" />
        </div>
        `)
    }//of create element

    init(container){
        this.createElement();
        container.appendChild(this.element);
        
        Object.keys(this.combatants).forEach(key=>{
            let combatant =  this.combatants[key];
            combatant.id = key;
            combatant.init(this.element);
        });

        this.turnCycle =  new TurnCycle({
            battle: this,
            onNewEvent: event =>{
                return new Promise(resolve =>{
                    const battleEvent =  new BattleEvent(event,this)
                    battleEvent.init(resolve);
                })
            }
        })

        this.turnCycle.init();
    }
}