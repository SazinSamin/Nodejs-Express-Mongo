const express = require('express');
const app = express();

app.set('view engine', 'ejs');


app.route('/')
        .get((req, res) => {
                

                // return true if the header sent, else false
                console.log(res.headersSent);
                // set local variable for responsel which only persist for a response
                res.locals.name = 'Express';
                res.set('Content-Type', 'Application/json');
                console.log(res.get('Content-Type'));
                res.append('title', 'my-app');

                res.links('sazinsamin.github.io');
                res.location('/test');

                // send reponse according to cliend header incoming "Accept" field
                res.format({
                        'text/plain' : () => {
                                res.send('My express app');
                        },
                        'application/json' : () => {
                                res.send({message: 'My Express app'})
                        },
                        'text/html' : () => {
                                res.render('index', {
                                        
                                });
                        },
                        'application/javascript': () => {
                                // redirect to other specified location or url, see another redirection in /test
                                res.redirect('/test');
                        },
                        default: () => {
                                res.status(406).send('Not acceptable')
                        }
                })
                // res.send('Ok');
                // res.end();
                
        });

        // redirect to specified url
        app.get('/test', (req, res) => {
                res.redirect('https://www.google.com');
        })

app.listen(3000, () => {
        console.log('Server is running on 3000');
})
