const mongoose = require("mongoose");
const validator = require("validator");

// connection creation & creat in a new db
mongoose.set('debug', true);

mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log('connected to the db');
     })
    .catch(err => {
        console.log('connection failed ' + err);
    }); 

// define a schema

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    ctype: String,
    videos: {
        type: Number,
        validate(value){
            if(value < 0){
                throw new Error("videos count sould not be negative");
            }
        }
        // validate:{
        //     validator: function(value){
        //         return value.length < 0
        //     },
        //     message: "Videos count should not be negative"
        // }
    },
    author: String,
    email: {
        type: String,
        required: true,
        unnique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is in invalid");
            }
        }

    },
    active: Boolean,
    date: {
        type:Date,
        default: Date.now
    }
})


const Playlist = new mongoose.model("Playlist" ,playlistSchema);

// create documment or  insert

const createDocumment = async () => {
    try{
        const basicPlaylist = new Playlist ({
            name: "Basic JavaScript",
            ctype: "Front End",
            videos: 50,
            author: "Thapa Technical",
            email: "ahmed.raza2654@gmail.com",
            active: true
        })

        const  esPlaylist = new Playlist ({
            name: "ES6 JavaScript",
            ctype: "Front End",
            videos: 50,
            author: "Thapa Technical",
            email: "ahmed.raza2654@gmail.com",
            active: true
        })
        // const  reactPlaylist = new Playlist ({
        //     name: "React JS",
        //     ctype: "Front End",
        //     videos: 50,
        //     author: "Thapa Technical",
        //     active: true
        // })

        // const nodePlaylist = new Playlist ({
        //     name: "Node JS",
        //     ctype: "Back End",
        //     videos: 50,
        //     author: "Thapa Technical",
        //     active: true
        // })

        // const mernPlaylist = new Playlist ({
        //     name: "Mern Stack",
        //     ctype: "Back End",
        //     videos: 50,
        //     author: "Thapa Technical",
        //     active: true
        // })
        // const expressPlaylist = new Playlist ({
        //     name: "Express JS",
        //     ctype: "Back End",
        //     videos: 50,
        //     author: "Thapa Technical",
        //     active: true
        // })

        const result = await Playlist.insertMany([basicPlaylist, esPlaylist]);
        console.log(result);
    }catch(err){
        console.log(err);
    }
}

createDocumment();
