class TextMessage{
    constructor( {text, onComplete}){
        this.text = text;
        this.onComplete = onComplete;
        this.element =null;
    }

    createElement(){
        //create a element
        this.element = document.createElement("div");
        this.element.classList.add("TextMessage");

        this.element.innerHTML = (`
            <pclass = "TextMessage_p">${this.text}</p>
            <button class = "TextMessage_button">Next</button>
        `)

        this.element.querySelector("button").addEventListener("click",()=>{
            //close the message
            this.done()

        });

        this.actionListener = new KeyPressListener("Enter",()=>{
            this.actionListener.unbind();
            this.done();
        });
    }

    done(){
        this.element.remove();
        this.onComplete();
    }

    init(container){
        this.createElement();
        container.appendChild(this.element);
    }
}