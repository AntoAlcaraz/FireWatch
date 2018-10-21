var index = {};
index = (function() {

    $(document).on("pagebeforeshow","#page_detalle",function(){
        page_detalle.rellenarForm();
    });

    $(document).on("pageshow","#mainScreen",function(){
        cargaMapa();
    });

    var cargaFuegosNotificados_List = function (callback){

        Services.ServiciosAJAX("getFuegos", "", function (datosNotificaciones) {
            gestorDatos.setNotificaciones(datosNotificaciones);
         
            cargarListado();

        });

    }

    var cargaMapa = function (){

        page_insert.getCoords(function(coords) {

            console.log(coords);

            var map = L.map('mapContainer', {preferCanvas: true}).setView([coords.lat, coords.long], 5);
            L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'OpenStreetMap',
                maxZoom: 18
            }).addTo(map);

            L.control.scale().addTo(map);

            var listaCompleta = gestorDatos.getNotificaciones();
            var limite = (listaCompleta.data.length > 500) ? 500 : listaCompleta.data.length;

            for(var x=0; x < limite; x++) {
                L.marker([listaCompleta.data[x].lat, listaCompleta.data[x].lon],{}).addTo(map);
            }
        });

    }

    var cargarListado = function (){
        var listaCompleta = gestorDatos.getNotificaciones();

        var limite = (listaCompleta.data.length > 500) ? 500 : listaCompleta.data.length;

        var cList = $('#listadoNotificaciones');

        for(var x=0; x < limite; x++){

            var li = $('<li/>')
                //.addClass('ui-menu-item')
                //.attr('role', 'menuitem')
                .appendTo(cList);
            var aaa = $('<a/>')
                //.addClass('ui-all')
                .attr('onClick', 'util.irADetalle('+listaCompleta.data[x].id+')')
                .appendTo(li);
            var h2 = $('<h2/>')
                //.addClass('ui-all')
                .text("LAT: "+listaCompleta.data[x].lat+" - LONG: "+listaCompleta.data[x].lon)
                .appendTo(aaa);
            var p = $('<p/>')
                //.addClass('ui-all')
                .text(listaCompleta.data[x].comentario)
                .appendTo(aaa);
        }

        $('#listadoNotificaciones').listview( "refresh" );
    }

    return {
        cargaFuegosNotificados_List: cargaFuegosNotificados_List
    }

})();


document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    util.setUUID(function() {
        //una vez activado el usuario, obtenemos todos las notificaciones del servidor
        index.cargaFuegosNotificados_List();

    });
}