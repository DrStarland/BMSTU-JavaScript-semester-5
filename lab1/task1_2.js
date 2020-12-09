// Создать хранилище в оперативной памяти для хранения информации о студентах.
// Необходимо хранить информацию о студенте: название группы, номер студенческого билета, оценки по программированию.
// Необходимо обеспечить уникальность номеров студенческих билетов.
// Реализовать функции:
// Получение средней оценки заданного студента
// Получение информации о студентах в заданной группе
// Получение студента, у которого наибольшее количество оценок в заданной группе
// Получение студента, у которого нет оценок


"use strict"; // строгий режим программирования, запрет на неявное появление переменных

class Student {
    constructor(number = undefined, group = "", marks = []) {
        this.group = group;
        this.number = number;
        this.marks = marks.slice();
    }

    print(flag = 1) {
        if (flag)
            console.log("Группа " + this.group + ", зачётка №" + this.number + ", оценки: " + this.marks.join (", ") + ".");
        return "Группа " + this.group + ", зачётка №" + this.number + ", оценки: " + this.marks.join (", ") + ".";
    }
};

class Students {
    constructor() {
        this.arr = [];
    }

    isUnique(number) {
        for (let i in this.arr) {
            if (number === this.arr[i].number)
                return false;
        }
        return true;
    }

    create(number, group, marks) {
        if (number < 1) {
            console.log("Номер зачётки не может быть отрицательным или нулевым.");
            return false;
        }

        if (!this.isUnique(number)) {
            console.log("Такой студент уже есть в списке.");
            return false;
        }
        this.arr.push(new Student(number, group, marks));
        return true;
    }
    read(number) {
        for (let i in this.arr)
            if (this.arr[i].number === number) {
                this.arr[i].print();
                return true;
            }
        console.log("Студент с зачёткой с таким номером не найден.");
        return false;
    }
    update(number, group, marks) {
        for (let i in this.arr)
            if (this.arr[i].number === number) {
                this.arr[i].group = group;
                this.arr[i].marks = marks.slice();
                return true;
            }
        console.log("Студент с такой зачёткой не найден.");
        return false;
    }
    delete(number) {
        for (let i in this.arr)
            if (this.arr[i].number === number) {
                this.arr.splice(i, 1);
                break;
            }
        return true;
    }

    getAverageRating(number) {
        let score = 0.0;
        for (let i in this.arr)
            if (this.arr[i].number === number) {
                for (let j in this.arr[i].marks)
                    score += this.arr[i].marks[j];
                score /= this.arr[i].marks.length;
                console.log("Средний балл у cтудента с зачёткой №" + number + ": " + score.toFixed(2) + ".");
                return score;
            }
        console.log("Студент с зачёткой №" + number + " не найден.");
        return false;
    }

    getByGroup(group) {
        let temp_arr = [];
        for (let i = 0; i < this.arr.length; ++i)
            if (this.arr[i].group === group) {
                temp_arr.push(this.arr[i]);
            }

        if (temp_arr.length == 0)
            console.log("Группа " + group + " не найдена.");
        else {
            console.log("Информация о студентах в группе " + group + ":");
            for (let i in temp_arr)
                temp_arr[i].print();
        }
        return temp_arr;
    }

    getByMaxMarks(group) {
        let pos = -1, result = -1;
        for (let i = 0; i < this.arr.length; ++i)
            if (this.arr[i].group === group)
                if (result < this.arr[i].marks.length) {
                    result = this.arr[i].marks.length;
                    pos = i;
                }

        if (pos > -1)
            console.log("В группе " + this.arr[pos].group + " больше всего оценок - " + result + " - у студента с зачёткой №" + this.arr[pos].number + ".");
        else
            console.log("Группа " + group + " не найдена.");
        return result;
    }

    getZeroMarks() {
        let temp_arr = [];
        let print_arr = [];
        for (let i = 0; i < this.arr.length; ++i)
            if (this.arr[i].marks.length == 0) {
                temp_arr.push(this.arr[i]);
                print_arr.push(this.arr[i].number);
            }

        if (temp_arr.length == 0)
            console.log("Студентов без оценок нет или список пуст.");
        else
            console.log("Оценок нет у студентов со следующими номерами зачёток: " + print_arr.join(", ") + ".");
        return temp_arr;
    }
};

let Database = new Students;

let array = [5, 4, 5, 4, 4];
Database.create(1005, "ИУ7-54", array);
array[1] = 3;
Database.read(1005);

console.log("\nСоздание студентов:");
Database.create(100500, "ИУ7-55", [5, 4, 3, 5, 5, 5]);
Database.create(100000, "ИУ7-55", [3, 4, 3, 5, 4, 4]);
Database.create(777777, "ИУ7-55", []);
Database.create(666, "ИУ7-55", [5, 4, 5, 5, 5]);

Database.create(7887, "ИУ7-51", []);
Database.create(78587, "ИУ7-51", [5, 5, 5, 3, 3]);
Database.create(333, "ИУ7-51", [5, 5, 5, 3, 3]);

console.log("\nСоздание повторяющегося и ошибочного студента:");
Database.create(-100000, "ИУ7-55", [3, 4, 3, 5, 4, 4]);
Database.create(777777, "ИУ7-55", [5, 5]);

Database.delete(78587);
Database.delete(7);

console.log("");
Database.read(333);
console.log("Обновим этого студента:");
Database.update(333, "ИУ7-53", [3, 2, 3, 4]);
Database.read(333);
console.log("");

Database.read(100500);
console.log("");
Database.read(100);
console.log("");
Database.getAverageRating(100500);
console.log("");
Database.getByGroup("ИУ7-55");
console.log("");
Database.getByGroup("ИУ7-52");
console.log("");
Database.getByMaxMarks("ИУ7-51");
console.log("");
Database.getByMaxMarks("ИУ7-55");
console.log("");
Database.getZeroMarks();
console.log("");

// console.log("\nВсё хранилище:");
// console.log(Database.arr);






