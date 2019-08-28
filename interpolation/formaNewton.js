const Unknown = require('./lagrange').Unknown;
const chuveirinho = require('./lagrange').chuveirinho;
const handler = require('./lagrange').handler;

Array.min = function(array){
    return Math.min.apply(Math, array);
}

Array.max = function(array){
    return Math.max.apply(Math, array);
}

let subArray = (array, inclusiveBeggining, exclusiveEnding)=>{
    let output = [];
    
    if(exclusiveEnding > array.length){
        return 0;
    }    
    for(let i = inclusiveBeggining; i < exclusiveEnding; i += 1){
        output.push(array[i]);
    }
    return output;
};

/*let data = {
    "x": [1, 2, 3],
    "y": [1, 7, 10]
}*/
function formaNewton(data){
    let d = [];
    d.push(data.y.slice());

    let currentD = data.y.slice();
    let aux = [];
    let begin;
    let end;

    for(let i = 1; i < data.y.length; i += 1){    
        begin = 0;
        end = i+1;
        for(let j = 0; end <= data.y.length; j += 1){            
            aux.push((currentD[j+1] - currentD[j])/(Array.max(subArray(data.x, begin, end)) - Array.min(subArray(data.x, begin, end))));
            begin += 1;
            end += 1;        
        }
        currentD = aux.slice();
        d.push(currentD);    
        aux = [];
    }

    let polinomial = [];
    let output = [];

    polinomial.push([new Unknown(1, 1), - data.x[0]]);
    output.push(d[0][0]);

    for(let i = 1; i < data.x.length; i += 1){
        polinomial.push(
            chuveirinho(polinomial[i-1], [new Unknown(1, 1), - data.x[i]])
        );    
        aux = 0;
        polinomial[i-1].forEach(element => {
            if(element instanceof Unknown){            
                aux = element.mult(d[i][0]);         
                var j = 0;
                while(j < output.length){
                    if(output[j] instanceof Unknown && output[j].degree == aux.degree){
                        output[j] = output[j].add(aux);
                        break;
                    }
                    j += 1;
                }
                if(j == output.length){
                    output.push(aux);
                }
            }else{            
                output[0] += element * d[i][0];            
            }
        });
    }    
    aux = output;    
    output = "";
    for(let i = 0; i < aux.length; i += 1){
        if(aux[i] instanceof Unknown){
            if(aux[i].coefficient >= 0 && i == 0){
                output += (""+aux[i].coefficient.toFixed(3))+"x^"+(""+aux[i].degree)+" "
            }
            else if(aux[i].coefficient >= 0)
                output += "+"+(""+aux[i].coefficient.toFixed(3))+"x^"+(""+aux[i].degree)+" ";
            else{
                output += (""+aux[i].coefficient.toFixed(3))+"x^"+(""+aux[i].degree)+" ";
            }
        }else{
            if(aux[i] >= 0 && i == 0){
                output += ""+aux[i];
            }
            else if(aux[i] >= 0){
                output += "+"+aux[i];
            }else{
                output += ""+aux[i];
            }
        }
    }    
    return output;
}

module.exports = formaNewton;