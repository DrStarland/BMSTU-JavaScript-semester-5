"use strict"; // строгий режим программирования, запрет на неявное появление переменных

class Child {
    constructor(surname = "Стандартсон", age = null) {
        this.surname = surname;
        this.age = age;
    }
};

class Children {
    constructor() {
        this.arr = [];
    }

    isUnique(surname) {
        for (let i in this.arr) {
            if (surname === this.arr[i].surname)
                return false;
        }
        return true;
    }

    create(s_name, age) {
        if (age < 0 || age > 25) {
            console.log("Недопустимый возраст.")
            return false;
        }

        if (!this.isUnique(s_name)) {
            console.log("Такая фамилия уже есть в списке.");
            return false;
        }
        this.arr.push(new Child(s_name, age));
        return true;
    }
    read(surname) {
        for (let i in this.arr)
            if (this.arr[i].surname === surname) {
                console.log(this.arr[i]);
                return true;
            }
        console.log("Ребёнок с такой фамилией не найден.");
        return false;
    }
    update(surname, age) {
        if (age < 0 || age > 25) {
            console.log("Недопустимый возраст.")
        }

        for (let i in this.arr)
            if (this.arr[i].surname === surname) {
                this.arr[i].age = age;
                return true;
            }
        console.log("Ребёнок с такой фамилией не найден.");
        return false;
    }
    delete(surname) {
        for (let i in this.arr)
            if (surname === this.arr[i].surname) {
                this.arr.splice(i, 1);
                break;
            }
        return true;
    }

    averageAge() {
        let age = 0.0;
        for (let i in this.arr)
            age += this.arr[i].age;
        age /= this.arr.length;
        console.log("Средний возраст: " + age.toFixed(2));
        return age;
    }

    getByOldestAge() {
        let result = -1;
        for (let i = 0; i < this.arr.length; ++i)
            if (result < this.arr[i].age)
                result = this.arr[i].age;
        if (result > 0)
            console.log("Возраст самого старшего ребёнка: " + result + ".");
        else
            console.log("Список пуст.");
        return result;
    }

    getAgeRange(a, b) {
        let temp_arr = [];
        for (let i in this.arr) {
            if (a <= this.arr[i].age && this.arr[i].age <= b)
                temp_arr.push(this.arr[i]);
        }
        console.log("Список детей с возрастом между " + a + " и " + b + ":");
        console.log(temp_arr);
        console.log("");
        return temp_arr;
    }

    getByLetter(letter) {
        let temp_arr = [];
        for (let i in this.arr) {
            if (this.arr[i].surname[0].toLowerCase() === letter.toLowerCase())
                temp_arr.push(this.arr[i]);
        }
        console.log("Список детей с фамилиями, начинающимися с буквы " + letter + ":");
        console.log(temp_arr);
        console.log("");
        return temp_arr;
    }

    getByNameLength(len) {        
        let temp_arr = [];
        for (let i in this.arr) {
            if (this.arr[i].surname.length > len)
                temp_arr.push(this.arr[i]);
        }
        console.log("Список детей с фамилиями длиннее " + len + " символов:");
        console.log(temp_arr);
        console.log("");
        return temp_arr;
    }
    getByVowel() {
        let temp_arr = [];
        for (let i in this.arr) {
            if ("аеуоэяиюaieouy".includes(this.arr[i].surname[0].toLowerCase()))
                temp_arr.push(this.arr[i]);
        }
        console.log("По гласным:");
        console.log(temp_arr);
        console.log("");
        return temp_arr;
    }
};

let Database = new Children;
console.log("\nСоздание детей:");
Database.create("Романов", 7);
Database.create("Инофамильцев", 10);
Database.create("Тестовая", 4);
Database.create("Александров", 13);
Database.create("Ермакова", 15);
Database.create("Ельцин", 8);
Database.create("Борисов", 19);

console.log("\nСоздание повторяющегося и ошибочного детей:");
Database.create("Тестовая", 20);
Database.create("Нормальнов", -99);

console.log("\nЧтение, удаление, повторное чтение Романова:");
Database.read("Романов");
Database.delete("Романов");
Database.read("Романов");
console.log("\nОбновление Тестовой:");
Database.update("Тестовая", 6);
console.log("\nОстальные функции:");
Database.averageAge();
Database.getByOldestAge();
Database.getAgeRange(9, 18);
Database.getByLetter("Е");
Database.getByNameLength(7);
Database.getByVowel();

console.log("\nВсё хранилище:");
console.log(Database.arr);


// console.log(Database.arr);






