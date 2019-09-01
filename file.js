function f(x){
    return Math.E**x - x - 5;
}

function bisection(a, b, e){
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
            console.log(output);
            n += 1
            if(n == 100)
                break;
        }while(Math.abs(fx) > e)
        return output;
    }
    else{
        return `f(2)*f(1.5) >= 0`;
    }
};

console.log( bisection(2, 1.5, 0.01) );