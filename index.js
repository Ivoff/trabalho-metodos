const fs = require('fs');
const funcHandler = require("./functionParser.js");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let f = require("./file.js");

const PORT = process.env.PORT || 3000; 

const bissection = require("./zero/bisseccao");
const false_position = require("./zero/false_position");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

function reload(name){
    delete require.cache[require.resolve(name)]
    return require(name)
}

app.post("/api/bissection", function(req, res){
    console.log(req.body);
    let content = req.body;
    let parsed_fun = funcHandler(content.f);    
    
    let fun = "module.exports = (x) => {\n\treturn "+parsed_fun+";\n}";
    fs.writeFile("./file.js", fun, err =>{
        console.log(err);
    });
    delete require.cache[require.resolve("./file.js")];    
    res.send(bissection(parseFloat(content.a), parseFloat(content.b), parseFloat(content.e), f));
});

app.post("/api/false_position", function(req, res){
    console.log(req.body);
    let content = req.body;
    let parsed_fun = funcHandler(content.f);    
    
    let fun = "module.exports = (x) => {\n\treturn "+parsed_fun+";\n}";
    fs.writeFile("./file.js", fun, err =>{
        console.log(err);
    });

    reload("./file");

    console.log(f(1))

    res.send(false_position(parseFloat(content.a), parseFloat(content.b), parseFloat(content.e), f));
});

app.listen(PORT, ()=>{
    console.log("listening at "+PORT);
});