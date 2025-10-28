const operaciones = ["sumar", "restar", "multiplicar", "dividir"];
let historial = JSON.parse(localStorage.getItem("historial")) || [];

// ===== EVENTOS PRINCIPALES =====
document.addEventListener("DOMContentLoaded", () => {
  const btnCalcular = document.getElementById("btnCalcular");
  const btnLimpiar = document.getElementById("btnLimpiar");

  mostrarHistorial();

  btnCalcular.addEventListener("click", () => {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const operacion = document.getElementById("operacion").value;
    const resultadoDiv = document.getElementById("resultado");

    // Validación
    if (isNaN(num1) || isNaN(num2)) {
      resultadoDiv.textContent = "⚠️ Por favor, ingresa números válidos.";
      return;
    }

    const resultado = calcularOperacion(num1, num2, operacion);

    if (resultado !== null) {
      resultadoDiv.textContent = `Resultado: ${num1} ${simboloOperacion(operacion)} ${num2} = ${resultado}`;
      guardarHistorial(num1, num2, operacion, resultado);
      mostrarHistorial();
    }
  });

  btnLimpiar.addEventListener("click", () => {
    historial = [];
    localStorage.removeItem("historial");
    mostrarHistorial();
    document.getElementById("resultado").textContent = "";
  });
});

// ===== FUNCIONES =====
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
        document.getElementById("resultado").textContent = "❌ No se puede dividir por cero.";
        return null;
      }
      resultado = num1 / num2;
      break;
    default:
      document.getElementById("resultado").textContent = "❌ Operación no válida.";
      return null;
  }

  return resultado;
}

function guardarHistorial(num1, num2, operacion, resultado) {
  const registro = {
    operacion: `${num1} ${simboloOperacion(operacion)} ${num2} = ${resultado}`,
    fecha: new Date().toLocaleString()
  };
  historial.push(registro);
  localStorage.setItem("historial", JSON.stringify(historial));
}

function mostrarHistorial() {
  const lista = document.getElementById("listaHistorial");
  lista.innerHTML = "";

  if (historial.length === 0) {
    lista.innerHTML = "<li>No hay operaciones registradas.</li>";
    return;
  }

  historial.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.operacion} (${item.fecha})`;
    lista.appendChild(li);
  });
}

function simboloOperacion(operacion) {
  switch (operacion) {
    case "sumar": return "+";
    case "restar": return "-";
    case "multiplicar": return "×";
    case "dividir": return "÷";
  }
}
