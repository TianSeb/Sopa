//posiciones de palabras

var altura = 4;
var ancho = 4;
const abc = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","U","V","W","X","Y","Z"];
var direcciones = ["H","HB","V","VB","DD","DDB","DI","DIB"];
var sopa1 = [["T","E","L","O"],["E","L","L","L"],["O","L","E","O"],["O","L","E","O"]];
var sopa2 = [["I","O"],["O","I"]];
var sopa3 = [["E"],["N"]];
var sopa4 = [["M","A","L","T"],["I","I","E","E"],["E","A","I","T"],["L","M","M","L"],["L","E","I","M"]];
var palabra1 = [["E","L","O"]];
var palabra2 = [["I","O"]];
var palabra3 = [["E"]];
var palabra4 = [["M","I","E","L"]];
var palabras = new Array(palabra1,palabra2,palabra3,palabra4);
var sopas = new Array(sopa1,sopa2,sopa3,sopa4);

var movimiento = {
    H: function(x,y) { return {x: x+1, y: y}; },
    HB: function(x,y) { return {x: x-1, y: y}; },
    V: function(x,y) { return {x: x, y: y+1}; },
    VB:function(x,y) { return {x: x, y: y-1}; },
    DD:function(x,y) { return {x: x+1, y: y+1}; },
    DDB:function(x,y) { return {x: x-1, y: y-1}; },
    DDI:function(x,y) { return {x: x-1, y: y+1}; },
    DDIB: function(x,y) { return {x: x+1, y: y-1}; }
}

var posPosibles = {
    H:function(sopa,palabra) { return {maxX:(sopa[0].length-1)-(palabra[0].length -1), maxY: (sopa.length-1), minX:0, minY:0}; },
    HB:function(sopa,palabra) { return {maxX: (sopa[0].length-1)-(palabra[0].length -1), maxY: (sopa.length-1), minX:(sopa[0].length-1), minY:0}; },
    V:function(sopa,palabra) { return {maxX: (sopa[0].length-1), maxY: (sopa.length-1)-(palabra[0].length-1), minX:0, minY:0}; },
    VB:function(sopa,palabra) { return {maxX: (sopa[0].length-1), maxY: (sopa.length-1)-(palabra[0].length-1), minX:0, minY:(sopa.length-1)}; },
    DD:function(sopa,palabra) { return {maxX: (sopa[0].length-1)-(palabra[0].length -1), maxY: (sopa.length-1)-(palabra[0].length-1), minX:0, minY:0}; },
    DDB:function(sopa,palabra) { return {maxX: (sopa[0].length-1)-(palabra[0].length -1), maxY: (sopa.length-1)-(palabra[0].length-1), minX:(sopa[0].length-1), minY:(sopa.length-1)}; },
    DI:function(sopa,palabra) { return {maxX: (sopa[0].length-1)-(palabra[0].length -1), maxY: (sopa.length-1)-(palabra[0].length-1), minX:(sopa[0].length-1), minY:0}; },
    DIB:function(sopa,palabra) { return {maxX: (sopa.length-1)-(palabra[0].length-1), maxY: (sopa.length-1)-(palabra[0].length-1), minX:0, minY:(sopa.length-1)}; },
}

var orientaciones = {
    H: function(x,y) { return {x: x+1, y: y}; },
    HB: function(x,y) { return {x: x-1, y: y}; },
    V: function(x,y) { return {x: x, y: y+1}; },
    VB:function(x,y) { return {x: x, y: y-1}; },
    DD:function(x,y) { return {x: x+1, y: y+1}; },
    DDI:function(x,y) { return {x: x+1, y: y-1}}, //Diagonal Derecha Invertida
    DI:function(x,y) { return {x: x-1, y: y+1}; },
    DII: function(x,y) { return {x: x+1, y: y-1}; } //Diagonal Izquierda Invertida
}

function getRandomInt(min, max) { // función para calcular random
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function crearSopa(altura,ancho,sopa){ //crea una sopa con las medidas y la completa con números 1
    
    for(let y=0;y<altura;y++){
        sopa[y] = new Array(ancho);
    }
    for (var i = 0; i < altura; i++) { 
        for (var j = 0; j < ancho; j++) { 
            sopa[i][j] = 1;
        } 
    } 
    return sopa;
}

function separarPalabras(palabras){ // separa las letras de la palabra 
    let newArray = [];
    for(let i = 0; i < palabras.length; i++){
        newArray[i] = palabras[i].split("");
    }
    return newArray;
}

// Devuelve una posición aleatoria x:,y: / y el índice de la orientación.
function calcPosicion (sopa,palabra) {
    let dirInicial = direcciones[Math.floor(Math.random() * direcciones.length)];
    let posicionInicial = (Object.values(posPosibles))[direcciones.indexOf(dirInicial)];
    let posiciones ={
        x:getRandomInt((posicionInicial(sopa,palabra).minX),(posicionInicial(sopa,palabra).maxX)),
        y:getRandomInt((posicionInicial(sopa,palabra).minY),(posicionInicial(sopa,palabra).maxY)),
        dir_inicio: (direcciones.indexOf(dirInicial))
    }
    return posiciones;
}

function creadoraPrincipal(sopa,palabra){ // pone una palabra en una posición random en la sopa.
    let datos_inicio = calcPosicion(sopa,palabra);
    let x = (datos_inicio.x);
    let y = (datos_inicio.y);
    let desplazamiento = datos_inicio.dir_inicio;
    let movLetra = (Object.values(movimiento))[desplazamiento];

     for(i=0;i < palabra[0].length;i++){
        sopa[y][x] = palabra[0][i];
        x = movLetra(x,y).x;
        y = movLetra(x,y).y;
    } 
    return sopa;
}

function consolidarArray(arr1,arr2){ // Función para unir dos arrays en las funciones de búsqueda.
    let arrayConsolidado = [];
    for(y=0;y < arr1.length;y++){
        arrayConsolidado[y] = new Array();
        for(x=0; x < arr1[y].length;x++){
            arrayConsolidado[y][x]=(arr1[y][x]);
        }
    }
    
    for(t=0,y=arr1.length;y < (arr1.length + arr2.length);y++,t++){
        arrayConsolidado[y] = new Array();
        for(x=0; x < arr2[t].length;x++){
            arrayConsolidado[y][x]=(arr2[t][x]);
        }
    }
    return arrayConsolidado;
}

// Funciones de búsqueda por orientación.
function buscaDDI(sopa,palabra){
    let DAD_1 = new Array();
    let DAD_2 = new Array();
    let sl = sopa.length;
    let sw = sopa[0].length;
    let col = 0;
    let posInicial_x = 0;
    let posInicial_y = 0;
    let pos2Loop_x = 1;
    let pos2Loop_y = sl-1;

    for(k=posInicial_y;k <= sl-1;k++){
        DAD_1[col] = new Array();
        y=k;
        x=posInicial_x;
        while(y >=0){
            DAD_1[col].push(sopa[y][x]);
            y = y - 1;
            x = x + 1;
        }
        col++;
    }
    col = 0;
    for(k=pos2Loop_x;k <=sw-1;k++){
        DAD_2[col] = new Array();
        y=pos2Loop_y;
        x=k;
        while(x <= sw-1){
            DAD_2[col].push(sopa[y][x]);
            y = y - 1;
            x = x + 1;
        }
        col++;
    }
    let DadArray = consolidarArray(DAD_1,DAD_2).filter(e => e.length >= palabra[0].length); // Cambiar el tema de la palabra (ahora es 1 sola)
    return DadArray;
}    

function buscaDD(sopa,palabra){
    let DAD_1 = new Array();
    let DAD_2 = new Array();
    let sl = sopa.length;
    let sw = sopa[0].length;
    let col = 0;
    let posInicial_x = 0;
    let posInicial_y = sl-1;
    let pos2Loop_x = 1;
    let pos2Loop_y = 0;

    for(k=posInicial_y;k >= 0;k--){
        DAD_1[col] = new Array();
        y=k;
        x=posInicial_x;
        while(y <= sl-1){
            DAD_1[col].push(sopa[y][x]);
            y = y + 1;
            x = x + 1;
        }
        col++;
    }
    col = 0;
    for(k=pos2Loop_x;k <=sw-1;k++){
        DAD_2[col] = new Array();
        y=pos2Loop_y;
        x=k;
        while(x <= sw-1){
            DAD_2[col].push(sopa[y][x]);
            y = y + 1;
            x = x + 1;
        }
        col++;
    }
    let DadArray = consolidarArray(DAD_1,DAD_2).filter(e => e.length >= palabra[0].length); // Cambiar el tema de la palabra (ahora es 1 sola)
    return DadArray;
}    

function buscaDI(sopa,palabra){
    let DAD_1 = new Array();
    let DAD_2 = new Array();
    let sl = sopa.length;
    let sw = sopa[0].length;
    let col = 0;
    let posInicial_x = sw-1;
    let posInicial_y = sl-1;
    let pos2Loop_x = sw-2;
    let pos2Loop_y = 0;

    for(k=posInicial_y;k >= 0;k--){
        DAD_1[col] = new Array();
        y=k;
        x=posInicial_x;
        while(y <= sl-1){
            DAD_1[col].push(sopa[y][x]);
            y = y + 1;
            x = x - 1;
        }
        col++;
    }
    col = 0;
    for(k=pos2Loop_x;k >= 0;k--){
        DAD_2[col] = new Array();
        y=pos2Loop_y;
        x=k;
        while(x >= 0){
            DAD_2[col].push(sopa[y][x]);
            y = y + 1;
            x = x - 1;
        }
        col++;
    }
    let DadArray = consolidarArray(DAD_1,DAD_2).filter(e => e.length >= palabra[0].length); // Cambiar el tema de la palabra (ahora es 1 sola)
    return DadArray;
}    

function buscaDII(sopa,palabra){
    let DAD_1 = new Array();
    let DAD_2 = new Array();
    let sl = sopa.length;
    let sw = sopa[0].length;
    let col = 0;
    let posInicial_x = sw-1;
    let posInicial_y = 0;
    let pos2Loop_x = sw-2;
    let pos2Loop_y = sl-1;

    for(k=posInicial_y;k <= sl-1;k++){
        DAD_1[col] = new Array();
        y=k;
        x=posInicial_x;
        while(y >= 0){
            DAD_1[col].push(sopa[y][x]);
            y = y - 1;
            x = x - 1;
        }
        col++;
    }
    col = 0;
    for(k=pos2Loop_x;k >= 0;k--){
        DAD_2[col] = new Array();
        y=pos2Loop_y;
        x=k;
        while(x >= 0){
            DAD_2[col].push(sopa[y][x]);
            y = y - 1;
            x = x - 1;
        }
        col++;
    }
    let DadArray = consolidarArray(DAD_1,DAD_2).filter(e => e.length >= palabra[0].length); // Cambiar el tema de la palabra (ahora es 1 sola)
    return DadArray;
}    

function buscaHI(sopa,palabra){
    let DAD_1 = new Array();
    let sl = sopa.length;
    let sw = sopa[0].length;
    let col = 0;
    let posInicial_x = sw-1;
    let posInicial_y = 0;

    for(k=posInicial_y;k <= sl-1;k++){
        DAD_1[col] = new Array();
        y=k;
        x=posInicial_x;
        while(x >= 0){
            DAD_1[col].push(sopa[y][x]);
            y = y;
            x = x - 1;
        }
        col++;
    }
    let DadArray = DAD_1.filter(e => e.length >= palabra[0].length); // Cambiar el tema de la palabra (ahora es 1 sola)
    return DadArray;
}    

function buscaV(sopa,palabra){
    let DAD_1 = new Array();
    let sl = sopa.length;
    let sw = sopa[0].length;
    let col = 0;
    let posInicial_x = 0;
    let posInicial_y = 0;

    for(k=posInicial_y;k <= sw-1;k++){
        DAD_1[col] = new Array();
        y=posInicial_y;
        x=k;
        while(y <= sl-1){
            DAD_1[col].push(sopa[y][x]);
            y = y + 1;
            x = x;
        }
        col++;
    }
    let DadArray = DAD_1.filter(e => e.length >= palabra[0].length); // Cambiar el tema de la palabra (ahora es 1 sola)
    return DadArray;
}    

function buscaVI(sopa,palabra){
    let DAD_1 = new Array();
    let sl = sopa.length;
    let sw = sopa[0].length;
    let col = 0;
    let posInicial_x = 0;
    let posInicial_y = sl-1;

    for(k=posInicial_x;k <= sw-1;k++){
        DAD_1[col] = new Array();
        y=posInicial_y;
        x=k;
        while(y >= 0){
            DAD_1[col].push(sopa[y][x]);
            y = y - 1;
            x = x;
        }
        col++;
    }
    let DadArray = DAD_1.filter(e => e.length >= palabra[0].length); // Cambiar el tema de la palabra (ahora es 1 sola)
    return DadArray;
}    

function cuentaPalabra(array,palabra){ // Le paso un array ya filtrado y la palabra a buscar. Me devuelve un número de veces que encontró la palabra.
    let p = array;
    let w = palabra[0];
    let letra = 0;
    let contadorPalabra = 0;
    for(y=0;y < p.length;y++){
        for(x=0; x < p[y].length;x++){
            if(p[y][x] == w[letra]){
                letra++;
                }
            else {
                letra = 0;
            }
                if(letra == w.length){
                contadorPalabra++;
                letra = 0;
                }
        }
        letra = 0;
    }
    return contadorPalabra;
}

function buscadora(sopa,palabra){ // Con esta función unifico la búsqueda y le pongo condicionales para casos específicos.
    let suma = 0;
    if ((sopa.length-1 > 0) && (sopa[0].length-1 > 0)) {
        let DDI = cuentaPalabra(buscaDDI(sopa,palabra),palabra);
        let DD = cuentaPalabra(buscaDD(sopa,palabra),palabra);
        let DI = cuentaPalabra(buscaDI(sopa,palabra),palabra);
        let DII = cuentaPalabra(buscaDII(sopa,palabra),palabra);
        let H = (cuentaPalabra(sopa,palabra)); // El horizontal no necesita armar arrays.
        let HI = cuentaPalabra(buscaHI(sopa,palabra),palabra);
        let V = cuentaPalabra(buscaV(sopa,palabra),palabra);
        let VI = cuentaPalabra(buscaVI(sopa,palabra),palabra);
        suma = DDI+DD+DI+DII+H+HI+V+VI;
    }
    else if ((sopa.length-1 > 0) && (sopa[0].length-1 == 0)){
        let V = cuentaPalabra(buscaV(sopa,palabra),palabra);
        let VI = cuentaPalabra(buscaVI(sopa,palabra),palabra);
        suma = V+VI;
    }
    else if((sopa.length-1 == 0) && (sopa[0].length-1 > 0)){
        let H = (cuentaPalabra(sopa,palabra)); // El horizontal no necesita armar arrays.
        let HI = cuentaPalabra(buscaHI(sopa,palabra),palabra);
        suma = H+HI;
    }

    let palabrita = new String(palabra);
    if(suma>0){
        return `la palabra ${palabrita.replace(/,/g,"")}, se ah encontrado ${suma} veces`
    }
    else {
        return `No se encontró la palabra ${palabrita.replace(/,/g,"")} en la sopa, proba en otra chamigo`
    }
}

for(let z=0;z < sopas.length;z++){ //Loopeo para testear las sopas prueba
    a = sopas[z];
    b = palabras[z];
    console.log(a);
    console.log("");
    console.log(b);
    console.log("");
    console.log(buscadora(a,b));
}

