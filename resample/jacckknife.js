let data = [2.2, 2.5, 6.4, 6.7, 6.2, 8.2, 9.2, 7.9, 9.2, 10.1];

let estimator = {
    "media": (data) => {
        let output = 0;
        data.forEach(element => {
            output += element/data.length;
        });
        return output;
    },
    "mediana": (data) => {
        data.sort((a, b)=>{
            return a - b;
        });
        if(!(data.length % 2)){
            return data[data.length/2];
        }else{
            return (data[Math.ceil(data.length/2)] + data[Math.floor(data.length/2)])/2;
        }
    },
    "moda": (data) => {
        data.sort((a, b)=>{
            return a - b;
        });
        let moda = 0;
        let aux = 0;
        for(let i = 0; i < data.length-1; i += 1){
            if(data[i] == data[i+1]){
                aux += 1;
            }else if(moda < aux){
                moda = aux;
                aux = 0;                
            }else{
                aux = 0;
            }
        }
        return moda;
    }
};

let theta = estimator["media"](data);
let aux = [];
let output = 0;
let estimator_array = [];
for(let i = 0; i < data.length; i += 1){
    aux = data.slice();
    aux.splice(i, 1);
    estimator_array.push(estimator.media(aux) - theta);
    output += (estimator.media(aux) - theta) * (estimator.media(aux) - theta);
}
output = ((data.length - 1)/data.length) * output;
console.log(estimator_array);
console.log(output);