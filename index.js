const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000; 

const lagrange = require("./interpolation/lagrange").lagrange;
const formaNewton = require("./interpolation/formaNewton")

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post("/lagrange", (req, res) => {
    let input = req.body;
    let x = input.x;
    let y = input.y;
    let parsedInput = [];
    for(let i = 0; i < x.length; i += 1){
        parsedInput.push([x[i], y[i]]);
    }
    let output = lagrange(parsedInput);
    res.send(output);
});

app.post("/formaNewton", (req, res) => {
    let input = req.body;
    res.send(formaNewton(input));
});

app.listen(PORT, ()  =>{
    console.log("listening at "+PORT);
});