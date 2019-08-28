function f(x){
    return ;
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
}

console.log( secante(  ) );