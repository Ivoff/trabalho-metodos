# trabalho-metodos

## Ambiente
- Linux ubuntu
- NodeJS 10.16.0
- Postman

## Como rodar
```
cd {diretorio do projeto}
npm install
node index.js
```

## Rotas
Eu implementei 14 métodos dos 18, todos por POST e body raw no postman

- bisseção: http://localhost:3000/bissection
- posição falsa: http://localhost:3000/false-position
- newton raphson: http://localhost:3000/newtonRaphson
- secante: http://localhost:3000/secante
- lagrange: http://localhost:3000/lagrange
- forma/polinômio de newton: http://localhost:3000/formaNewton
- spline linear: http://localhost:3000/splineLinear
- intervalo de confiança conhecido: http://localhost:3000/intervaloConfianca/conhecido
- intervalo de confiaça desconhecido: http://localhost:3000/intervaloConfianca/desconhecido
- coeficiente de correlação de kendall: http://localhost:3000/kendall
- coeficiente de correlação de pearson: http://localhost:3000/pearson
- coeficiente de correlação de spearman: http://localhost:3000/spearman
- reamostragem jackknife: http://localhost:3000/jackknife
- reamostragem boostrap: http://localhost:3000/bootstrap
## Funções
Suporta todo tipo de expressão matemática eu acho, a função pode ser escrita como qualquer outra expressão matemática escrita no computador
- log() 
- ln()
- x^n
- 4x (multiplicação implícita)
- e (número de euler, se eu não me engano suporta)
### bisseçao, posição falsa
```
{
	"a": -1,
	"b": 1,
	"e": 0.000001,
	"f": "x^2 + 2x -1"
}
```
- a: chute
- b: chute
- e: erro
- f: função

### newton raphson
```
{
	"xMenosUm": 5,
	"e": 0.000000001,
	"f": "x^2 + 2x -1",
	"derivativa": "2x + 2"
}
```
- xMenosUm: altoexplicativo
- e: erro
- f: função
- derivativa: derivada

### secante
```
{
	"x1": 2,
	"x2": 1,
	"e": 0.0001,
	"f": "x^3 - 9x +3"
}
```
### lagrange, forma/polinômio de newton, spline linear
```
{
	"x":[-1, 0, 1, 2, 3],
	"y":[1, 1, 0, -1, -2]
}
```
### intervalo de confiança conhecido e desconhecido
```
{
	"estimator": 6.22,
	"confidenceLevel": 95,
	"deviation": 2,
	"n": 9
}
```
- estimator: estimador
- confidenceLevel: nível de confiança
- deviation: desvio populacional/amostra
- n: quantidade de elementos

### coeficiente de correlação de kendall, pearson, spearman
```
{
	"x": [71,64,43,67,56,73,68,56,76,65,45,58,45,53,49,78,73,68],
	"y": [82,91,100,68,87,73,78,80,65,84,116,76,97,100,105,77,73,78]
}
```
### reamostragem jackknife e bootstrap
```
{
	"data": [2.2, 2.5, 3.4, 6.7, 6.2, 8.2, 9.2, 7.9, 9.2, 10.1],
	"estimatorString": "media"
}
```
- estimatorString: era pra poder selecionar o estimador, porém eu não implementei a tempo, então só tem média, mas podia ter mais
