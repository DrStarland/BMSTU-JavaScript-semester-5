"use strict"; // строгий режим программирования

const fs = require("fs");
const readlineSync = require("readline-sync");

// Задание 3
// Написать программу, которая на вход получает массив названий полей и адрес запроса (куда отправлять).
// Программа должна генерировать HTML разметку страницы, в которую встроена форма для отправки запроса.

console.log("Вводите массив названий полей (через запятую):")

const arrayFields = (readlineSync.question("Input array of fields (comma separated): ")).split(",");
const adress = readlineSync.question("Input adress: ");

for (let i in arrayFields) {
    arrayFields[i] = `\t\t<p>Введите ` + arrayFields[i] + `</p>
    \t<input name="` + arrayFields[i] + `" spellcheck="false" autocomplete="off">`;
}

const contentString = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>...</title>
</head>
<body>  
    <h1>Страница A</h1>
    <form method="GET" action="` + adress + `">` + `\n` + arrayFields.join("\n") + 
        `<br>
        <br>
        <input type="submit" value="Отправить запрос">
    </form>
</body>
</html>`;

fs.writeFileSync("aaa.html", contentString);