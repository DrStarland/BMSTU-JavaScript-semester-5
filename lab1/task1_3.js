// Создать хранилище в оперативной памяти для хранения точек.
// Неоходимо хранить информацию о точке: имя точки, позиция X и позиция Y.
// Необходимо обеспечить уникальность имен точек.
// Реализовать функции:
// CREATE READ UPDATE DELETE для точек в хранилище
// Получение двух точек, между которыми наибольшее расстояние
// Получение точек, находящихся от заданной точки на расстоянии, не превышающем заданную константу
// Получение точек, находящихся выше / ниже / правее / левее заданной оси координат
// Получение точек, входящих внутрь заданной прямоугольной зоны

"use strict"; // строгий режим программирования

class Point {
    constructor(name = "", x = undefined, y = undefined) {
        this.name = name;
        this.x = x;
        this.y = y;
    }

    print(flag = 1) {
        if (flag)
            console.log(this.name + "(" + this.x + ", " + this.y + ")");
        return this.name + "(" + this.x + ", " + this.y + ")";
    }
};

class Points {
    constructor() {
        this.arr = [];
    }

    isUnique(name) {
        for (let i in this.arr) {
            if (name === this.arr[i].name)
                return false;
        }
        return true;
    }

    create(name, x, y) {
        if (this.isUnique(name)) {
            this.arr.push(new Point(name, x, y));
            return true;
        } else {
            console.log("Точка " + name + " уже есть в списке.");
            return false;
        }
    }
    read(name, flag = true) {
        for (let i in this.arr)
            if (this.arr[i].name === name) {
                if (flag)
                    this.arr[i].print();
                return this.arr[i];
            }
        console.log("Точка " + name + " не найдена.");
        return false;
    }
    update(name, x, y) {
        for (let i in this.arr)
            if (this.arr[i].name === name) {
                this.arr[i].x = x;
                this.arr[i].y = y;
                return true;
            }
        console.log("Точка " + name + " не найдена.");
        return false;
    }
    delete(name) {
        for (let i in this.arr)
            if (this.arr[i].name === name) {
                this.arr.splice(i, 1);
                break;
            }
        return true;
    }

    getMaxDistance() {
        let pos1 = -1, pos2 = -1;
        let result = -1;

        for (let i = 0; i < this.arr.length; ++i)
            for (let j = i + 1; j < this.arr.length; ++j) {
                let temp = Math.sqrt((this.arr[i].x - this.arr[j].x)**2 + (this.arr[i].y - this.arr[j].y)**2);
                if (result < temp) {
                    result = temp;
                    pos1 = i;
                    pos2 = j;
                }
            }

        if (pos1 > -1)
            console.log("Наибольшее расстояние - " + result.toFixed(2) + " - между точками " + this.arr[pos1].name + " и " + this.arr[pos2].name + ".");
        else
            console.log("Список содержит менее двух точек.");
        return result;
    }

    getByDistance(name, dist) {
        let temp_arr = [];

        for (let i = 0, p = this.read(name, false); i < this.arr.length; ++i) {
            if (Math.sqrt((this.arr[i].x - p.x)**2 + (this.arr[i].y - p.y)**2) <= dist)
                if (this.arr[i].name != p.name)
                    temp_arr.push(this.arr[i]);
        }

        if (temp_arr.length == 0)
            console.log("В указанном радиусе точки " + name + " нет других точек.");
        else {
            console.log("В указанном радиусе находятся точки:");
            for (let i in temp_arr)
                temp_arr[i].print();
        }

        return temp_arr;
    }

    getByAxis(half) {
        // xu xd yr yl
        let sign = undefined;
        let flag = undefined;
        if (half[0] === "x") {
            flag = true;
            if (half[1] == "u")
                sign = 1;
            else if (half[1] == "d")
                sign = -1;
        }
        else if (half[0] === "y") {
            flag = false;
            if (half[1] == "r")
                sign = 1;
            else if (half[1] == "l")
                sign = -1;
        }
        if (sign === undefined || flag === undefined) {
            console.log("Неправильный запрос точек.");
            return false;
        }

        let temp_arr = [];

        for (let i = 0; i < this.arr.length; ++i) {
            if (flag) {
                if (0 < sign * this.arr[i].y)
                    temp_arr.push(this.arr[i]);
            }
            else if (0 < sign * this.arr[i].x)
                temp_arr.push(this.arr[i]);
        }

        if (temp_arr.length == 0)
            console.log("В запрошенной области нет точек.");
        else {
            console.log("В указанной области находятся точки:");
            for (let i in temp_arr)
                temp_arr[i].print();
        }

        return temp_arr;
    }

    getByRectangle(x1, y1, x2, y2) {
        let temp_arr = [];

        if (x1 > x2)
            x2, x1 = x1, x2;
        if (y2 < y1)
            y2, y1 = y1, y2;

        for (let i = 0; i < this.arr.length; ++i) {
            if (x1 <= this.arr[i].x && this.arr[i].x <= x2 && y1 < this.arr[i].y && this.arr[i].y < y2)
                temp_arr.push(this.arr[i]);
        }

        if (temp_arr.length == 0)
            console.log("В запрошенной прямоугольной области нет точек.");
        else {
            console.log("В указанной прямоугольной области находятся точки:");
            for (let i in temp_arr)
                temp_arr[i].print();
        }
        return temp_arr;
    }
};

let Database = new Points;

console.log("\nСоздание точек:");
Database.create("Test", 0, 0);
Database.create("TestAnother", 5, 5);

console.log("");
Database.read("Test");
console.log("");
Database.getMaxDistance();
console.log("");
Database.getByDistance("Test", 5);
console.log("");
Database.getByAxis("xu");
console.log("");
Database.getByAxis("yl");
console.log("");
Database.getByAxis("yr");
console.log("");
Database.getByRectangle(3, 3, 9, 9);
console.log("");

// console.log("\nСоздание студентов:");
// Database.create(100500, "ИУ7-55", [5, 4, 3, 5, 5, 5]);
// Database.create(100000, "ИУ7-55", [3, 4, 3, 5, 4, 4]);
// Database.create(777777, "ИУ7-55", []);
// Database.create(666, "ИУ7-55", [5, 4, 5, 5, 5]);

// Database.create(7887, "ИУ7-51", []);
// Database.create(78587, "ИУ7-51", [5, 5, 5, 3, 3]);
// Database.create(333, "ИУ7-51", [5, 5, 5, 3, 3]);

// console.log("\nСоздание повторяющегося и ошибочного студента:");
// Database.create(-100000, "ИУ7-55", [3, 4, 3, 5, 4, 4]);
// Database.create(777777, "ИУ7-55", [5, 5]);

// Database.delete(78587);
// Database.delete(7);

// console.log("");
// Database.read(333);
// console.log("Обновим этого студента:");
// Database.update(333, "ИУ7-53", [3, 2, 3, 4]);
// Database.read(333);
// console.log("");

// Database.read(100500);
// console.log("");
// Database.read(100);
// console.log("");
// Database.getAverageRating(100500);
// console.log("");
// Database.getByGroup("ИУ7-55");
// console.log("");
// Database.getByGroup("ИУ7-52");
// console.log("");
// Database.getByMaxMarks("ИУ7-51");
// console.log("");
// Database.getByMaxMarks("ИУ7-55");
// console.log("");
// Database.getZeroMarks();
// console.log("");

// console.log("\nВсё хранилище:");
// console.log(Database.arr);






