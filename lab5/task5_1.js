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


// Задание 1
// Создать сервер. Сервер должен выдавать страницу с тремя текстовыми полями и кнопкой.
// В поля ввода вбивается информация о почте, фамилии и номере телефона человека.
// При нажатии на кнопку "Отправить" введённая информация должна отправляться с помощью POST запроса на сервер
// и добавляться к концу файла (в файле накапливается информация).
// При этом на стороне сервера должна происходить проверка: являются ли почта и телефон уникальными.
// Если они уникальны, то идёт добавление информации в файл. В противном случае добавление не происходит.
// При отправке ответа с сервера клиенту должно приходить сообщение с информацией о результате добавления (добавилось или не добавилось).
// Результат операции должен отображаться на странице.

function loadBody(request, callback) {
    let body = [];
    request.on(`data`, (chunk) => {
        body.push(chunk);
    }).on(`end`, () => {
        body = Buffer.concat(body).toString();
        callback(body);
    });
}

function isUnique(database, mail, phone) {
    for (let i = 0; i < database.length; ++i) {
        if (database[i].mail == mail || database[i].phone == phone) {
            console.log(" " + database[i].mail + " " + database[i].phone + " " + mail + " " + phone);
            return false;
        }
    }
    return true;
}

app.post("/save/info", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        const surname = obj.surname;
        const mail = obj.mail;
        const phone = obj.phone;

        const storage = JSON.parse(fs.readFileSync("file.txt", "utf-8"));

        if (isUnique(storage, mail, phone)) {
            const curObject = {"surname": surname, "mail": mail, "phone": phone};
            storage.push(curObject);
            fs.writeFileSync("file.txt", JSON.stringify(storage, null, 4));
            response.end(JSON.stringify({result: "запись успешно добавлена"}));
        } else {
            response.end(JSON.stringify({result: "такие почта и/или номер уже есть в списке"}));
        }
    });
});

// Задание 2
// Добавить серверу возможность отправлять клиенту ещё одну страницу. На данной странице должно быть поле ввода и кнопка.
// В поле ввода вводится почта человека. При нажатии на кнопку "Отправить" на сервер отправляется GET запрос.
// Сервер в ответ на GET запрос должен отправить информацию о человеке с данной почтой в формате JSON или сообщение об отсутствии человека с данной почтой.

app.get("/base/read", function(request, response) {
    const mail = request.query.mail;
    const storage = JSON.parse(fs.readFileSync("file.txt", "utf-8"));
    let result = `данная почта не зарегистрирована`;
    for (let i = 0; i < storage.length; ++i)
        if (storage[i].mail === mail) {
            result = `фамилия - ` + storage[i].surname + `, телефон - ` + storage[i].phone;
            break;
        }
    response.end(JSON.stringify({
        result: result
    }));
});

// Задание 3
// Оформить внешний вид созданных страниц с помощью CSS.
// Информация со стилями CSS для каждой страницы должна храниться в отдельном файле. Стили CSS должны быть подключены к страницам.

