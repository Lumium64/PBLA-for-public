
// async function get_all_courses() {
//     const response = await fetch("http://localhost:3000/debug/get_all");

//     const courses = await response.json();

//     const container = document.getElementById("all_courses_list");

//     for(const data of courses){

//         const course = new Course(
//             data.code,
//             data.name,
//             data.credits,
//             data.semester,
//             data.category
//         )

//         container.appendChild(course.createElement());
//     }
// }

// async function draw_progress_bar(){
//     const progress_bar_list = document.getElementById("progress_bar_list");
    
//     const  progress = new ProgressBar(100, 20, 20);
    
//     progress_bar_list.appendChild(progress.createElement());
// }

// async function draw_accordion(){
//     const accordion = new Accordion("全コース一覧");

//     const accordionElement = accordion.createElement();

//     document.getElementById("accordion_list").appendChild(accordionElement);

//     const response = await fetch("http://localhost:3000/debug/get_all");

//     const courses = await response.json();

//     for (const data of courses) {

//     const course =
//         new Course(
//             data.code,
//             data.name,
//             data.credits,
//             data.semester,
//             data.category
//         );

//     accordion.add(
//         course.createElement()
//     );
// }
// }


// get_all_courses();

// draw_progress_bar();

// draw_accordion();