"use strict"; // строгий режим программирования

const express = require("express");
const cookieSession = require("cookie-session");
// Общее создание и подготовка сервера
const app = express();
const port = 5015;
app.listen(port);
console.log(`Server on port ${port}`);

// активируем шаблонизатор
app.set("view engine", "hbs");

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// Задание 1
// Создать сервер. В оперативной памяти на стороне сервера создать массив, в котором хранится
// информация о компьютерных играх (название игры, описание игры, возрастные ограничения).
// Создать страницу с помощью шаблонизатора. В url передаётся параметр возраст (целое число).
// Необходимо отображать на этой странице только те игры, у которых возрастное ограничение меньше, чем переданное в url значение.

class Game {
    constructor(name, description, age) {
        this.name = name;
        this.description = description;
        this.age = age;
    }
};

const storage = [   new Game("Warframe", "Космический шутер с элементами слэшера", 16),
                    new Game("Warface", "Военный шутер с элементами доната", 16),
                    new Game("Rune:Halls of Valhalla", "Слэшер про викингов", 16),
                    new Game("Full Tilt! Pinball", "Пинбол с 3 картами", 6),
                    new Game("Rogue Legacy", "Рогалик про рыцарей", 6),
                    new Game("Oni", "Аниме-шутер с элементами боевых искусств", 18),
                    new Game("Minecraft", "Песочница, где можно строить дома", 0),
                    new Game("Darkest Dungeon", "Ролевой рогалик", 12),
                    new Game("Little Big Planet", "Платформер про тряпичных человечков", 6),
                    new Game("Fall Guys", "Игра про падающих бобов", 0),
                    new Game("Terraria", "Двумерный клон майнкрафта", 0),
                    new Game("Kerbal Space Program", "Игра про строительство ракет", 12),
                    new Game("Max Payne", "Шутер про копа, который мстит за свою мёртвую семью", 18),
                    new Game("Ace of Spades", "Воксельный шутер", 12)
];

///page/games?age=20
app.get("/page/games", function(request, response) {
    const age_rating = request.query.age;
    const age = parseInt(age_rating);
    if (!age || age < 0)
        response.end("Incorrect age.");

    const temp_array = [];
    storage.forEach(element => { 
        if (element.age < age)
            temp_array.push(element);
    });
    const infoObject = {
        descriptionValue: "Игры с возрастным рейтингом " + age,
        gameArray: temp_array
    };
    return response.render("pageGames.hbs", infoObject);
});

// Задание 2
// Создать сервер. В оперативной памяти на стороне сервера создать массив, в котором хранится информация о
// пользователях (логин, пароль, хобби, возраст). На основе cookie реализовать авторизацию пользователей.
// Реализовать возможность для авторизованного пользователя просматривать информацию о себе.

app.use(cookieSession({
    name: 'session',
    keys: ['hhh', 'qqq', 'vvv'],
    maxAge: 24 * 60 * 60 * 1000 * 365
}));

class User {
    constructor(login, password, hobby, age) {
        this.login = login;
        this.password = password;
        this.hobby = hobby;
        this.age = age;
    }
};

const database = [  new User("Spiegel", "Julia385", "jitkundo", 27),
                    new User("Jet", "BlackWolf", "bonsai", 36),
                    new User("Faye", "past2020", "casino", 23),
                    new User("Ein", "Astar519", "games", 12),
                    new User ("Ed", "Bibop563", "hacking", 15),
                    new User("Vishes", "SyndiKill", "fencing", 27)  ];

function inSystem(log, pass) {
    for (let i = 0; i < database.length; ++i)
        if (database[i].login === log && database[i].password === pass)
            return true;
    return false;
}

app.get("/api/login", function(request, response) {
    const login = request.query.login;
    const password = request.query.password;

    if (!login) return response.end("login not set.");
    if (!password) return response.end("Password not set.");
    if (!inSystem(login, password))
        return response.end("Unregistered user or incorrect login/password.");

    // выставляем cookie
    request.session.login = login;
    request.session.password = password;
    // отправляем ответ об успехе операции
    response.end("You successfully sign in.");
});

function getInfo(log) {
    for (let i = 0; i < database.length; ++i)
        if (database[i].login === log)
            return database[i];
    return false;
}

app.get("/api/show-info", function(request, response) {
    if (!request.session.login) return response.end("You are not authorised.");
    //if (!request.session.password) return response.end("You are not authorised.");

    const login = request.session.login;
    //const password = request.session.password;
    const temp = getInfo(login);
    if (!temp)
        return response.end("I dont know how you have login, but go away from here.");
    else {
        const answer = "Good day, " + temp.login + "! Information about you:\n" + JSON.stringify(temp, null, 4);
        response.end(answer);
    }
});

// удалить все cookie
app.get("/api/logout", function(request, response) {
    request.session = null;
    response.end("You successfully sign out.");
});