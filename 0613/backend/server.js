const http = require("http");
const fs = require("fs");

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./courses.db");
db.run(`
    CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        credits INTEGER NOT NULL,
        year INTEGER NOT NULL,
        semester TEXT,
        category TEXT
    );
`);
const all_courses_data = [
    ["4010","プログラミングA",3,1,"春夏","必修"],
    ["4011","プログラミングB",3,1,"秋冬","必修"],
    ["4012","プログラミングC",3,2,"春夏","必修"],
    ["4120","情報数学基礎",2,2,"春夏","必修"],
    ["0011","数学A",2,2,"春夏","B群"],
    ["0012","数学B",2,2,"春夏","B群"],
    ["138145","基礎物理学実験",1,2,"春","選択"]
]
for(const course of all_courses_data){
    db.run(`INSERT OR IGNORE INTO courses (code, name, credits, year, semester, category) VALUES (?, ?, ?, ?, ?, ?)`, course);
}

const server = http.createServer((req, res) => {

    res.setHeader(
        "Access-Control-Allow-Origin",
        "http://localhost:5500"
    );

    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );

    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type"
    );

    if (req.method === "OPTIONS") {
        res.statusCode = 204;
        res.end();
        return;
    }

    const url = new URL(req.url, "http://localhost:3000");


    if(req.method === "GET" && url.pathname === "/debug/get_all"){
        db.all(
            `
            SELECT *
            FROM courses
            ORDER BY code
            `,
            [],
            (err, rows) => {
                if(err){
                    console.log(err);

                    res.statusCode = 500;
                    res.end("DB Error");

                    return;
                }
                res.setHeader(
                    "Content-Type",
                    "application/json"
                );
                res.end(
                    JSON.stringify(rows)
                );
            }
        );
    }

    else{
        console.log("404:",req.method,url.pathname);
        res.statusCode = 404;
        res.end("Not Found");
    }

});

server.listen(3000, () => {console.log("Server running on localhost:3000");});