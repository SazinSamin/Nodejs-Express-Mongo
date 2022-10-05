import express from "express";
const app = express()

app.use((req, res, next) => {
        console.log('Time:', Date.now())
        next();
});


app.get('/', (req, res) => {
        res.end();
})

app.listen(3000, () => {
        console.log('Server is listeting');
})