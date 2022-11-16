// https://www.youtube.com/watch?v=CrdMFZIYoEY&t=495s
// https://nodemailer.com/about/

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
        service: "outlook",
        auth: {
                user: "<your email>",
                pass: "<your password>",
        }
});

const options = {
        from: "<your email>",
        to: "<reciever email>",
        subject: "subject" ,
        text: "text",
};

transporter.sendMail(options, (err, data) => {
        err ? console.log(err) : console.log(data);
});

