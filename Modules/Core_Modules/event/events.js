const EventsEmitter = require("events");
const { emit } = require("process");

const emitter = new EventsEmitter();

// event listener
emitter.on('Timer', (stop) => {
    console.log(`Stop: ${stop}`);
});


console.log(`Start: ${new Date()}`);
setTimeout(()=> {
    // event emitter.
    emitter.emit('Timer', new Date());
}, 2000);
