const funciones= require("./pelis.js")

function parsear(argv) {
   const obj = {};
   argv.forEach(function(item,ind){
      if (item.startsWith("--")){
         const quitarGuion=item.slice(2);
         const masUnaPosicion=argv[ind +1];
         return (obj[quitarGuion]=masUnaPosicion);
      };
   });
   return obj;
};

function main(){
   const funcionesPars = parsear(process.argv.slice(2));
   const PELIS = funciones.funcionesDeBusqueda(funcionesPars) 
   console.table(PELIS);
};
main();
