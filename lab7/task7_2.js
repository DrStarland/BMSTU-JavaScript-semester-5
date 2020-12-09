"use strict";

const express = require("express");
const fs = require("fs");

const app = express();
const port = 3015;
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

const fileName = "warehouse_base.txt";

app.post("/insert/record", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        const name = obj.name;
        const array = obj.cars.split(", ");
        const db = JSON.parse(fs.readFileSync(fileName, "utf-8"));
        db.push({ name: name, cars: array });
        fs.writeFileSync(fileName, JSON.stringify(db, null, 4));

        response.end(JSON.stringify({
            answer: "склад успешно добавлен"
        }));
    });
});

app.get("/select/record", function(request, response) {
    const name = request.query.name;
    const db = JSON.parse(fs.readFileSync(fileName, "utf-8"));
    let result = `данный склад не занесён в список`;
    for (let i = 0; i < db.length; ++i)
        if (db[i].name === name) {
            result = `склад "` + db[i].name + `", список машин: ` + db[i].cars.join(", ");
            break;
        }
    response.end(JSON.stringify({
        answer: result
    }));
});