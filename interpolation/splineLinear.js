const Unknown = require('./lagrange').Unknown;

data = {
    "x": [-1, 0, 1, 2, 3],
    "y": [1, 1, 0, -1, -2]
}

let s = [];
let aux;
for(let i = 1; i < data.x.length; i += 1){
    //dava pra fazer tudo isso em uma linha, tudo dentro do push,
    //porém assim que eu percebi a abominação que eu estava fazendo, voltei a sanidade e criei uma auxiliar
    aux = (new Unknown(1, -1).mult(1/(data.x[i] - data.x[i-1]))).mult(data.y[i-1])
    aux = aux.add((new Unknown(1, 1).mult(1/(data.x[i] - data.x[i-1]))).mult(data.y[i]));
    s.push([aux, ((data.y[i-1] * data.x[i]) / (data.x[i] - data.x[i-1])) - (data.y[i] * data.x[i-1]) / (data.x[i] - data.x[i-1])]);
}
console.log(s);