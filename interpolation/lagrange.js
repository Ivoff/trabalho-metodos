let Unknown = class Unknown{    
    constructor(degree, coefficient){
        this.degree = degree;
        this.coefficient = coefficient;        
    }

    mult(x){
        if( x instanceof Unknown ){
            return new Unknown(this.degree + x.degree, this.coefficient*x.coefficient)
        }
        else{
            return new Unknown(this.degree, this.coefficient * x);
        }
    }
    add(x){
        if( x instanceof Unknown ){
            return new Unknown(this.degree, this.coefficient+x.coefficient);
        }
    }
}

let chuveirinho/* Distributiva */ = (data1, data2) => {
    dataOutput = [];

    data1.forEach(x1 =>{
        data2.forEach(x2 =>{
            if(x1 instanceof Unknown){
                dataOutput.push(x1.mult(x2));
            }else if(x2 instanceof Unknown){
                dataOutput.push(x2.mult(x1));
            }else{
                dataOutput.push(x1 * x2);
            }            
        });
    });

    for(let i = 1; i < dataOutput.length; i += 1){
        if(dataOutput[i-1] instanceof Unknown && dataOutput[i] instanceof Unknown){
            if(dataOutput[i-1].degree == dataOutput[i].degree){
                dataOutput[i-1] = dataOutput[i-1].add(dataOutput[i]);
                dataOutput.splice(i, 1);
            }
        }
    }

    return dataOutput;
}

let handler = (data) => {
    while(data.length > 1){
        data[0] = chuveirinho(data[0], data[1]);
        data.splice(1, 1);
    }
}

//(-1, 1) (0 ,1) (1 ,0) (2, -1) (3, -2)
function lagrange(input){
    let rawInput = input;
    let pol = [];
    let l = [];
    let denominator = [];

    for(let i = 0; i < rawInput.length; i += 1){
        pol.push([new Unknown(1, 1), rawInput[i][0]]);
    }

    for(let i = 0; i < rawInput.length; i += 1){
        var aux = pol.slice();

        aux.splice(i, 1);

        handler( aux );
        aux = aux[0];    

        l.push(aux);

        aux = 1;
        for(let j = 0; j < rawInput.length; j += 1){
            if(j != i){
                aux *= rawInput[i][0] - rawInput[j][0]
            }
        }
        denominator.push(aux);
    }
    for(let i = 0; i < l.length; i += 1){
        l[i] = chuveirinho(l[i], [1/denominator[i]]);
    }

    for(let i = 0; i < l.length; i += 1){
        let j = 0;
        l[i].forEach(element => {
            if(element instanceof Unknown){
                l[i][j] = element.mult(rawInput[i][1]);
            }else{
                l[i][j] = element*rawInput[i][1];
            }
            j += 1;
        });
    }

    for(let i = 0; i < l.length; i += 1){
        for(let j = 1; j < l.length; j += 1){
            if(l[0][i] instanceof Unknown){
                l[0][i] = l[0][i].add(l[j][i]);
            }else{
                l[0][i] += l[j][i];
            }
        }
    }

    let output = "";
    l = l[0];
    for(let i = 0; i < l.length; i += 1){
        if(l[i] instanceof Unknown){
            if(l[i].coefficient >= 0 && i == 0){
                output += (""+l[i].coefficient.toFixed(3))+"x^"+(""+l[i].degree)+" "
            }
            else if(l[i].coefficient >= 0)
                output += "+"+(""+l[i].coefficient.toFixed(3))+"x^"+(""+l[i].degree)+" ";
            else{
                output += (""+l[i].coefficient.toFixed(3))+"x^"+(""+l[i].degree)+" ";
            }
        }else{
            if(l[i] >= 0 && i == 0){
                output += ""+l[i];
            }
            else if(l[i] >= 0){
                output += "+"+l[i];
            }else{
                output += ""+l[i];
            }
        }
    }
    return output;
}
module.exports = {
    Unknown,
    chuveirinho, 
    handler,
    lagrange
}