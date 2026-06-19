

class Accordion{

    constructor(title, totalCredits){

        this.title = title;
        this.totalCredits = totalCredits;

        // データ
        this.courses = [];

        // UI
        this.progressBar = new ProgressBar(totalCredits, 0, 0);

        this.root = document.createElement("div");
        this.root.className = "accordion";


        this.header = document.createElement("div");
        this.header.className = "accordion-header";

        this.content = document.createElement("div");
        this.content.className = "accordion-content";
        
        this.isOpen = false;
        this.content.classList.add("collapsed");

        this.buildHeader();

        this.header.addEventListener("click", () => {this.toggle();});

        this.root.appendChild(this.header);

        this.root.appendChild(this.content);
    }

    buildHeader(){

        this.header.innerHTML = "";

        this.titleElement = document.createElement("div");

        this.titleElement.className = "accordion-title";

        this.titleElement.textContent = `＋ ${this.title}`;

        this.header.appendChild(this.titleElement);

        this.header.appendChild(this.progressBar.createElement());
    }


    createElement(){
        return this.root;
    }

    toggle(){

        this.isOpen = !this.isOpen;

        if(this.isOpen){

            this.content.classList.remove("collapsed");
            this.titleElement.textContent =`－ ${this.title}`;
        }
        else{

            this.content.classList.add("collapsed");
            this.titleElement.textContent =`＋ ${this.title}`;
        }
    }

    add(course){

        this.courses.push(course);

        course.onStatusChanged = () => {this.updateProgress();};

        this.content.appendChild(course.createElement());

        this.updateProgress();
    }

    updateProgress(){

        let done = 0;
        let planned = 0;

        for(const course of this.courses){

            if(course.status === "done") done += course.credits;

            else if(course.status === "planned")planned += course.credits;
        }

        this.progressBar.setValues(this.totalCredits, done, planned);
    }

    clear(){

        this.courses = [];
        this.content.innerHTML = "";
        this.updateProgress();
    }
}