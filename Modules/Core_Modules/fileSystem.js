const fs = require("fs");
const intro = 'Assalamu Alaikum, This is Sazin Reshed Samin';
const id = ' 11';
fs.writeFileSync("input.txt", intro);
fs.appendFileSync("input.txt", id);

const data = fs.readFileSync("input.txt");
console.log(data.toString());


const data2 = fs.readFile("input.txt", (err, datas)=> {
    if(!err) {
        console.log(datas);
    }
    return datas;

});

// here I face a problem that data2 is print undefined, 
// later I discover as the readFile() is asynchronous function, so it's wait 
// for the data from I/O, without blocking the programe execution, 
// and the "console.log(data2)" excute before the I/O operation
// that's why print the result "undefined",
// cause that data then hasn't arrived.
console.log(data2);
