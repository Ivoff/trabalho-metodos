let exp = ["1", "3", "2", "1", "+", "*", "+", "1", "5", "/", "6", "8", "*", "+", "+"];

function postFixEvaluation(exp){
    let stopChar = new Set(["/","*","-","+", "^"]);
    let stack = [];
    let operand_1 = 0;
    let operand_2 = 0;
    exp.forEach(token => {
        if(!stopChar.has(token)){
            stack.push(token)
        }else{
            operand_2 = parseFloat(stack.pop());
            operand_1 = parseFloat(stack.pop());
            switch(token){
                case "+":
                    stack.push(operand_1 + operand_2);
                    break;
                case "-":
                    stack.push(operand_1 - operand_2);
                    break;
                case "*":
                    stack.push(operand_1 * operand_2);
                    break;
                case "/":
                    stack.push(operand_1 / operand_2);
                    break;
            }
        }                
    });

    return stack[0];
}

export{postFixEvaluation};

//console.log(postFixEvaluation(exp));