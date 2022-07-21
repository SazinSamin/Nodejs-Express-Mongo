// dependencies
const https = require('https');

// module scafolding
const notification = {};

// send sms to user using twilio api
notification.send = (phone, msg, callback) => {
        // input validation
        const userPhone = typeof(phone) === 'string' && phone.trim().length === 1 ? phone.trim() : false;
        const userMsg = typeof(msg) === 'string' && msg.trim().length > 0 && msg.trim().length <= 1600 ? msg.trim() : false;

        if(userPhone && userMsg) {
                console.log('Message sent');
                callback(200, {
                        msg: 'Message sent',
                })
        } else {
                callback(403, {
                        err: '403 !, Bad Request',
                });
        }
};

// export the module
module.exports = notification;