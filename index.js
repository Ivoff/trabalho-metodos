const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const functionParser = require('./functionParser');
const child_process = require('child_process');

const PORT = process.env.PORT || 3000; 

const lagrange = require("./interpolation/lagrange").lagrange;
const formaNewton = require("./interpolation/formaNewton");
const splineLinear = require("./interpolation/splineLinear");

const knownStandardDeviation = require("./confidenceInterval/knownStandardDeviation");
const unknownStandardDeviation = require("./confidenceInterval/unknownStandardDeviation");

const kendall = require("./correlationCoefficient/kendall");
const pearson = require("./correlationCoefficient/pearson");
const spearman = require("./correlationCoefficient/spearman");

const jackknife = require("./resample/jacckknife");
const bootstrap = require("./resample/bootstrap");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post("/bisection", (req, res) => {
    const content = req.body;
    let inputFunction = `function f(x){
    return ${functionParser(content.f)};
}

function bisection(a, b, e){
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

console.log( bisection(${content.a}, ${content.b}, ${content.e}) );`;
    fs.writeFile("file.js", inputFunction, err => {
        console.log(err);
    });    
    child_process.exec('node file.js', (err, stdout, stderr)=>{                
        res.send(stdout);
    });
});

app.post("/false-position", (req, res) => {
    const content = req.body;
    let inputFunction = `function f(x){
    return ${functionParser(content.f)};
}
function falsePosition(a, b, e){
    let fa = f(a);
    let fb = f(b);
    let x = ((a*fb)-(b*fa))/(fb-fa);
    let fx = f(x);
    output = [];
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
            x = ((a*fb)-(b*fa))/(fb-fa);
            fx = f(x);
            output.push({
                "a": a,
                "b": b,
                "x": x,
                "f(a)": fa,
                "f(b)": fb,
                "f(x)": fx
            });
        }while(Math.abs(fx) > e)
        return output;
    }
    else{
        return \`f(${content.a})*f(${content.b}) >= 0\`;
    }
};
console.log( falsePosition(${content.a}, ${content.b}, ${content.e}) );`;
    fs.writeFile("file.js", inputFunction, err => {
        console.log(err);
    });    
    child_process.exec('node file.js', (err, stdout, stderr)=>{                
        res.send(stdout);
    });
});

app.post("/newtonRaphson", (req, res) => {
    const content = req.body;
    let inputFunction = `function f(x){
    return ${functionParser(content.f)};
}

function f_linha(x){
    return ${functionParser(content.derivativa)};
}

function newtonRaphson(x0, e){
    let xMenosUm = x0;
    let fxMenosUm = f(xMenosUm);
    let x = xMenosUm - (fxMenosUm/f_linha(xMenosUm))
    let fx = f(x);
    let i = 0;
    let output = [];    
    output.push({
            "x": x,
            "fx": fx,
            "x-1": xMenosUm,
            "fx-1": fxMenosUm
    });
    while(Math.abs(fx) > e){        
        xMenosUm = x;
        fxMenosUm = fx;
        x = xMenosUm - (fxMenosUm/f_linha(xMenosUm));
        fx = f(x);
        output.push({
            "x": x,
            "fx": fx,
            "x-1": xMenosUm,
            "fx-1": fxMenosUm
        });
        i += 1;
        if(i == 200){
            return "limite de 200 iteracoes atigidas";            
        }
    }
    return output;
}

console.log( newtonRaphson(${content.xMenosUm}, ${content.e}) );`;
    fs.writeFile("file.js", inputFunction, err => {
        console.log(err);
    });    
    child_process.exec('node file.js', (err, stdout, stderr)=>{                
        res.send(stdout);
    });
});

app.post("/secante", (req, res) => {
    const content = req.body;
    let inputFunction = `function f(x){
    return ${functionParser(content.f)};
}

function secante(x1, x2, e){
    let fx1 = f(x1);
    let fx2 = f(x2);
    let x;
    let fx;
    let k = 1;
    let output = [];
    output.push({
        "k": k,
        "x": x1,
        "fx": fx1
    });
    k += 1;
    output.push({
        "k": k,
        "x": x2,
        "fx": fx2
    });
    do{
        x = (x1*fx2 - x2*fx1)/(fx2-fx1);
        fx = f(x);
        x2 = x1;
        fx2 = fx1;
        x1 = x;
        fx1 = fx;
        k += 1;
        output.push({
            "k": k,
            "x": x,
            "fx": fx
        });
    }while(Math.abs(fx) > e)
    return output;
}

console.log( secante( ${content.x1}, ${content.x2}, ${content.e} ) );`;
    fs.writeFile("file.js", inputFunction, err => {
        console.log(err);
    });    
    child_process.exec('node file.js', (err, stdout, stderr)=>{                
        res.send(stdout);
    });
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

app.post("/splineLinear", (req, res) => {
    const content = req.body;
    res.send(splineLinear(content));
});

app.post("/intervaloConfianca/conhecido", (req, res) => {
    const content = req.body;
    res.send(knownStandardDeviation(content.estimator, content.confidenceLevel, content.sigma, content.n));
});

app.post("/intervaloConfianca/desconhecido", (req, res) => {
    const content = req.body;    
    res.send(unknownStandardDeviation(content.estimator, content.confidenceLevel, content.deviation, content.n));
});

app.post("/kendall", (req, res) => {
    const content = req.body;
    res.send(kendall(content.x, content.y));
});

app.post("/pearson", (req, res) => {
    const content = req.body;
    res.send({"correlacao": pearson(content.x, content.y)});
});

app.post("/spearman", (req, res) => {
    const content = req.body;
    res.send({"correlacao": spearman(content.x, content.y)});
});

app.post("/jackknife", (req, res) => {
    const content = req.body;
    res.send(jackknife(content.data, content.estimatorString));
});

app.post("/bootstrap", (req, res) => {
    const content = req.body;
    res.send(bootstrap(content.data, content.estimatorString));
});

app.listen(PORT, ()  =>{
    console.log("listening at "+PORT);
});