"use strict"; // строгий режим программирования

const fs = require("fs");
const readline = require("readline-sync");
const express = require("express");
// Общее создание и подготовка сервера
const app = express();
const port = 5015;
app.listen(port);
console.log(`Server on port ${port}`);

const way = __dirname + "/static";
app.use(express.static(way));

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// получение суммы чисел
app.get("/sum", function(request, response) {
    const a = request.query.a;
    const b = request.query.b;
    const s = parseInt(a) + parseInt(b);
    response.end(JSON.stringify({
        result: s
    }));
});

// В этом коде идёт описание функции загрузки тела POST запроса
function loadBody(request, callback) {
    let body = [];
    request.on(`data`, (chunk) => {
        body.push(chunk);
    }).on(`end`, () => {
        body = Buffer.concat(body).toString();
        callback(body);
    });
}
// В этом коде происходит:
// приём POST запроса
// загрузка тела POST запроса
// извлечение полей из полученного тела POST запроса
// сохранение информации в файл
app.post("/save/info", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        const a = obj["a"];
        const b = obj["b"];
        const c = obj["c"];
        const contentString = `A: ${a} B: ${b} C: ${c}`;
        fs.writeFileSync("file.txt", contentString);
        response.end(JSON.stringify({result: "Save content ok"}));
    });
});

// const f1 = document.getElementById("field-first");
// const f2 = document.getElementById("field-second");

// button
//const btn = document.getElementById("sum-find-btn");

// app.post("/save/info", function(request, response) {
//     loadBody(request, function(body) {
//         const obj = JSON.parse(body);
//         const a = obj["a"];
//         const b = obj["b"];
//         const c = obj["c"];
//         const contentString = `A: ${a} B: ${b} C: ${c}`;
//         fs.writeFileSync("file.txt", contentString);
//         response.end(JSON.stringify({result: "Save content ok"}));
//     });
// });



// Задание 1
// Создать сервер. Сервер должен выдавать страницу с тремя текстовыми полями и кнопкой.
// В поля ввода вбивается информация о почте, фамилии и номере телефона человека.
// При нажатии на кнопку "Отправить" введённая информация должна отправляться с помощью POST запроса на сервер
// и добавляться к концу файла (в файле накапливается информация).
// При этом на стороне сервера должна происходить проверка: являются ли почта и телефон уникальными.
// Если они уникальны, то идёт добавление информации в файл. В противном случае добавление не происходит.
// При отправке ответа с сервера клиенту должно приходить сообщение с информацией о результате добавления (добавилось или не добавилось).
// Результат операции должен отображаться на странице.

// Задание 2
// Добавить серверу возможность отправлять клиенту ещё одну страницу. На данной странице должно быть поле ввода и кнопка.
// В поле ввода вводится почта человека. При нажатии на кнопку "Отправить" на сервер отправляется GET запрос.
// Сервер в ответ на GET запрос должен отправить информацию о человеке с данной почтой в формате JSON или сообщение об отсутствии человека с данной почтой.

// Задание 3
// Оформить внешний вид созданных страниц с помощью CSS.
// Информация со стилями CSS для каждой страницы должна храниться в отдельном файле. Стили CSS должны быть подключены к страницам.

