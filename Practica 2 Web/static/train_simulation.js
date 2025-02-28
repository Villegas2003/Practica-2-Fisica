document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("trenCanvas");
    const ctx = canvas.getContext("2d");

    // 📌 Parámetros del tren
    let x = 50;  // Posición inicial del tren
    let velocidad = 20;  // Velocidad inicial en m/s
    let aFreno = -0.2;  // Desaceleración en m/s² (más suave para que frene correctamente)
    let aAceleracion = 0.1;  // Aceleración después de la parada en m/s²
    let tiempoParada = 2000;  // Tiempo en ms de la parada (2 seg simulados)
    let fase = "frenado";  // Estado inicial: frenado
    let detenerSimulacion = false;
    let estacionX = canvas.width / 2 - 30;  // Posición de la estación
    let tiempo = 0;

    function actualizarTren() {
        if (detenerSimulacion) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dibujar la vía
        ctx.fillStyle = "black";
        ctx.fillRect(20, canvas.height / 2, canvas.width - 40, 5);

        // Dibujar la estación (punto de parada)
        ctx.fillStyle = "gray";
        ctx.fillRect(estacionX, canvas.height / 2 - 15, 60, 20);

        // 📌 Cambiar color del tren según la fase
        if (fase === "frenado") {
            ctx.fillStyle = "yellow";  // 🟡 Tren amarillo cuando frena
        } else if (fase === "parado") {
            ctx.fillStyle = "blue";  // 🔵 Tren azul cuando está detenido
        } else {
            ctx.fillStyle = "red";  // 🔴 Tren rojo cuando acelera o sigue normal
        }

        ctx.fillRect(x, canvas.height / 2 - 20, 40, 20);

        // 📌 Movimiento del tren
        if (fase === "frenado") {
            velocidad += aFreno;
            if (velocidad <= 0 || x >= estacionX - 5) {  // Asegurar que frena antes de la estación
                velocidad = 0;
                fase = "parado";
                setTimeout(() => { fase = "acelerando"; }, tiempoParada);
            }
        } else if (fase === "acelerando") {
            velocidad += aAceleracion;
        }

        x += velocidad;

        // 📌 Detener la simulación si llega al final
        if (x < canvas.width - 50) {
            requestAnimationFrame(actualizarTren);
        } else {
            detenerSimulacion = true;
        }
    }

    // 📌 Iniciar la simulación cuando se haga clic en el botón
    document.getElementById("btnIniciarSimulacion").addEventListener("click", function () {
        detenerSimulacion = false;
        x = 50;
        velocidad = 20;
        fase = "frenado";
        actualizarTren();
    });

});
