replacePot = (input)=>{
    input = input.replace("^", "**");
    return input;
}

replaceImplicitProduct = (input)=>{
    let term = "";
    for(let i = 0; i < input.length; i+=1){                
        if(input[i] == 'x'){
            if(input.charCodeAt(i-1) > 47 && input.charCodeAt(i-1) < 58){
                term += input[i-1] + '*' + input[i];
                input = input.replace(input[i-1]+input[i], term)
            }
            term = "";
            if(input.charCodeAt(i+1) > 47 && input.charCodeAt(i+1) < 58){
                term += input[i] + '*' + input[i+1];
                input = input.replace(input[i]+input[i+1], term)
            }            
        }        
    }
    return input;
}

replaceFunctions = (input)=>{
    let position, term ="";
    let i;

    input = input.replace(/cos/g, "Math.cos");
    input = input.replace(/sen/g, "Math.sin");
    input = input.replace(/tan/g, "Math.tan");
    input = input.replace(/tg/g, "Math.tan");
    input = input.replace(/log10/g, "Math.log10");
    input = input.replace(/log2/g, "Math.log2");
    input = input.replace(/log/g, "Math.log");
    input = input.replace(/e/g, "Math.E");
    
    // caso ln
    position = input.search("ln");    

    if(position != -1){
        i = position;
        while(input[i] != ')'){
            i+=1;            
        }
        term = input.substr(position+2, i-position-1);
        input = input.replace("ln"+term, "(Math.log"+term+"/Math.log(e))");
    }

    return input;
}

replaceRoot = (input) =>{
    input = input.replace(/sqrt/g, "Math.sqrt");
    position = input.search("root");
    return input;    
}

module.exports = functionParser = (input) => {
    input = replacePot(input);
    input = replaceImplicitProduct(input);
    input = replaceFunctions(input);
    input = replaceRoot(input);
    console.log(input);
    return input;
}