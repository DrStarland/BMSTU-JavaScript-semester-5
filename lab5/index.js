"use strict";

// импортируем библиотеку
const express = require("express");

// запускаем сервер
const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port} \n\n`);

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// выдать страницу
app.get("/page", function(request, response) {
    response.sendFile(__dirname + "/" + "page.html");
});

// глобальный объект
const globalObject = {
    "Максим_%_?_&_11": 100,
    "Нина_%_?_&_22": 200,
    "Георгий_%_?_&_33": 300,
    "Дмитрий_%_?_&_44": 400
};

// выдать запись
app.get("/record", function(request, response) {
    console.log(request.url);
    const key = request.query.k;
    const value = globalObject[key] || null;
    console.log(`Key: ${key}`);
    console.log(`Value: ${value}`);
    console.log("\n");
    response.end(JSON.stringify({
        k: key,
        v: value
    }));
});