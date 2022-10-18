class RevealingText{
    constructor(config){
        this.element = config.element;
        this.text = config.text;
        this.speed = config.speed || 70;

        this.timeout = null;
        this.isDone = false;
    }

    revealOneChar(list){
        const next = list.splice(0,1)[0];
        next.span.classList.add("revealed");

        if(list.length>0){
            this.timeout = setTimeout(()=>{
                this.revealOneChar(list)
            }, next.delayAfter)
        }else{
            this.isDone = true;
        }

    }

    warptoDone(){
        clearTimeout(this.timeout);
        this.isDone = true;
        this.element.querySelectorAll("span").forEach(s=>{
            s.classList.add("revealed");
        })
    }

    init(){
        let characters = [];
        
        this.text.split("").forEach(charachter =>{
           let span =  document.createElement("span");
           span.textContent = charachter;
           this.element.appendChild(span); 

           //addd this span to our internal state
           characters.push({
            span,
            delayAfter: charachter === " " ? 0 : this.speed ,
           })
        })

        this.revealOneChar(characters);
    }
    
}