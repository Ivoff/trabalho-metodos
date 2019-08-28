function f(x){
    return x**2 + 2*x -1;
}
function falsePosition(a, b, e){
    let fa = f(a);
    let fb = f(b);
    let x = ((a*fb)-(b*fa))/(fb-fa);
    let fx = f(x);
    output = [];
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
            x = ((a*fb)-(b*fa))/(fb-fa);
            fx = f(x);
            output.push({
                "a": a,
                "b": b,
                "x": x,
                "f(a)": fa,
                "f(b)": fb,
                "f(x)": fx
            });
        }while(Math.abs(fx) > e)
        return output;
    }
    else{
        return `f(-1)*f(1) >= 0`;
    }
};
console.log( falsePosition(-1, 1, 1e-9) );