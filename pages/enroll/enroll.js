async function main(){

    const allCourses = await getAllCourses(); // 全コースデータ取得

    // カテゴリーと必要単位数
    const categories = [
        {
            name: "必修",
            credits: 80
        },
        {
            name: "A群",
            credits: 8
        },
        {
            name: "B群",
            credits: 8
        },
        {
            name: "C群",
            credits: 8
        },
        {
            name: "不明",
            credits: 10000
        }
    ];

    const grouped = await sortByCategories(allCourses, categories.map(category => category.name)); // カテゴリー別に分類

    await createCourseAccordion(grouped, categories); // アコーディオンを作って描画
}

async function getAllCourses(){

    const response = await fetch("http://localhost:3000/debug/get_all");

    const courses = await response.json();

    return courses;
}

async function getUserCourses(){
}

async function sortByCategories(allCourses, categories){

    const grouped = {};

    for(const category of categories) grouped[category] = [];

    for (const course of allCourses){

        if (grouped[course.category]) grouped[course.category].push(course);
        else grouped["不明"].push(course);
    }

    return grouped;
}

async function createCourseAccordion(grouped, categories){
    const root = document.getElementById("accordion-list");

    for (const categoryInfo of categories){

        const category = categoryInfo.name;
        const accordion = new Accordion(category, categoryInfo.credits);

        for(const courseData of grouped[category]){
            accordion.add(new Course(courseData.code, courseData.name, courseData.credits, courseData.year, courseData.semester, courseData.category, "none"));
        }

        root.appendChild(accordion.createElement());
    }
}

main();