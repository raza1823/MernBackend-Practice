const express = require("express");
require("./db/conn");
// const Student = require("./models/students");
const studentRouter = require("./router/student");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// register our router
app.use(studentRouter);


//port listening
app.listen(port, () => {
    console.log(`connection is setup at ${port} `);
})


