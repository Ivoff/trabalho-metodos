module.exports = function(a, b, e, f){
        let output = [];
        let x = (a+b)/2;
        let fa = f(a), fb = f(b), fx = f(x);
        if(fa*fb < 0){
            do{
                if(fa*fx < 0){
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
                
            }while(Math.abs(fx) > e)
            return output;
        }
        else{
            return -1;
        }
    };