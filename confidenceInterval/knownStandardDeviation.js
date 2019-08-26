const zTable = require("./ztable");

let estimator = 19.2;
let confidenceLevel = 95;
let criticalZ = [0, 0, 0];
let sigma = 2.4;
let n = 9;  

confidenceLevel = (confidenceLevel/2)/100;

let found = false;

addCriticalZ = function(ordem, criticalZ){
    if(ordem == 2){
        if(criticalZ[2] == 9){
            criticalZ[2] = 0;
            if(criticalZ[1] == 9){
                criticalZ[1] = 0;
                criticalZ[0] += 1;
            }else{
                criticalZ[1] += 1;
            }
        }else{
            criticalZ[2] += 1;
        }
    }else if(ordem == 1){
        if(criticalZ[1] == 9){
            criticalZ[1] = 0;
            criticalZ[0] += 1;
        }else{
            criticalZ[1] += 1;
        }                
    }else{
        criticalZ[0] += 1;
    }     
}

for(let i = 0; i < 31; i += 1){    
    for(let j = 0; j < 10; j += 1){
        //console.log(criticalZ);
        if(zTable[i][j] == confidenceLevel){
            found = true;
            break;
        }
        if(j < 9){
            if(zTable[i][j] < confidenceLevel && confidenceLevel < zTable[i][j+1]){
                var aux = criticalZ.slice();
                addCriticalZ(2, aux);    
                criticalZ[0] = (criticalZ[0]+aux[0])/2;
                criticalZ[1] = (criticalZ[1]+aux[1])/2;
                criticalZ[2] = (criticalZ[2]+aux[2])/2;
                found = true;
                break;
            }
        }else{
            if(zTable[i][j] < confidenceLevel && confidenceLevel < zTable[i+1][0]){
                var aux = criticalZ.slice();
                addCriticalZ(2, aux);    
                criticalZ[0] = (criticalZ[0]+aux[0])/2;
                criticalZ[1] = (criticalZ[1]+aux[1])/2;
                criticalZ[2] = (criticalZ[2]+aux[2])/2;                
                found = true;
                break;
            }
        }

        addCriticalZ(2, criticalZ);
    }    
    if(found == true){
        break;
    }    
}


criticalZ = criticalZ[0] + criticalZ[1]*0.1 + criticalZ[2]*0.01;

//console.log(criticalZ);

let ic = [0, 0];
ic[0] = estimator - criticalZ*(sigma/Math.sqrt(n));
ic[1] = estimator + criticalZ*(sigma/Math.sqrt(n));

console.log(ic);