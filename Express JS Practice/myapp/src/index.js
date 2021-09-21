const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const requests = require ("requests");

const port = 8000;


// built in middleware

const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// to set the view engine
app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialsPath);

app.use(express.static(staticPath));


// template engine route
app.get("/", (req, res) => {
    res.render('index', {
        channelName : "Ahmed Raza",
    });
});


app.get("/about", (req, res) => {
    requests(
        `http://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&units=metric&appid=a8206860acfe51dc990c07d8d7d1bcb3`
      )
        .on("data", (chunk) => {
          const objdata = JSON.parse(chunk);
          const arrData = [objdata];
          console.log(`City name is ${arrData[0].name} and temp is ${arrData[0].main.temp}`);
        
          res.write(arrData[0].name);
        })
        .on("end", (err) => {
          if (err) return console.log("connection closed due to errors", err);
          res.end();
        });
});
  




// 404 error page redirect

// app.get('/about/*', (req, res) =>{
//     res.render("404", {
//         errorcoment: "Ops this about us Page could not be found",
//     });
// });


// app.get('*', (req, res) =>{
//     res.render("404", {
//         errorcoment: "Ops Page could not be found",
//     });
// });




// listening to the port

app.listen(port, () =>{
    console.log(`Listening to the port ${port}`);
});
