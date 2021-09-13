// Importar Módulo
const child_process = require("child_process");

/*5. Ejecutar la aplicación desde un archivo externo con el módulo child_process
enviando los argumentos correspondientes y devolviendo por consola el contenido
del archivo luego de que haya sido creado.*/

child_process.exec(`node index.js cotizacion txt dolar 250000`, (error, data) => {
  if (error) {
    console.log(`exec error: ${error}`);
    return;
  }

  /*4. Enviar por consola el contenido del archivo luego de que haya sido creado.*/
  console.log(`Resultado: ${data}`);
});
