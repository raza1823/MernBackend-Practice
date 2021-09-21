const fs = require("fs");


const bioData = {
    name: "Ahmed",
    age: 19,
    education: "BSSE",
};

// 1: Convert to JSON
// 2: dusre file me add karna
// 3: read file
// 4: again convert back to js obj ori
// 5: console.log



// console.log(bioData.education);


// const jsonData = JSON.stringify(bioData);
// // console.log(jsonData);

// const objData = JSON.parse(jsonData);
// console.log(objData);


const jsonData = JSON.stringify(bioData);
// fs.writeFile('json1.json', jsonData, (err) => {
//     console.log("File created suceesfully");
// });

fs.readFile("json1.json", "utf-8", (err, data)=> {
    // console.log(data);
    const orgData = JSON.parse(data);
    console.log(orgData);
});