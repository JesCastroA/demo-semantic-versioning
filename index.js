function saludar(nombre) {
    if (!nombre) return "Hola, desconocido!";
  return `Hola, ${nombre}!`;
}

console.log(saludar("estudiante"));