$(document).ready(function () {
    $("#problema").change(function () {
        let inputs = $("#inputs");
        let descripcion = $("#descripcion");
        let resultado = $("#resultado");
        let btnSimulacion = $("#btnSimulacion"); // Botón de simulación

        // Limpiar el contenido del área de resultados al cambiar de problema
        resultado.html("").addClass("d-none");

        inputs.html("");
        descripcion.html("");

        let problemaSeleccionado = $(this).val();

        if (problemaSeleccionado === "1") {
            descripcion.html("Se calcula el tiempo que tarda un impulso nervioso en viajar al cerebro. <br>" +
                "<b>Fórmula:</b> t = distancia / velocidad. <br>" +
                "<b>Velocidad:</b> 100 m/s. Puedes modificar la distancia.");
            inputs.html(`<label for="distancia" class="form-label">Distancia (m):</label>
                         <input type="number" step="any" name="distancia" class="form-control" required value="1.5">`);
        } 
        
        else if (problemaSeleccionado === "2") {
            descripcion.html("Calcula el tiempo que tarda en crecer el cabello desde un largo inicial hasta un largo final.<br>" +
                "<b>Tasa de crecimiento:</b> 2 cm/mes. Puedes modificar las longitudes.");
            inputs.html(`<label for="longitud_inicial" class="form-label">Longitud inicial (cm):</label>
                         <input type="number" step="any" name="longitud_inicial" class="form-control" required value="1.5">
                         <label for="longitud_final" class="form-label">Longitud final (cm):</label>
                         <input type="number" step="any" name="longitud_final" class="form-control" required value="3.5">`);
        } 
        
        else if (problemaSeleccionado === "3") {
            descripcion.html("Calcula el tiempo y la aceleración de un electrón en un tubo de rayos catódicos.<br>" +
                "<b>Velocidad inicial:</b> 2.00 × 10⁴ m/s <br> <b>Velocidad final:</b> 6.00 × 10⁶ m/s <br> " +
                "<b>Distancia recorrida:</b> 1.50 cm. Estos valores son fijos.");
        } 
        
        else if (problemaSeleccionado === "4") {
            descripcion.html("Calcula la distancia final entre dos carritos que aceleran en direcciones opuestas.<br>" +
                "Puedes modificar la aceleración y el tiempo.");
            inputs.html(`
                <label for="d_inicial" class="form-label"><b>Distancia inicial (m):</b></label>
                <input type="number" step="any" name="d_inicial" class="form-control" required value="10">

                <label for="a1" class="form-label mt-2"><b>Aceleración carrito 1 (m/s²):</b></label>
                <input type="number" step="any" name="a1" class="form-control" required value="2.0">

                <label for="a2" class="form-label mt-2"><b>Aceleración carrito 2 (m/s²):</b></label>
                <input type="number" step="any" name="a2" class="form-control" required value="1.0">

                <label for="t" class="form-label mt-2"><b>Tiempo (s):</b></label>
                <input type="number" step="any" name="t" class="form-control" required value="3.0">
            `);
        } 
        
        else if (problemaSeleccionado === "5") {
            descripcion.html("Calcula el tiempo total perdido por la parada de un tren.<br>" +
                "<b>Velocidad inicial:</b> 72 km/h <br> " +
                "<b>Desaceleración:</b> -1.0 m/s² <br> " +
                "<b>Aceleración después de la parada:</b> 0.5 m/s² <br> " +
                "<b>Tiempo de parada:</b> 2 min. Estos valores son fijos.");
            
            // Mostrar el botón de simulación cuando se seleccione el problema 5
            btnSimulacion.removeClass("d-none");
        } else {
            // Ocultar el botón si se elige otro problema
            btnSimulacion.addClass("d-none");
        }
    });

    $("#calculoForm").submit(function (event) {
        event.preventDefault();

        $.ajax({
            type: "POST",
            url: "/calcular",
            data: $(this).serialize(),
            success: function (response) {
                $("#resultado").removeClass("d-none").html(response.mensaje);
            }
        });
    });
});
