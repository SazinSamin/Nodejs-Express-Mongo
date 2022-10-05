// https://nodejs.dev/learn/how-to-read-environment-variables-from-nodejs

// we can pass variable inside to the node js file from outside the file.
// when we start nodejs from the terminal we can also send one or many variable value
// to the node file.

// example:
// "ENV_VAR=10 node main.js"
// here "ENV_VAR" is the variable name & "10" is the variable value.
// by passing this ENV_VAR from outside, we can also get this value from inside
// under "process.env".

// for multiple variable
// selectDatabase='online' onlineDBPass=23423 nodemon index.js

console.log(process.env.ENV_VAR);
