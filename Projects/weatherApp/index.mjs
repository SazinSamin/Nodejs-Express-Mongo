/*
Title: WeatherApp
Description: API based weather details application
Author: Sazin Reshed Samin
Date: 15-06-2022
*/

// Dependencies
import fetchData from './lib/apifetch.mjs';
import http from 'http';



// App object - Module Scafolding.
const app = {};

// App initiating function
app.init =  async  () => {
    // Get the data from getDate() function.
    const data = await fetchData.api.getData();
    // Log data output to the console.
    console.log(data)
}

// Invoke the app start function
app.init();


// get the data as API
http.createServer((req, res) => {
    if(req.url == '/weather') {
        res.end(JSON.stringify(app.data));
    }
}).listen(3000);

console.log('Server is running');
