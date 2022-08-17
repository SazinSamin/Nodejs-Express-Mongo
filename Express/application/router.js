const express = require('express');
const { route } = require('express/lib/application');

const app = express();

// https://www.youtube.com/watch?v=9plyl7_giFc&list=PLHiZ4m8vCp9PHnOIT7gd30PCBoYCpGoQM&index=16
// https://expressjs.com/en/4x/api.html#express.router
const router = express.Router();

app.use(router);


route.get('/', (req, res) => {
        res.send('App is live...');
});

router.post('/', (req, res) => {
        res.send('App is accepting request');
});

router.listen(3000, () => {
        console.log('Server is running at 3000');
});
