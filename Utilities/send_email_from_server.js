// https://www.youtube.com/watch?v=CrdMFZIYoEY&t=495s
// https://nodemailer.com/about/

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
        service: "outlook",
        auth: {
                user: "<your email>",
                pass: "<your password>",
        },
        // Be carefull about from, if from is missing or the auth.user and from isn't same then email will
        // landed to the reciever spam folder.
        from:"<your email>",
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

