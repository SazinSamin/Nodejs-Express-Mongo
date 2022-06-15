/*
Title: WeatherApp
Description: API based weather details application
Author: Sazin Reshed Samin
Date: 15-06-2022
*/

// Math object - Module Scafolding.
const math = {};

// Function to convert kelving to celcius
math.kelvinToCelcius = (kevin) => kevin - 273.15;
// Function for rounding data value
math.round = (val) => val.toFixed(2);

// Clean the data by rounding & convert to celcius.
math.clean = (val) => {
    return math.round(math.kelvinToCelcius(val));
}

// Export the library
export default {math};