function saludar({ nombre, idioma }) {
    if (!nombre) return "Hola, desconocido!";
    if (!idioma === "en") return "Hello, ${nombre]!";
  return `Hola, ${nombre}!`;
}

function despedir(nombre) {
   return `Adios, ${nombre}!`; 
}

console.log(saludar({nombre: "estudiante", idioma: "es" }));