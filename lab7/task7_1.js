"use strict";

const express = require("express");
const fs = require("fs");

const app = express();
const port = 4015;
app.listen(port);
console.log(`Server on port ${port}`);

app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

function loadBody(request, callback) {
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        callback(body);
    });
}

app.post("/insert/record", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        
        const db = JSON.parse(fs.readFileSync("car_storage.txt", "utf-8"));
        db.push(obj);
        fs.writeFileSync("car_storage.txt", JSON.stringify(db, null, 4));

        response.end(JSON.stringify({
            answer: "машина успешно добавлена"
        }));
    });
});

app.get("/select/record", function(request, response) {
    const name = request.query.name;
    const db = JSON.parse(fs.readFileSync("car_storage.txt", "utf-8"));
    let result = `данная машина не занесена в список`;
    for (let i = 0; i < db.length; ++i)
        if (db[i].name === name) {
            result = `машина - "` + db[i].name + `", стоимость - ` + db[i].cost;
            break;
        }
    response.end(JSON.stringify({
        answer: result
    }));
});