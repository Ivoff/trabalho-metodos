const input_x = [71,64,43,67,56,73,68,56,76,65,45,58,45,53,49,78,73,68];
const input_y = [82,91,100,68,87,73,78,80,65,84,116,76,97,100,105,77,73,78];

let x = [];
let y = [];

for(let i = 1; i <= input_x.length; i += 1){
    x.push( {"val":input_x[i-1], "std_pos": i, "sort_pos": 0} );
    y.push( {"val":input_y[i-1], "std_pos": i, "sort_pos": 0} );
}

x.sort((a, b)=>{
    return a.val - b.val;
});
y.sort((a, b)=>{
    return a.val - b.val;
});

for(let i = 0; i < x.length; i += 1){
    x[i].sort_pos = i+1;
    y[i].sort_pos = i+1;
}

function findRepeated(array){
    let i = 0;
    while(i < array.length-1){        
        if(array[i].val == array[i+1].val){
            let local_iterator = i+2;
            let cont = 2;
            let sum = array[i].sort_pos + array[i+1].sort_pos;
            while(array[local_iterator.val] == array[i]){
                sum += array[local_iterator].sort_pos;
                cont += 1;
                local_iterator += 1;
            }
            for(let j = i; j < local_iterator; j += 1){
                array[j].sort_pos = sum/cont;
            }
            i = local_iterator;
        }else{
            i += 1;
        }        
    }
}

findRepeated(x);
findRepeated(y);

x.sort((a, b)=>{
    return a.std_pos - b.std_pos;
});
y.sort((a, b)=>{
    return a.std_pos - b.std_pos;
});

// eu sei que com certeza tem um jeito muito mais otimizado de fazer isso, mas eu fiz de ultima hora, entao neh...

let output = 0;
let d = 0;

for(let i = 0; i < x.length; i += 1){
    d += (x[i].sort_pos - y[i].sort_pos)*(x[i].sort_pos - y[i].sort_pos);
}

output = 1 - (6 * d)/(x.length * ((x.length * x.length) - 1));

console.log(output);