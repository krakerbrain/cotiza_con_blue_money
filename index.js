// Se importan módulos
const https = require("https");
const fs = require("fs");

/*1. Recibir por la línea de comando los siguientes argumentos:
a. Nombre del archivo que se creará.
b. Extensión del archivo.
c. Indicador económico que se desea convertir.
d. Cantidad de pesos que se quiere cambiar*/

// Guardar nuevo array en la variable
const argumentos = process.argv.slice(2);

// Variables para cada argumento
let nombre_archivo = argumentos[0];
let extension_archivo = argumentos[1];
let indicador_economico = argumentos[2];
let cantidad_pesos = Number(argumentos[3]);

// 2. Consultar la API con el módulo https y almacenar la respuesta en una variable.

https
  .get("https://mindicador.cl/api", (resp) => {
    resp.on("data", (data) => {
      let indicadores = JSON.parse(data);
      let valor_dolar = indicadores.dolar.valor;

      let valor_convertido = (cantidad_pesos / valor_dolar).toFixed(2);

      /* 3. Crear un archivo con el módulo fs cuyos datos están formados por los argumentos
      recibidos por línea de comando y su contenido basado en el template de la
      descripción.*/

      fs.writeFile(
        `${nombre_archivo}.${extension_archivo}`,
        `A la fecha: ${Date()}\nFue realizada cotización con los siguientes datos:\nCantidad de pesos a convertir: ${cantidad_pesos}\nConvertido a ${indicador_economico} da un total de:\n$${valor_convertido}`,
        "utf8",
        () => {
          console.log("Archivo creado con éxito");

          fs.readFile(`${nombre_archivo}.${extension_archivo}`, "utf8", (err, data) => {
            console.log(`Contenido del archivo:\n${data}`);
          });
        }
      );
    });
  })
  .on("error", (err) => {
    console.log("Error: " + err.message);
  });
