const x = [3,5,10,10,20,20,20,30,40,50,60,70,70,80,100,100,100,120,120,140,150,180,180,200,200];
const y = [1.5,2,6,7,10,12,15,8,10,20,20,25,30,25,40,35,40,30,40,40,50,40,50,60,50];
function data(x, y){
    this.x = x;
    this.y = y;
    this.estimator_x = () => {
        let output = 0;
        this.x.forEach(element => {
            output += element/this.x.length;
        });
        return output;
    }
    this.estimator_y = () => {
        let output = 0;
        this.y.forEach(element => {
            output += element/this.y.length;
        });
        return output;
    }
}

let input = new data(x, y);
let output = 0;
let numerador = 0;
let denominador = [0, 0];

//console.log(input.x[1]);

for(let i = 0; i < input.x.length; i += 1){
    numerador += (input.x[i] - input.estimator_x()) * (input.y[i] - input.estimator_y());

    denominador[0] += (input.x[i] - input.estimator_x())*(input.x[i] - input.estimator_x());
    denominador[1] += (input.y[i] - input.estimator_y())*(input.y[i] - input.estimator_y());    
}

denominador = Math.sqrt(denominador[0]) * Math.sqrt(denominador[1]);

output = numerador / denominador;
console.log(output);