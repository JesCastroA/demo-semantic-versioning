function saludar(nombre) {
    if (!nombre) return "Hola, desconocido!";
  return `Hola, ${nombre}!`;
}

function despedir(nombre) {
   return `Adios, ${nombre}!`; 
}

console.log(saludar("estudiante"));