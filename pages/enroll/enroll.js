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

    const response = [
        {
            "code": "4010",
            "name": "プログラミングA",
            "credits": 3,
            "year": 1,
            "semester": "春夏",
            "category": "必修"
        },
        {
            "code": "4011",
            "name": "プログラミングB",
            "credits": 3,
            "year": 1,
            "semester": "秋冬",
            "category": "必修"
        },
        {
            "code": "4012",
            "name": "プログラミングC",
            "credits": 3,
            "year": 2,
            "semester": "春夏",
            "category": "必修"
        },
        {
            "code": "4120",
            "name": "情報数学基礎",
            "credits": 2,
            "year": 2,
            "semester": "春夏",
            "category": "必修"
        },
        {
            "code": "0011",
            "name": "数学A",
            "credits": 2,
            "year": 2,
            "semester": "春夏",
            "category": "B群"
        },
        {
            "code": "0012",
            "name": "数学B",
            "credits": 2,
            "year": 2,
            "semester": "春夏",
            "category": "B群"
        },
        {
            "code": "138145",
            "name": "基礎物理学実験",
            "credits": 1,
            "year": 2,
            "semester": "春",
            "category": "選択"
        }
        ];

    const courses = response;

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