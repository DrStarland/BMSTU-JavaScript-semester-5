// Создать класс Точка.
// Добавить классу точка Точка метод инициализации полей и метод вывода полей на экран
// Создать класс Отрезок.
// У класса Отрезок должны быть поля, являющиеся экземплярами класса Точка.
// Добавить классу Отрезок метод инициализации полей, метод вывода информации о полях на экран, а так же метод получения длины отрезка.

"use strict"; // строгий режим программирования

class Point {
    constructor(name = "", x = undefined, y = undefined) {
        this.name = name;
        this.x = x;
        this.y = y;
    }

    print(flag = true) {
        if (flag)
            console.log("Точка " + this.name + "(" + this.x + ", " + this.y + ")");
        return this.name + "(" + this.x + ", " + this.y + ")";
    }
};

class Segment {
    constructor(name, A, B) {
        this.name = name;
        this.start = A;
        this.end = B;
    }

    print(flag = true) {
        if (flag)
            console.log("Отрезок " + this.name + "(" + this.start.print(false) + ", " + this.end.print(false) + ")");
        return this.name + "(" + this.start.print(false) + ", " + this.end.print(false) + ")";
    }

    length() {
        return Math.sqrt((this.end.x - this.start.x)**2 + (this.end.y - this.start.y)**2);
    }
};

console.log("\nСоздание точек");
let p1 = new Point("Test", 0, 0);
let p2 = new Point("TestAnother", 5, 5);
console.log("\nСоздание отрезка");
let seg = new Segment("Way", p1, p2);
console.log("");

p1.print();
p2.print();
console.log("");
seg.print();
console.log("\nДлина отрезка: " + seg.length().toFixed(3) + ".");


