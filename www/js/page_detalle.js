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

    function abrirMapa(){
    var datos = gestorDatos.getNotificacionActual();
    var coord = datos.lat+','+datos.lon;
        page_insert.getCoords(function(res){
            window.open("geo:"+coord );
        });
    }

    return {
        rellenarForm: rellenarForm,
        abrirMapa: abrirMapa
    }

})(page_detalle || {});
