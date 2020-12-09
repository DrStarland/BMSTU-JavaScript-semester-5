"use strict"; // строгий режим программирования

const fs = require("fs");
const readline = require("readline-sync");
const express = require("express");
// Общее создание и подготовка сервера
const app = express();
const port = 5015;
app.listen(port);
console.log("My server on port " + port);

{
    let jsonString = JSON.stringify([2812,2813,2814,2815,2816,2817,2818,2819,2820,2821], null, 4);
    fs.writeFileSync("data.txt", jsonString);
}

// Задание 1
// Запустить сервер. Реализовать на сервере функцию для сравнения трёх чисел и выдачи наибольшего из них.
// Реализовать страницу с формой ввода для отправки запроса на сервер.
// Задание 2
// Запустить сервер. На стороне сервера должен храниться файл, внутри которого находится JSON строка.
// В этой JSON строке хранится информация о массиве объектов. Реализовать на сервере функцию, которая
// принимает индекс и выдает содержимое ячейки массива по данному индексу.
// Реализовать страницу с формой ввода для отправки запроса на сервер.
// Задание 4
// Запустить сервер. Реализовать на сервере функцию, которая принимает на вход числа A, B и C.
// Функция должна выдавать массив целых чисел на отрезке от A до B, которые делятся на C нацело.


app.get("/calculate/line", function(request, responce) {
    const a = request.query.a;
    const b = request.query.b;
    const c = request.query.c;
    const A = parseInt(a, 10), B = parseInt(b, 10), C = parseInt(c, 10);
    if (A.toString() == "NaN" || B.toString() == "NaN" || C.toString() == "NaN")
        responce.end("There is NaN among us.");
    const result = [];
    if (Math.max(Math.abs(A), Math.abs(B)) >= C)
        for (let i = Math.min(A, B); i <= Math.max(A, B); ++i)
            if (i % C == 0)
                result.push(i);
    const contentString = JSON.stringify(result);
    responce.end(contentString);    
});

app.get("/compare/three_numbers", function(request, responce) {
    const a = request.query.a;
    const b = request.query.b;
    const c = request.query.c;
    const A = parseInt(a, 10), B = parseInt(b, 10), C = parseInt(c, 10);
    if (A.toString() == "NaN" || B.toString() == "NaN" || C.toString() == "NaN")
        responce.end("There is NaN among us.");
    const contentString = "The largest number: " + Math.max(a, b, c) + ".";
    responce.end(contentString);    
});

app.get("/get/fromData", function(request, responce) {
    const nameString = "data.txt";

    const index = request.query.ind;
    const ind = parseInt(index, 10);
    if (ind.toString() == "NaN")
        responce.end("There is NaN among us.");
    if (!fs.existsSync(nameString))
        responce.end("Is is impossible to handle this request: data file has been not found.");
    const array = JSON.parse(fs.readFileSync(nameString, "utf-8"));
    if (ind >= array.length)
        responce.end("Is is impossible to handle this request: the index is greater than number of elements in array.");
    const contentString = "Result: " + array[ind];
    responce.end(contentString);    
});

app.get("/calculate/sum", function(request, response) {
    const a = request.query.a;
    const b = request.query.b;
    const aInt = parseInt(a);
    const bInt = parseInt(b);
    const sInt = aInt + bInt;
    const answerJSON = JSON.stringify({result: sInt});
    response.end(answerJSON);
});



app.get("/me/page", function(request, response) {
    const nameString = request.query.p;
    if (fs.existsSync(nameString)) {
        const contentString = fs.readFileSync(nameString, "utf8");
        response.end(contentString);
    } else {
        const contentString = fs.readFileSync("bad.html", "utf8");
        response.end(contentString);
    }
});