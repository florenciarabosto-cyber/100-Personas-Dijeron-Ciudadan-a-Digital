
/* 100 PERSONAS DIJERON - CIUDADANÍA DIGITAL */

// Preguntas y respuestas de las primeras dos rondas

const rondas = [
    {
        nombre: "Reconocemos los riesgos",
        pregunta: "¿Cuáles son algunos de los riesgos que podemos encontrar en Internet?",
        respuestas: [
            { texto: "Ciberbullying", puntos: 30, opciones: ["ciberbullying"] },
            { texto: "Grooming", puntos: 20, opciones: ["grooming"] },
            { texto: "Phishing", puntos: 20, opciones: ["phishing"] },
            { texto: "Sexting", puntos: 10, opciones: ["sexting"] },
            { texto: "Stalking", puntos: 10, opciones: ["stalking"] },
            { texto: "Ciberadicción", puntos: 10, opciones: ["ciberadiccion", "adiccion a internet"] }
        ]
    },
    {
        nombre: "¿Cómo nos cuidamos?",
        pregunta: "¿Qué podemos hacer para cuidarnos cuando usamos Internet?",
        respuestas: [
            {
                texto: "No compartir datos personales",
                puntos: 25,
                opciones: ["no compartir datos personales", "cuidar datos personales", "proteger datos personales"]
            },
            {
                texto: "Usar contraseñas seguras",
                puntos: 20,
                opciones: ["usar contraseñas seguras", "contraseñas seguras", "crear contraseñas seguras"]
            },
            {
                texto: "No abrir enlaces sospechosos",
                puntos: 20,
                opciones: ["no abrir enlaces sospechosos", "evitar enlaces sospechosos", "no abrir links sospechosos"]
            },
            {
                texto: "Bloquear o denunciar",
                puntos: 15,
                opciones: ["bloquear", "denunciar", "bloquear o denunciar", "reportar"]
            },
            {
                texto: "No aceptar desconocidos",
                puntos: 10,
                opciones: ["no aceptar desconocidos", "no aceptar personas desconocidas", "rechazar desconocidos"]
            },
            {
                texto: "Pedir ayuda",
                puntos: 10,
                opciones: ["pedir ayuda", "pedir ayuda a un adulto", "hablar con un adulto"]
            }
        ]
    }
];

// Variables

let rondaActual = 0;
let puntos = 0;
let encontradas = [];
let desafioResuelto = false;

// Elementos HTML

const formulario = document.getElementById("formularioJuego");
const entrada = document.getElementById("respuestaUsuario");
const mensaje = document.getElementById("mensaje");
const marcador = document.getElementById("puntos");
const botonSiguiente = document.getElementById("siguiente");
const formularioDesafio = document.getElementById("formularioDesafio");

// Limpiar texto para comparar respuestas

function limpiarTexto(texto) {
    return texto.toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

// Mostrar las rondas 1 y 2

function mostrarRonda() {

    encontradas = [];

    let ronda = rondas[rondaActual];

    document.getElementById("numeroRonda").textContent =
        "RONDA " + (rondaActual + 1);

    document.getElementById("nombreRonda").textContent =
        ronda.nombre;

    document.getElementById("textoPregunta").textContent =
        ronda.pregunta;

    for (let i = 0; i < ronda.respuestas.length; i++) {

        let casillero = document.getElementById("respuesta" + (i + 1));

        casillero.innerHTML =
            (i + 1) + ". ?????????? <span>" +
            ronda.respuestas[i].puntos + "</span>";

        casillero.className = "";
    }

    mensaje.textContent = "";
    mensaje.className = "";

    entrada.value = "";
    entrada.disabled = false;

    document.getElementById("tablero").classList.remove("oculto");
    formulario.classList.remove("oculto");

    document.getElementById("desafioFinal").classList.add("oculto");
    document.getElementById("resultadoFinal").classList.add("oculto");

    botonSiguiente.classList.add("oculto");
}

// Comprobar respuestas de las rondas 1 y 2

function comprobarRespuesta() {

    let respuesta = limpiarTexto(entrada.value);

    if (respuesta === "") {
        mensaje.textContent = "Escribí una respuesta.";
        mensaje.className = "incorrecto";
        return;
    }

    let ronda = rondas[rondaActual];
    let posicion = -1;

    for (let i = 0; i < ronda.respuestas.length; i++) {

        let opciones = ronda.respuestas[i].opciones;

        for (let j = 0; j < opciones.length; j++) {

            if (respuesta === limpiarTexto(opciones[j])) {
                posicion = i;
            }
        }
    }

    if (posicion === -1) {

        mensaje.textContent =
            "Esa respuesta no está en el tablero. Intentá nuevamente.";

        mensaje.className = "incorrecto";
    }

    else if (encontradas.includes(posicion)) {

        mensaje.textContent =
            "Esa respuesta ya fue encontrada. Probá con otra.";

        mensaje.className = "incorrecto";
    }

    else {

        encontradas.push(posicion);

        let respuestaCorrecta = ronda.respuestas[posicion];

        puntos += respuestaCorrecta.puntos;

        marcador.textContent = puntos;

        let casillero = document.getElementById(
            "respuesta" + (posicion + 1)
        );

        casillero.innerHTML =
            (posicion + 1) + ". " +
            respuestaCorrecta.texto.toUpperCase() +
            " <span>" + respuestaCorrecta.puntos + "</span>";

        casillero.classList.add("descubierta");

        mensaje.textContent =
            "¡Respuesta encontrada! Sumaste " +
            respuestaCorrecta.puntos + " puntos.";

        mensaje.className = "correcto";

        if (encontradas.length === ronda.respuestas.length) {

            mensaje.textContent =
                "¡Muy bien! Completaste la ronda. Llevás " +
                puntos + " puntos.";

            entrada.disabled = true;
            formulario.classList.add("oculto");

            botonSiguiente.classList.remove("oculto");
        }
    }

    entrada.value = "";

    if (!entrada.disabled) {
        entrada.focus();
    }
}

// Pasar a la siguiente ronda

function siguienteRonda() {

    rondaActual++;

    if (rondaActual < 2) {
        mostrarRonda();
    } else {
        mostrarDesafio();
    }
}

// Mostrar la tercera ronda

function mostrarDesafio() {

    document.getElementById("numeroRonda").textContent =
        "RONDA 3";

    document.getElementById("nombreRonda").textContent =
        "¿Qué harías?";

    document.getElementById("textoPregunta").textContent =
        "Analizá la siguiente situación y elegí la opción más segura.";

    document.getElementById("tablero").classList.add("oculto");
    formulario.classList.add("oculto");

    document.getElementById("desafioFinal").classList.remove("oculto");

    formularioDesafio.classList.remove("oculto");

    botonSiguiente.classList.add("oculto");

    mensaje.textContent = "";
    mensaje.className = "";

    desafioResuelto = false;

    formularioDesafio.reset();
}

// Comprobar la respuesta de la tercera ronda

function comprobarDesafio() {

    if (desafioResuelto) {
        return;
    }

    let seleccion = document.querySelector(
        'input[name="decision"]:checked'
    );

    if (seleccion === null) {

        mensaje.textContent =
            "Seleccioná una opción antes de responder.";

        mensaje.className = "incorrecto";
        return;
    }

    if (seleccion.value === "c") {

        puntos += 50;
        marcador.textContent = puntos;

        mensaje.textContent =
            "¡Muy bien! Identificaste un intento de phishing. " +
            "No debemos abrir enlaces sospechosos ni compartir datos personales. " +
            "Sumaste 50 puntos.";

        mensaje.className = "correcto";

        desafioResuelto = true;

        // Desactivar las opciones

        let opciones = document.querySelectorAll(
            'input[name="decision"]'
        );

        for (let i = 0; i < opciones.length; i++) {
            opciones[i].disabled = true;
        }

        formularioDesafio.classList.add("oculto");

        mostrarFinal();
    }

    else {

        mensaje.textContent =
            "Cuidado. Los mensajes que ofrecen premios y piden " +
            "datos personales pueden ser engaños. " +
            "Revisá las opciones e intentá nuevamente.";

        mensaje.className = "incorrecto";
    }
}

// Mostrar resultado final

function mostrarFinal() {

    document.getElementById("resultadoFinal")
        .classList.remove("oculto");

    document.getElementById("puntajeFinal").textContent =
        puntos;
}

// Reiniciar todo el juego

function reiniciarJuego() {

    rondaActual = 0;
    puntos = 0;
    encontradas = [];
    desafioResuelto = false;

    marcador.textContent = 0;

    // Volver a habilitar las opciones

    let opciones = document.querySelectorAll(
        'input[name="decision"]'
    );

    for (let i = 0; i < opciones.length; i++) {
        opciones[i].disabled = false;
    }

    formularioDesafio.reset();

    mostrarRonda();
}

// Eventos

formulario.addEventListener("submit", function(event) {
    event.preventDefault();
    comprobarRespuesta();
});

formularioDesafio.addEventListener("submit", function(event) {
    event.preventDefault();
    comprobarDesafio();
});

botonSiguiente.addEventListener("click", siguienteRonda);

document.getElementById("reiniciar")
    .addEventListener("click", reiniciarJuego);

// Iniciar el juego

mostrarRonda();

