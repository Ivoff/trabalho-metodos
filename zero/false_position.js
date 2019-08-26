let f = (x) => x*x*x - 0.5;


let a = -1, b = 1, fa = f(a), fb = f(b), x = ((a*fb)-(b*fa))/(fb-fa), fx = f(x);
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
    }while(Math.abs(fx) > 0.01)
}
console.log(x);