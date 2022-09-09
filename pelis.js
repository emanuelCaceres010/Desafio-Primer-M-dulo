const fs= require('fs');

const datos= fs.readFileSync(__dirname + "/pelis.json").toString();

const getAll = function (){
     return JSON.parse(datos);
};

const sortBy = function(properties, arrayDePelis){
    const filtroDePelisPorPropiedad= arrayDePelis.sort(function (a,b){
        if (a[properties] > b[properties]){
            return 1;
        }
        if (a[properties] < b[properties]){
            return -1;
        }
        return 0;
    });
    return filtroDePelisPorPropiedad;
}  ;

const searchBy= function(textos, arrayDePelis){
    const filtroDePelisPorTexto= arrayDePelis.filter(function (item){
        return item["title"].toLowerCase().includes(textos.toLowerCase())
    });
    return filtroDePelisPorTexto;
};
   
const searchByTag= function (textos, arrayDePelis){
    const filtroDePelisPorTag = arrayDePelis.filter(function (item){
        return item["tags"].includes(textos.toLowerCase())
    });
    return filtroDePelisPorTag;
};

const searchWithNoFormat= function(arrayDePelis){
    const arraySinFormato= JSON.stringify(arrayDePelis);
    return arraySinFormato;
};

exports.funcionesDeBusqueda= function (criteriosDeBusqueda) {
    var resultado= getAll();

    if (criteriosDeBusqueda.sort){
        resultado= sortBy(criteriosDeBusqueda.sort, resultado);
    }
    if (criteriosDeBusqueda.search){
        resultado= searchBy(criteriosDeBusqueda.search, resultado);
    }
    if (criteriosDeBusqueda.tag){
        resultado= searchByTag(criteriosDeBusqueda.tag, resultado);
    }
    if (criteriosDeBusqueda.hasOwnProperty("no-format")){
        resultado= searchWithNoFormat(resultado);
    };
    return resultado;
};
