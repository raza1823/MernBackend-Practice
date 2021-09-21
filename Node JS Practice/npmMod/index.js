const chalk = require('chalk');
const validator = require('validator');

console.log(chalk.blue.underline.inverse("Hello World!"));

const res = validator.isEmail("ahmed.raza@digitalcloud.com");
console.log(res ? chalk.green.inverse(res) : chalk.red.inverse(res));