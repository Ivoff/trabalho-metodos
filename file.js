function f(x){
    return x**2 + 2*x -1;
}

function bissection(a, b, e){
    let n = 0;
    let output = [];
    let x = (a+b)/2;
    let fa = f(a), fb = f(b), fx = f(x);
    output.push({
        "a": a,
        "b": b,
        "x": x,
        "f(a)": fa,
        "f(b)": fb,
        "f(x)": fx
    });
    if(fa*fb < 0){
        do{
            if(fx == 0){
                return output;
            }
            else if(fa*fx < 0){
                b = x;
                fb = f(x);
            }else{
                a = x;
                fa = f(x);
            }
            x = (a+b)/2;
            fx = f(x);                
            output.push({
                "a": a,
                "b": b,
                "x": x,
                "f(a)": fa,
                "f(b)": fb,
                "f(x)": fx
            });
            n += 1
            if(n == 100)
                break;
        }while(Math.abs(fx) > e)
        return output;
    }
    else{
        return `f(-1)*f(1) >= 0`;
    }
};

console.log( bissection(-1, 1, 0.000001) );