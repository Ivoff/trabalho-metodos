function f(x){
    return ;
}

function f_linha(x){
    return ;
}

function newtonRaphson(x0, e){
    let xMenosUm = x0;
    let fxMenosUm = f(xMenosUm);
    let x = xMenosUm - (fxMenosUm/f_linha(x))
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

console.log( newtonRaphson() );