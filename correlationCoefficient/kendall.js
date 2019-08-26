const x = [71,64,43,67,56,73,68,56,76,65,45,58,45,53,49,78,73,68];
const y = [82,91,100,68,87,73,78,80,65,84,116,76,97,100,105,77,73,78];

let discordant = 0;
let concordant = 0;

for(let i = 0; i < x.length; i += 1){
    for(let j = 0; j < x.length; j += 1){
        if(i < j){
            if( (x[i] > x[j] && y[i] > y[j]) || (x[i] < x[j] && y[i] < y[j]) ){
                concordant += 1;
            }else if( (x[i] > x[j] && y[i] < y[j]) || (x[i] < x[j] && y[i] > y[j]) ){
                discordant += 1
            }            
        }
    }    
}
console.log("concodante: "+concordant);
console.log("discordante: "+discordant);
let output = (concordant - discordant)/( (x.length/2) * ( x.length -1 ) );
console.log(output);