// Реализовать программу, в которой происходят следующие действия:
// Происходит вывод целых чисел от 1 до 10 с задержками в 2 секунды.
// После этого происходит вывод от 11 до 20 с задержками в 1 секунду.
// Потом опять происходит вывод чисел от 1 до 10 с задержками в 2 секунды.
// После этого происходит вывод от 11 до 20 с задержками в 1 секунду.
// Это должно происходить циклически.

"use strict"; // строгий режим программирования

let repeats = 2;
///////////////////////////////

let control = 1, count = 1;
control = 1;
count = 1;
console.log(" first " + count);
let low_interval = setInterval(() => {
    ++count;
    console.log(" first " + count);

    if (count >= 10) {
        clearInterval(low_interval);
    }
}, 2000);

setTimeout(() => {
    let low_interval = setInterval(() => {
        ++count;
        console.log(" second " + count);

        if (count >= 20) {
            clearInterval(low_interval);
        }
    }, 1000);
}, 18000);

let interval = setInterval(() => {
    console.log("small here");
    ++control;
    count = 0;

    ++count;
    console.log(" first " + count);
    let low_interval = setInterval(() => {
        ++count;
        console.log(" first " + count);

        if (count >= 10) {
            clearInterval(low_interval);
        }
    }, 2000);

    setTimeout(() => {
        let low_interval = setInterval(() => {
            ++count;
            console.log(" second " + count);
    
            if (count >= 20) {
                clearInterval(low_interval);
            }
        }, 1000);
    }, 18000);

    if (control == 2 * repeats || count > 20) {
        clearInterval(interval);
    }
}, 30000);