const EvenEmitter = require('events');

const event = new EvenEmitter();

event.on('sayMyName', ()=> {
    console.log("Your name is Ahmed");
});

event.on('sayMyName', ()=> {
    console.log("Your name is Raza");
});

event.on('sayMyName', ()=> {
    console.log("Your name is Naveed");
});


//sc = status code
//msg = message
event.on('checkPage', (sc,msg) => {
    console.log(`status code is ${sc} and the page is ${msg}`);
})

event.emit('checkPage', 200, "ok");

