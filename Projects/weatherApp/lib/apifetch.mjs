/*
Title: WeatherApp
Description: API based weather details application
Author: Sazin Reshed Samin
Date: 15-06-2022
*/

// Dependecies
import fetch from 'node-fetch';
import convert from './math.mjs';

// Object api - Module scafolding.
const api = {};


// Fetch data from the server & return to the user.
api.fetchData = async () => {
    // Fetch data asynchronously from the openweather server & convert the data
    // to JSON format. 
    return await (await fetch("http://api.openweathermap.org/data/2.5/weather?q=Jhenaidah&appid=263241df63fdd1b6dd713b14834fb2eb"))
                        .json();
}

// Parse JSON to individual data & return to the user.
api.getData = async () => {
    // Get the data.
    const data = await api.fetchData();
    // Seperate 'main' object portion for get the 'main' portion data easily.
    const main = data['main'];
    
    // return the individual data as object.
    // also use "clean" from math for converting kelvin to celcius & rounding.
    return {
            temp : convert.math.clean(main['temp']),
            feels_like : convert.math.clean(main['feels_like']),
            description : data['weather'][0]['description'],
            temp_max : convert.math.clean(main['temp_max']),
            temp_min : convert.math.clean(main['temp_min']),
            pressure : main['pressure'],
            humidity : main['humidity'],
            windSpeed : data['wind']['speed'],
            windDegree : data['wind']['deg']
    }
}


// Export the library.
export default {api};