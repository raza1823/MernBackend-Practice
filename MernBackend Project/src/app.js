require('dotenv').config();
const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");



require("./db/conn");
const Register = require("./models/registers");
const {json} = require("express");
const jwt = require("jsonwebtoken");


const port = process.env.PORT || 3000;






// Initalized Path
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");



app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));




// Set Path
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);






// Initalized get
app.get("/", (req,res) => {
    res.render("index")  
});


app.get("/about", (req,res) =>{
    res.render('about')
})


app.get("/weather", (req,res) =>{
    res.render('weather')
})


app.get("*", (req,res) =>{
    res.render('404page', {
        errorMsg : "Opps! page not found, Click Here to go"
    })
})

app.get("/secret", auth, (req,res) => {
    // console.log(`this is the awesome ${req.cookies.jwt}`);
    res.render("secret")  
});

app.get("/logout", auth, async(req, res) => {
    try{

        // //for logout from device
        // req.user.tokens = req.user.tokens.filter((currElement) => {
        //     return currElement.token != req.token
        // })

        // logout form all the devices
        req.user.tokens = [];

        res.clearCookie("jwt");

        console.log("logout sucessful")
        await req.user.save();
        res.render("login");

    }catch(error){
        res.status(500).send(error);
    }
})

app.get("/register", (req, res) => {
    res.render("register");
})

app.get("/login", (req, res) => {
    res.render("login");
})






// create a new user into our Databse
app.post("/register", async(req, res) => {
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password===cpassword){
            const registerEmployee = new Register({
                firstname : req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                phone: req.body.phone,
                password: password,
                confirmpassword: cpassword
        })

        const token = await registerEmployee.generateAuthToken();
        res.cookie("jwt", token, {
            expires:new Date(Date.now() + 30000),
            httpOnly:true
        }); 
        
        
        const registered  = await registerEmployee.save();
        console.log("The token part " + registered);

        res.status(201).render("login");
        
    }else{
            res.send("Password are not macthing")
        }
        
    }catch(error){
        res.status(400).send(error);
    }
})







// login check

app.post("/login", async(req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        
        // db.collection.findOne(query, projection)
        const useremail = await Register.findOne({email:email});
        
        const isMatch = await bcrypt.compare(password, useremail.password);
        
        const token = await useremail.generateAuthToken();
        
        res.cookie("jwt", token, {
            expires:new Date(Date.now() + 600000),
            httpOnly:true
            // secure: true
        });

        console
        
        if(isMatch){
            res.status(201).render("index");
        }else{
            res.send("Invalid Email or Password");
        }

    }catch(error){
        res.status(400).send("Invalid Email or Password")
    }
})





// // Bcrypt Password
// const bcrypt = require("bcryptjs");

// const securePassword = async (password) => {

//     const passwordHash = await bcrypt.hash(password, 10);
//     console.log(passwordHash);  
    
//     const passwordmatch = await bcrypt.compare(password, passwordHash);
//     console.log(passwordmatch);
// }

// securePassword("Avaya@123")




// const jwt = require("jsonwebtoken");
// const createToken = async() => {
//     const token = await jwt.sign({_id:"614f3f2375271df7f0adaf98"}, "mynameisahmedrazaandiammernstackdevloper", {
//         expiresIn:"2 minutes"
//     });
//     console.log(token);

//     const userVer = await jwt.verify(token, "mynameisahmedrazaandiammernstackdevloper");
//     console.log(userVer);
// }

// createToken();





// listening port
app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})