class Course{

    constructor(code, name, credits, year, semester, category, status = "none"){

        this.code = code;
        this.name = name;
        this.credits = credits;
        this.year = year;
        this.semester = semester;
        this.category = category;
        this.status = status;

        this.onStatusChanged = null;

        this.root = document.createElement("div");
        this.root.className = "course-element";

        this.codeElement = document.createElement("div");
        this.codeElement.className = "course-code";

        this.nameElement = document.createElement("div");
        this.nameElement.className = "course-name";

        this.creditElement = document.createElement("div");
        this.creditElement.className = "course-credits";

        this.yearElement = document.createElement("div");
        this.yearElement.className = "course-year";

        this.semesterElement = document.createElement("div");
        this.semesterElement.className = "course-semester";

        this.categoryElement = document.createElement("div");
        this.categoryElement.className = "course-category";

        this.statusElement = document.createElement("div");
        this.statusElement.className = "course-status";

        this.root.appendChild(this.codeElement);
        this.root.appendChild(this.nameElement);
        this.root.appendChild(this.creditElement);
        this.root.appendChild(this.yearElement);
        this.root.appendChild(this.semesterElement);
        this.root.appendChild(this.categoryElement);
        this.root.appendChild(this.statusElement);

        this.root.addEventListener("click", () => {this.nextStatus();});

        this.update();
    }

    createElement(){

        return this.root;
    }

    update(){

        this.codeElement.textContent = this.code;
        this.nameElement.textContent = this.name;
        this.creditElement.textContent = this.credits;
        this.yearElement.textContent = this.year;
        this.semesterElement.textContent = this.semester;
        this.categoryElement.textContent = this.category;
        this.statusElement.textContent = this.status;

        this.root.classList.remove("status-none", "status-planned", "status-done");
        this.root.classList.add(`status-${this.status}`);

        this.root.dataset.status = this.status;
    }

    setStatus(status){

        this.status = status;

        this.update();

        if(this.onStatusChanged) this.onStatusChanged(this);
    }

    nextStatus(){

        switch(this.status){

            case "none":
                this.setStatus("planned");
                break;

            case "planned":
                this.setStatus("done");
                break;

            case "done":
                this.setStatus("none");
                break;
        }
    }
}