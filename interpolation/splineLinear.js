const Unknown = require('./lagrange').Unknown;

/*data = {
    "x": [-1, 0, 1, 2, 3],
    "y": [1, 1, 0, -1, -2]
}*/

function splineLinear(data){
    let s = [];
    let aux;
    for(let i = 1; i < data.x.length; i += 1){
        //dava pra fazer tudo isso em uma linha, tudo dentro do push,
        //porém assim que eu percebi a abominação que eu estava fazendo, voltei a sanidade e criei uma auxiliar
        aux = (new Unknown(1, -1).mult(1/(data.x[i] - data.x[i-1]))).mult(data.y[i-1])
        aux = aux.add((new Unknown(1, 1).mult(1/(data.x[i] - data.x[i-1]))).mult(data.y[i]));
        s.push([aux, ((data.y[i-1] * data.x[i]) / (data.x[i] - data.x[i-1])) - (data.y[i] * data.x[i-1]) / (data.x[i] - data.x[i-1])]);
    }
    let output = "";
    s.forEach(element => {
        output += "[";
        for(let i = 0; i < element.length; i += 1){
            if(element[i] instanceof Unknown){
                if(element[i].coefficient >= 0 && i == 0){
                    output += (""+element[i].coefficient.toFixed(3))+"x^"+(""+element[i].degree)+" "
                }
                else if(element[i].coefficient >= 0)
                    output += "+"+(""+element[i].coefficient.toFixed(3))+"x^"+(""+element[i].degree)+" ";
                else{
                    output += (""+element[i].coefficient.toFixed(3))+"x^"+(""+element[i].degree)+" ";
                }
            }else{
                if(element[i] >= 0 && i == 0){
                    output += ""+element[i];
                }
                else if(element[i] >= 0){
                    output += "+"+element[i];
                }else{
                    output += ""+element[i];
                }
            }
        }
        output += "]";
    });
    return output;
}

module.exports = splineLinear;