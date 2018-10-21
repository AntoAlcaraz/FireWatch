/**
 * JS para controlar la pantalla principal, mostrara dos pestanas. 
 * Una lista con las notificaciones creadas y que pueden ser consultadas y un mapa del terreno con esas mismas notificaciones
 */
var page_detalle = (function() {
    
    function rellenarForm() {

        var datos = gestorDatos.getNotificacionActual();

        $('#regionZona').text("Latitud: " + datos.lat + ", Longitud: "+ datos.lon);

        util.traducirCoordenadas(datos.lat, datos.lon, 'regionZona');

        $('#FechaHora').text(datos.fecha + " " + datos.hora);
        $('#coment').text(datos.comentario);

    }

    return {
        rellenarForm: rellenarForm
    }

})(page_detalle || {});
