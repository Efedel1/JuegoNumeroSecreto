let numeroSecreto;
let intentos;
let intentosMaximos = 3; // Variable para el número máximo de intentos
let intentosActuales = 0; // Variable para el número de intentos actuales
let numerosSorteados = {}; // Usamos un objeto vacío para almacenar los números sorteados
let numeroMaximo = 10;


function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value);
    document.getElementById("reiniciar").removeAttribute("disabled");
    if (isNaN(numeroDeUsuario) || numeroDeUsuario < 1 || numeroDeUsuario > numeroMaximo) {
        asignarTextoElemento("p", "Ingresa un número válido entre 1 y 10.");

    } else {
        if (numeroDeUsuario === numeroSecreto) {
            asignarTextoElemento("p", `¡Acertaste el número en ${intentos} ${(intentos === 1) ? "vez" : "veces" }`);
        } else if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento("p", "El número secreto es menor.");
        } else {
            asignarTextoElemento("p", "El número secreto es mayor.");
            
        }

        intentos++;
        intentosActuales++; // Incrementamos el número de intentos actuales
        // Comprobamos si se ha alcanzado el límite de intentos
        if (intentosActuales >= intentosMaximos) {
          // Mostramos un mensaje al usuario y deshabilitamos el botón de verificar
          asignarTextoElemento("p", `Has alcanzado el límite de ${intentosMaximos} intentos. No puedes seguir jugando.`);
          document.getElementById("validar").setAttribute("disabled", "true");
        }
    }
    
    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario');
}

function generarNumeroSecreto() {
    let numeroGenerado;

    // Usamos un bucle while para generar el número secreto
    do {
      // Generamos un número aleatorio entre 1 y el número máximo
      numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
      // Repetimos el bucle mientras el número generado esté en el objeto de números sorteados
    } while (numerosSorteados[numeroGenerado]);

    // Añadimos el número generado al objeto de números sorteados
    // Usamos el número como clave y le asignamos un valor cualquiera, por ejemplo true
    numerosSorteados[numeroGenerado] = true;

    // Devolvemos el número generado
    return numeroGenerado;
}

function condicionesIniciales() {
    asignarTextoElemento("H1", "Juego del Numero Secreto (JNS)");
    asignarTextoElemento("p",  `Dame un número del 1 al ${numeroMaximo}` );
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego() {
    limpiarCaja();
    condicionesIniciales();
    document.querySelector("#reiniciar").setAttribute("disabled", "true");
    intentosActuales = 0; // Reiniciamos el número de intentos actuales
    document.getElementById("validar").removeAttribute("disabled"); // Habilitamos el botón de verificar
}

condicionesIniciales();
