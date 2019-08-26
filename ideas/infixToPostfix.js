

let input = "1+3^2*cos(2+1)+(1/5+6*8)";

let arrayInput = [];

for(let i = 0; i < input.length; i += 1){
    arrayInput.push(input[i]);
}

input = arrayInput;
let opStack = [];
let output = [];
let stopChar = new Set(["/","*","-","+","(",")","^"]);

let precedence = (input) =>{    
    if(input == "^"){
        return 4
    }else if(input == "*" || input == "/"){
        return 3;
    }else if(input == "+" || input == "-"){
        return 2;
    }else if(input == "("){
        return 1
    }
}

/*for(let i = 0; i < input.length; i += 1){    
    if(input[i] != " "){
        if(!stopChar.has(input[i])){
            output.push(input[i]);            
        }else if(input[i] == "("){
            opStack.push(input[i]);            
        }else if(input[i] == ")"){
            if(opStack.length){
                let j = opStack.length - 1;
                while(opStack[j] != "("){        
                    output.push(opStack.pop());
                    j -= 1;                    
                }
            }
            opStack.pop();            
        }else if(stopChar.has(input[i])){
            if(opStack.length){
                let j = opStack.length - 1;                
                while(precedence(opStack[j]) >= precedence(input[i])){
                    output.push(opStack.pop());
                    j -= 1;                    
                }
            }
            opStack.push(input[i]);            
        }
    }    
}*/

while(opStack.length > 0){
    output.push(opStack.pop());
}

let functionFinder = (input)=>{
    if(input.search("cos") != -1){
        let beggining = input.indeOf("(", input.search("cos"))+1;
        let parethesis = 1;
        let ending = beggining

        while(parethesis > 0){
            if(input[ending] == "(")
                parethesis += 1;
            else if(input[ending] == ")")
                parethesis -= 1;
        }

        let currentExpression = input.substring(beggining, ending);
        return {"expression": currentExpression, "beggining": beggining, "ending": ending};
    }
    return -1;
}

function f(input){
    let input = "1+3^2*cos(cos(cos(x)))+(1/5+6*8)";
    let exception = functionFinder(input);

    while(exception != -1){
        currentTerm = f(exception.expression);
    }

    let arrayInput = [];

    for(let i = 0; i < input.length; i += 1){
        arrayInput.push(input[i]);
    }

    input = arrayInput;
    let opStack = [];
    let output = [];
    let stopChar = new Set(["/","*","-","+","(",")","^"]);

    let precedence = (input) =>{    
        if(input == "^"){
            return 4
        }else if(input == "*" || input == "/"){
            return 3;
        }else if(input == "+" || input == "-"){
            return 2;
        }else if(input == "("){
            return 1
        }
    }

    for(let i = 0; i < input.length; i += 1){    
        if(input[i] != " "){
            if(!stopChar.has(input[i])){
                output.push(input[i]);            
            }else if(input[i] == "("){
                opStack.push(input[i]);            
            }else if(input[i] == ")"){
                if(opStack.length){
                    let j = opStack.length - 1;
                    while(opStack[j] != "("){        
                        output.push(opStack.pop());
                        j -= 1;                    
                    }
                }
                opStack.pop();            
            }else if(stopChar.has(input[i])){
                if(opStack.length){
                    let j = opStack.length - 1;                
                    while(precedence(opStack[j]) >= precedence(input[i])){
                        output.push(opStack.pop());
                        j -= 1;                    
                    }
                }
                opStack.push(input[i]);            
            }
        }    
    }

    while(opStack.length > 0){
        output.push(opStack.pop());
    }
    return output;
}

console.log((output + []).replace(/,/g, " "));