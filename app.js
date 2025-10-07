const operaciones = ["sumar", "restar", "multiplicar", "dividir"];
let historial = [];
function solicitarDatos() {
  let num1 = parseFloat(prompt("Ingresa el primer número:"));
  let num2 = parseFloat(prompt("Ingresa el segundo número:"));

  // Validación
  if (isNaN(num1) || isNaN(num2)) {
    alert("Uno o ambos valores no son números. Intenta nuevamente.");
    return null;
  }

  return [num1, num2];
}
function calcularOperacion(num1, num2, operacion) {
  let resultado;

  switch (operacion) {
    case "sumar":
      resultado = num1 + num2;
      break;
    case "restar":
      resultado = num1 - num2;
      break;
    case "multiplicar":
      resultado = num1 * num2;
      break;
    case "dividir":
      if (num2 === 0) {
        alert("No se puede dividir por cero.");
        return null;
      }
      resultado = num1 / num2;
      break;
    default:
      alert("Operación no válida.");
      return null;
  }
   historial.push(`${num1} ${operacion} ${num2} = ${resultado}`);
  return resultado;
}
function mostrarHistorial() {
  if (historial.length === 0) {
    console.log("No hay operaciones realizadas aún.");
  } else {
    console.log("Historial de operaciones:");
    historial.forEach((op, index) => {
      console.log(`${index + 1}. ${op}`);
    });
  }
}
function iniciarCalculadora() {
  alert("Bienvenido/a a la Calculadora");

  let continuar = true;

  while (continuar) {
    let operacion = prompt(`¿Qué operación deseas realizar?\nOpciones: ${operaciones.join(", ")}`).toLowerCase();

    if (!operaciones.includes(operacion)) {
      alert("Operación no reconocida. Intenta nuevamente.");
      continue;
    }

    const datos = solicitarDatos();
    if (!datos) continue;

    const [num1, num2] = datos;
    const resultado = calcularOperacion(num1, num2, operacion);

    if (resultado !== null) {
      alert(`El resultado de ${operacion} ${num1} y ${num2} es: ${resultado}`);
      console.log(`Resultado: ${resultado}`);
    }

    continuar = confirm("¿Deseas realizar otra operación?");
  }

  mostrarHistorial();
  alert("Gracias por usar la Calculadora.");
}

// Ejecutar el simulador
iniciarCalculadora();
