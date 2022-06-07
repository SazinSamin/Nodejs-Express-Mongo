const Alarm = require('./alarm');
const alarm = new Alarm();
alarm.on('alarm', (msg) => {
    console.log(msg);
})

alarm.startAlarm();