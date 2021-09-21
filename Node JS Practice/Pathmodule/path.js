const path = require("path");

// console.log(path.dirname('D:/Backend Dev/Node/nodejs/Pathmodule/path.js'));
// console.log(path.extname('D:/Backend Dev/Node/nodejs/Pathmodule/path.js'));
// console.log(path.basename('D:/Backend Dev/Node/nodejs/Pathmodule/path.js'));
const myPath = path.parse('D:\Backend Dev\Node\nodejs\Pathmodule\path.js');

console.log(myPath.name);