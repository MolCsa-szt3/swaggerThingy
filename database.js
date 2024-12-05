import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./database.sqlite");

const initializeDB = async () => {
    await dbRun("DROP TABLE users") //for testing
    await dbRun("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, email TEXT, class TEXT)");

    const users = [
        {firstName: "John", lastName: "Doe", email: "john.doe@example.com", class:"10.a"},
        {firstName: "Deez", lastName: "Nuts", email: "deeznuts@gottem.cum", class:"11.a"},
        {firstName: "AE", lastName: "IOU", email: "aeiou.space.com", class:"11.b"},
        {firstName: "John", lastName: "Prodman", email: "johnprodman@corpus.com", class:"10.b"},
    ]

    for (const user of users) {
        await dbRun("INSERT INTO users (firstName, lastName, email, class) VALUES (?, ?, ?, ?)", [user.firstName, user.lastName, user.email, user.class]);
    }
};


function dbQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

function dbRun(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
}

export { db, dbQuery, dbRun, initializeDB };