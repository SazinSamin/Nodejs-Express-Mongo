        const express = require('express');

        const app = express();

        // https://expressjs.com/en/4x/api.html#express.json
        // https://www.youtube.com/watch?v=9plyl7_giFc&list=PLHiZ4m8vCp9PHnOIT7gd30PCBoYCpGoQM&index=16

        // when post data are comes, express will parse all the data in that format, it the Content-Type not matched
        // or any other problem it will return blank object
        app.use(express.json());
        app.use(express.urlencoded());
        app.use(express.text());
        app.use(express.raw());

        app.get('/', (req, res) => {
                res.send('App is live...');
        });

        app.post('/', (req, res) => {
                res.send('App is accepting request');
        });

        app.listen(3000, () =>{
                console.log('Server is running at 3000');
        });
