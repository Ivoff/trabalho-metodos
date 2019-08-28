const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const exec = require('child_process').exec;
const fs = require('fs');
const functionParser = require('./functionParser');
const util = require('util');
const child_process = require('child_process');

const PORT = process.env.PORT || 3000; 

const lagrange = require("./interpolation/lagrange").lagrange;
const formaNewton = require("./interpolation/formaNewton")

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post("/bisection", (req, res) => {
    const content = req.body;
    let inputFunction = `function f(x){
    return ${functionParser(content.f)};
}

function bissection(a, b, e){
    let n = 0;
    let output = [];
    let x = (a+b)/2;
    let fa = f(a), fb = f(b), fx = f(x);
    output.push({
        "a": a,
        "b": b,
        "x": x,
        "f(a)": fa,
        "f(b)": fb,
        "f(x)": fx
    });
    if(fa*fb < 0){
        do{
            if(fx == 0){
                return output;
            }
            else if(fa*fx < 0){
                b = x;
                fb = f(x);
            }else{
                a = x;
                fa = f(x);
            }
            x = (a+b)/2;
            fx = f(x);                
            output.push({
                "a": a,
                "b": b,
                "x": x,
                "f(a)": fa,
                "f(b)": fb,
                "f(x)": fx
            });
            n += 1
            if(n == 100)
                break;
        }while(Math.abs(fx) > e)
        return output;
    }
    else{
        return \`f(${content.a})*f(${content.b}) >= 0\`;
    }
};

console.log( bissection(${content.a}, ${content.b}, ${content.e}) );`;
    fs.writeFile("file.js", inputFunction, err => {
        console.log(err);
    });    
    child_process.exec('node file.js', (err, stdout, stderr)=>{                
        res.send(stdout);
    });
});

app.post("false-position", (req, res) => {

});

app.post("/lagrange", (req, res) => {
    let input = req.body;
    let x = input.x;
    let y = input.y;
    let parsedInput = [];
    for(let i = 0; i < x.length; i += 1){out
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