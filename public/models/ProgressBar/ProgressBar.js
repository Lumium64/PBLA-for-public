class ProgressBar {

    constructor(total = 0, done = 0, planned = 0){

        this.total = total;
        this.done = done;
        this.planned = planned;

        this.root = document.createElement("div");
        this.root.className = "progress-container";


        this.bar = document.createElement("div");
        this.bar.className = "progress-bar";


        this.doneElement = document.createElement("div");
        this.doneElement.className = "progress-done";

        this.plannedElement = document.createElement("div");
        this.plannedElement.className = "progress-planned";

        this.textElement = document.createElement("div");
        this.textElement.className = "progress-text";

        this.doneText = document.createElement("span");
        this.doneText.className = "progress-done-text";
        
        this.separator1 = document.createElement("span");
        this.separator1.className = "progress-separator";
        this.separator1.textContent = "/";

        this.plannedText = document.createElement("span");
        this.plannedText.className = "progress-planned-text";

        this.separator2 = document.createElement("span");
        this.separator2.className = "progress-separator";
        this.separator2.textContent = "/";

        this.remainingText = document.createElement("span");
        this.remainingText.className = "progress-remaining-text";
        
        this.textElement.appendChild(this.doneText);
        this.textElement.appendChild(this.separator1);
        this.textElement.appendChild(this.plannedText);
        this.textElement.appendChild(this.separator2);
        this.textElement.appendChild(this.remainingText);
        this.bar.appendChild(this.doneElement);
        this.bar.appendChild(this.plannedElement);
        this.root.appendChild(this.bar);
        this.root.appendChild(this.textElement);

        this.update();
    }

    createElement(){

        return this.root;
    }

    setValues(total, done, planned){

        this.total = total;
        this.done = done;
        this.planned = planned;

        this.update();
    }

    update(){

        if(this.total <= 0){

            this.doneElement.style.width = "0%";
            this.plannedElement.style.width = "0%";

            this.doneText.textContent = "0";
            this.plannedText.textContent = "0";
            this.remainingText.textContent = "0";

            return;
        }

        const donePercent = Math.min(100, this.done / this.total * 100);
        const plannedPercent = Math.min(100, this.planned / this.total * 100);

        this.doneElement.style.width = `${donePercent}%`;
        this.plannedElement.style.left = `${donePercent}%`;
        this.plannedElement.style.width = `${plannedPercent}%`;

        this.doneText.textContent = this.done;

        this.plannedText.textContent = this.planned;

        this.remainingText.textContent =Math.max(0, this.total - this.done - this.planned);
    }
}