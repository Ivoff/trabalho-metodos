const tTable = require("./tTable").tTable;
const j = require("./tTable").j;

function ic(estimator, confidenceLevel, deviation, n){    
    //let estimator = 6.22;
    //let confidenceLevel = 95;
    let significance = (100-confidenceLevel)/100;
    let t = 0;
    let S = deviation;
    //let n = 9;  
    let libDegree = n - 1;

    for(let i = 0; i < tTable.length; i += 1){
        if(tTable[i][0] == libDegree){
            t = tTable[i][j[significance]-1];
        }
    }

    let ic = [0, 0];
    ic[0] = estimator - t*(S/Math.sqrt(n));
    ic[1] = estimator + t*(S/Math.sqrt(n));
    return ic;
}
module.exports = ic;