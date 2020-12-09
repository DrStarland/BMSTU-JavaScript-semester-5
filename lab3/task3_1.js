"use strict"; // строгий режим программирования

const readlineSync = require('readline-sync');
const fs = require("fs");
//const { timeStamp } = require('console');
let nameString = "strings.txt";

//// задание 1
// С клавиатуры считывается число N. Далее считывается N строк.
// Необходимо создать массив и сохранять в него строки только с четной длиной.
// Получившийся массив необходимо преобразовать в строку JSON и сохранить в файл.
console.log("\nЭто задание 1.\n");
let N = 0; 

while (true) {
    N = readlineSync.question("Input N: ");
    if (parseInt(N, 10).toString() != "NaN")
        break;
    else console.log("It is not a number.")
}

if (N >= 0) {
    if (N != 0) {
        const arr = [];

        let string = "";
        for (let i = 0; i < N; ++i) {
            string = readlineSync.question("Input string (" + (N - i) +" left): ");
            if (string.length % 2 == 0)
                arr.push(string);
        }

        const jsonString = JSON.stringify(arr, null, 4);
        //console.log(jsonString);
        fs.writeFileSync(nameString, jsonString);
        console.log("File has been created.");
    }
} else console.log("The length can not be negative.")
console.log("\nЭто задание 1 закончилось.\n");
// // задание 2
// Необходимо считать содержимое файла, в котором хранится массив строк в формате JSON.
// Нужно вывести только те строки на экран, в которых содержатся только гласные буквы.
function checkStringIsVowel(str = "") {
    for (let i = 0; i < str.length; ++i)
        if (!("aieouyаеуоэяию".includes(str[i].toLowerCase())))
            return false;
    return true;
}

console.log("\nЭто задание 2.\n");
if (fs.existsSync(nameString)) {
    const arr = JSON.parse(fs.readFileSync(nameString, "utf8"));
    let flag = true;
    console.log("Содержимое файла (только строки из гласных): ")
    for (let i = 0; i < arr.length; ++i) {
        if (checkStringIsVowel(arr[i])) {
            if (flag) flag = false;
            console.log(arr[i]);
        }
    }
    if (flag)
        console.log("Подходящие строки не нашлись или среди них не оказалось подходящих.");
} else {
    console.log("File " + nameString + " was not found");
}
console.log("\nЭто задание 2 закончилось.\n");

// // задание 3
// С клавиатуры считывается строка - название расширения файлов. Далее считывается строка - адрес папки.
// Необходимо перебрать все файлы в папке и вывести содержимое файлов, у которых расширение совпадает с введенным расширением.
console.log("\nЭто задание 3.\n");

let extension = readlineSync.question("Input extension of files: ");
let adress = readlineSync.question("Input adress of folder: ");
console.log("Задание 3 работает асинхронно, результат выполнения будет выведен позднее.");

fs.readdir(adress, (err, arr) => {
    console.log("\nЭто задание 3 продолжается.");
    if (err != null)
        console.log("Некорректный адрес папки.");
    else if (arr.length != 0) {
        if (adress === "./")
            console.log("В текущей папке:")
        else
            console.log("В папке " + adress + ":")
        for (let i = 0; i < arr.length; i++) {
            if ( (arr[i].length > extension.length) &&
                (~arr[i].indexOf(extension, arr[i].length - 1 - extension.length)) ) {
                console.log(`Содержимое файла "` + arr[i] + `":`);
                console.log(`"` + fs.readFileSync(arr[i], "utf8") + `"`);
            }
        }
    }
    console.log("\nЭто задание 3 закончилось.\n");
});

// // задание 4
// Дана вложенная структура файлов и папок. Все файлы имеют раширение "txt".
// Необходимо рекурсивно перебрать вложенную структуру и вывести имена файлов, у которых содержимое не превышает по длине 10 символов.
// в другом файле

// // задание 5
// С клавиатуры считывается число N. Далее считывается N строк - имена текстовых файлов.
// Необходимо склеить всё содержимое введенных файлов в одну большую строку и сохранить в новый файл.
console.log("\nЭто задание 5.\n");
N = 0; 
while (true) {
    N = readlineSync.question("Input N: ");
    if (parseInt(N, 10).toString() != "NaN")
        break;
    else console.log("It is not a number.")
}

if (N >= 0) {
    if (N != 0) {
        const arr = [];
        let string = "";
        for (let i = 0; i < N; ++i) {
            string = readlineSync.question("Input names (" + (N - i) +" left): ");
            arr.push(string);
        }
        let buffer = [];

        for (let i = 0; i < arr.length; ++i) {
            if (fs.existsSync(arr[i])) {
                buffer.push(fs.readFileSync(arr[i], "utf8"))
            } else {
                console.log(`File "` + arr[i] + `" was not found`);
            }
        }
        //console.log(jsonString);
        let grandfileName = "bigstring_file.txt";
        fs.writeFileSync(grandfileName, buffer.join(""));
        console.log("File has been created.");
    }
} else console.log("The length can not be negative.")
console.log("\nЭто задание 5 закончилось.\n");

// // задание 6
// Написать код, который позволяет определить максимальный возможный уровень вложенности друг в друга полей в объекте,
// чтобы данный объект можно было преобразовать в строку формата JSON. Ответом является целое число.

console.log("\nЭто задание 6.\n");
let Obj = {}, cur_obj = Obj;
let level = 0;
while (true) {
    cur_obj.nested = {};
    try {
        JSON.stringify(Obj);
    } catch (e) {  break; }
    ++level, cur_obj = cur_obj.nested;
}
console.log("Максимальный уровень вложенности в данном случае: " + level + ".");
console.log("\nЭто задание 6 закончилось.\n");

// // задание 7
// Из файла считывается строка в формате JSON. В этой строке информация об объекте, в котором находится большое количество вложенных друг в друга полей.
// Объект представляет из себя дерево.
// Необходимо рекурсивно обработать дерево и найти максимальную вложенность в дереве.
// Необходимо вывести на экран ветку с максимальной вложенностью.

let swords = {};
let katana = {"type":{"type":"legal", "material":{"main":"duralumin", "additives":["steel", "chromium", "carbon", "cobalt"]},
                 "owner": {"name":"Victor", "age":20, "status":"nikto"}}, "cost": 5000};
let wakizashi = {"cost":{"sword":2000,"saya":500}};
let daito = {"name":"Monohoshi zao", "owner":{"name":{"name":"Sasaki Kojiro", "real":false}, "age":29, "status":"Ronin"}};
let tati = {"state":"bad", "cost":900};

swords.tati = tati;
swords.wakizashi = wakizashi;
swords.katana = katana;
swords.daito = daito;
fs.writeFileSync("object.txt", JSON.stringify(swords, null, 4));

console.log("\nЭто задание 7.\n");
function findNestingDepth(obj) {
    //"depth": undefined, "node":null
    if (obj == null)
        return {"depth": 0, "node": null};

    let maxDepth = 0, branch = {};
    for (let key in obj) {
        if (typeof obj[key] == `object`) {
            const tmp = findNestingDepth(obj[key]);
            if (maxDepth < tmp.depth)
                maxDepth = tmp.depth, branch = {[key]: tmp.node};
        }
        else if (maxDepth == 0)
            maxDepth = 0, branch = {[key]: obj[key]};
    }
    return {"depth": maxDepth + 1, "node": branch};
}

let temp = findNestingDepth(JSON.parse(fs.readFileSync("object.txt")));
console.log("Максимальная глубина, вложенность дерева объектов - " + temp.depth + " (" + (temp.depth + 1) +" - с нулевым уровнем)." + "\nСамая длинная ветка:");
console.log(JSON.stringify(temp.node, null, 4))

console.log("\nЭто задание 7 закончилось.\n");