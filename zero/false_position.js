module.exports = (a, b, f, e) =>{    
    let fa = f(a);
    let fb = f(b);
    let x = ((a*fb)-(b*fa))/(fb-fa);
    let fx = f(x);

    if(fa*fb < 0){
        do{
            if(fa*fx < 0){
                b = x;
                fb = f(x);
            }else{
                a = x;
                fa = f(x);
            }
            x = ((a*fb)-(b*fa))/(fb-fa);
            fx = f(x);
        }while(Math.abs(fx) > e)
    }
}