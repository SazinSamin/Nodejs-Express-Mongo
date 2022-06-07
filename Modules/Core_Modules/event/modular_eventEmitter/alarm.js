const EventsEmitter = require("events");

class Alarm extends EventsEmitter {
    startAlarm() {
        console.log(`Alarm started: ${new Date()}`);
        setTimeout(()=> {
            this.emit('alarm', `Alarm ended ${new Date()}`);
        }, 2000);
    }    
}

module.exports = Alarm;

