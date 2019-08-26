f = (x) =>{
    return (x*x) - 0.5;
}

let x1 = 2, x2 = 1;
let fx1 = f(x1), fx2 = f(x2);
let x, fx;
do{
    x = (x1*fx2 - x2*fx1)/(fx2-fx1);
    fx = f(x);
    x2 = x1;
    fx2 = fx1;
    x1 = x;
    fx1 = fx;
    console.log("x1 = " + x1 +" "+ "x2 = " + x2 +" "+ "fx1 = " +fx1 +" "+ "fx2 = " + fx2);
}while( Math.abs(fx) > 0.000001 );
console.log(x);