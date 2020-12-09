// Написать скрипт, который принимает на вход число и считает его факториал.
// Скрипт должен получать параметр через process.argv.
// Написать скрипт, который принимает на вход массив чисел и выводит на экран факториал каждого числа из массива.
// Скрипт принимает параметры через process.argv.
// При решении задачи вызывать скрипт вычисления факториала через execSync.

"use strict";

if (process.argv.length < 2)
    return;

const execSync = require('child_process').execSync;

// функция для вызова программы и получения результата её работы
function useCmd(s) {
	const options = {encoding: 'utf8'};
	const cmd = s.toString();
	const answer = execSync(cmd, options);
	return answer.toString();
}

const args = [];
for (let i = 2; i < process.argv.length; ++i)
    args.push(parseInt(process.argv[i]));

args.forEach(element => {
    const factCommand = `node factorial.js ${element}`;
    let fact = useCmd(factCommand);
    console.log(fact.slice(0, -1));
});
