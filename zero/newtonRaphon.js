const bissection = require('./bisseccao.js')

let f_linha = (x) => 4*Math.cos(x)-Math.E**x;
let f = (x) => 4*Math.sin(x)-Math.E**x;
let a = -5, b = 5, x_asd = (a+b)/2;

let xMenosUm = bissection(a, b, 0.1, f), fxMenosUm = f(xMenosUm);
var x = xMenosUm - (fxMenosUm/f_linha(x)), fx = f(x);

while(Math.abs(fx) > 0.0000000001){
    xMenosUm = x;
    fxMenosUm = fx;
    x = xMenosUm - (fxMenosUm/f_linha(xMenosUm));
    fx = f(x);
}

console.log(x);