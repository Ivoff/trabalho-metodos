function bootstrap(data, estimatorString){
    let estimator = {
        "media": (data) => {
            let output = 0;
            data.forEach(element => {
                output += element/data.length;
            });
            return output;
        },
        /*"mediana": (data) => {
            data.sort((a, b)=>{
                return a - b;
            });
            console.log(data);
            if((data.length % 2)){
                console.log(`meio? ${Math.ceil(data.length/2)}`);
                return data[Math.ceil(data.length/2)];
            }else{
                return (data[Math.ceil(data.length/2)] + data[Math.floor(data.length/2)])/2;
            }
        }*//*,
        "moda": (data) => {
            data.sort((a, b)=>{
                return a - b;
            });
            let moda ={
                "times": 0 
            };
            let aux = 0;
            for(let i = 0; i < data.length-1; i += 1){
                if(data[i] == data[i+1]){
                    aux += 1;
                }else if(moda.times < aux){
                    moda.times = aux;
                    moda.indexValue = data[i];
                    aux = 0;                
                }else{
                    aux = 0;
                }
            }
            return moda.indexValue;
        }*/
    };

    let estimatorData = [];
    let aux = [];    
    
    for(let i = 0; i < data.length; i += 1){
        aux = data.slice();
        aux.splice(Math.floor(Math.random()*10), 1);
        estimatorData.push( estimator[estimatorString](aux) );
    }
    let output;
    output = estimator[estimatorString](estimatorData);
    return {
        "OriginalDataEstimator": estimator[estimatorString](data),
        "estimatorArray": estimatorData,
        "estimatorArray-estimator": output
    };
}
module.exports = bootstrap;