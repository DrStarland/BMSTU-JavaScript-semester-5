"use strict";

const express = require("express");
const request = require("request");
const      fs = require("fs");

const app = express();
const port = 5015;
app.listen(port);
console.log(`Server on port ${port}`);

const way = __dirname + "/static";
app.use(express.static(way));

app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

function sendPost(url, body, callback) {
    // задаём заголовки
    const headers = {};
    headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
    headers["Connection"] = "close";
    // отправляем запрос
    request.post({
        url: url,
        body: body,
        headers: headers,
    }, function (error, response, body) {
        if (error) {
            callback(null);
        } else {
            callback(body);
        }
    });
}

function sendGet(url, callback) {
    const headers = {};
    headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
    headers["Connection"] = "close";
    request.get({
        url: url,
        headers: headers,
    }, function (error, response, body) {
        if(error) {
            callback(null);
            console.log(error);
        } else {
            callback(body);
        }
    });
}

app.get("/insert/record", function(request, response) {
    const type = request.query.type;
    const name = request.query.name;
    if (type === `car`) {
        const cost = request.query.cost;
        sendPost("http://localhost:4015/insert/record", JSON.stringify({
            name: name,
            cost: cost
        }), function(answerString) {
            if (!answerString)
                return response.end(JSON.stringify({result: "неизвестная ошибка"}));

            const answerObject = JSON.parse(answerString);
            const answer = answerObject.answer;
            return response.end(JSON.stringify({result: answer}));
        });
    }
    else if (type === `warehouse`) {
        const cars = request.query.cars;
        sendPost("http://localhost:3015/insert/record", JSON.stringify({
            name: name,
            cars: cars
        }), function(answerString) {
            if (!answerString)
                return response.end(JSON.stringify({result: "неизвестная ошибка"}));

            const answerObject = JSON.parse(answerString);
            const answer = answerObject.answer;
            return response.end(JSON.stringify({result: answer}));
        });
    }
    else
        return response.end(JSON.stringify({ result: "какая-то неизвестная ошибка" }));
});

app.get("/select/record", function(request, response) {
    const type = request.query.type;
    const name = request.query.name;

    let port;
    if (type === `car`) port = 4015;
    else if (type === `warehouse`) port = 3015;
    else return response.end(JSON.stringify({ result: "и неизвестная ошибка" }));

    sendGet(`http://localhost:${port}/select/record?name=${name}`, function(answerString) {
        if (!answerString)
            return response.end(JSON.stringify({result: "нет, неизвестная ошибка"}));

        const answerObject = JSON.parse(answerString);
        const answer = answerObject.answer;
        return response.end(JSON.stringify({result: answer}));
    });
});