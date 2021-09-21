const fs = require("fs");

fs.writeFileSync('read.txt', 'welcome to Ahmed Raza Palace');

fs.writeFileSync('read.txt', 'Ahmed Raza, welcome to Ahmed Raza Palace');

fs.appendFileSync('read.txt', 'how are you I am good.');



const buf_data = fs.readFileSync('read.txt');
console.log(buf_data);

org_data = buf_data.toString();

console.log(org_data);

fs.renameSync('read.txt', 'readwrite.txt');