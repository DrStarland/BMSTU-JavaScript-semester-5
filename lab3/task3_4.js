"use strict"; // строгий режим программирования

const fs = require("fs");

// // задание 4
// Дана вложенная структура файлов и папок. Все файлы имеют раширение "txt".
// Необходимо рекурсивно перебрать вложенную структуру и вывести имена файлов, у которых содержимое не превышает по длине 10 символов.
console.log("");
let extension = "txt";
function checkFolderStructure(folder) {
    fs.readdir(folder, (err, arr) => {
        for (let i = 0; i < arr.length; i++) {
            if ( (arr[i].length > extension.length) &&
                (~arr[i].indexOf(extension, arr[i].length - 1 - extension.length)) ) {
                if (fs.readFileSync(folder + "/" + arr[i], "utf8").length < 11)
                    console.log("Name of file with path: " + folder + "/" + arr[i]);
            }
            else {
                // если аrr[i] является файлом, то получается ошибка... грубо, но работает, иначе не отличить папку от файла
                checkFolderStructure(folder + "/" + arr[i]);
            }
        }
    });
    return;
}

let folder = "./test_folder";
checkFolderStructure(folder);
console.log("");