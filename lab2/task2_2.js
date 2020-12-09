// Создать класс Треугольник.
// Класс Треугольник должен иметь поля, хранящие длины сторон треугольника.
// Реализовать следующие методы:
// Метод инициализации полей
// Метод проверки возможности существования треугольника с такими сторонами
// Метод получения периметра треугольника
// Метод получения площади треугольника
// Метод для проверки факта: является ли треугольник прямоугольным

"use strict"; // строгий режим программирования

class Triangle {
    constructor(a = undefined, b = undefined, c = undefined) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    isReal(flag = true) {
        if (this.a + this.b > this.c && this.a + this.c > this.b && this.b + this.c > this.a) {
            if (flag)
                console.log("Треугольник существует.");
            return true;
        }
        console.log("Треугольник вырожден.");
        return false;
    }

    perimeter(flag = true) {
        if (!this.isReal(false))
            return false;

        let P = this.a + this.b + this.c
        if (flag)
            console.log("Периметр треугольника равен " + P.toFixed(3));
        return P;
    }

    area() {
        if (!this.isReal(false))
            return false;

        let p = this.perimeter(false) / 2;
        let S = Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c));
        console.log("Площадь треугольника равна " + S.toFixed(3));
        return S;
    }

    isRightTriangle() {
        if (!this.isReal(false))
            return false;

        let a = this.a**2, b = this.b**2, c = this.c**2;
        let cosA = (b + c - a) / (2 * this.b * this.c);
        let cosB = (a + c - b) / (2 * this.a * this.c);
        let cosC = (a + b - c) / (2 * this.b * this.a);
        if ((cosA == 0) || (cosB == 0) || (cosC == 0)) {
            console.log("Треугольник является прямоугольным.");
            return true;
        }
        return false;
    }
};

let tg = new Triangle(3, 4, 5);
console.log("");
tg.isReal();
tg.isRightTriangle();
tg.perimeter();
tg.area();
console.log("");
let tg2 = new Triangle(3, 3, 12);
tg2.area();



