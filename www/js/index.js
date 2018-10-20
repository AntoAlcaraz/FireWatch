var index = {};
index = (function() {

    $(document).delegate('#index', 'pageCreate', function() {

        document.addEventListener('deviceready', function() {

            util.setUUID(function() {
                //una vez activado el usuario, obtenemos todos las notificaciones del servidor
                cargaFuegosNotificados_List(function() {
                    cargarListado();
                    cargaMapa();
                });
            });
        }, false);
    });

    var cargaFuegosNotificados_List = function (callback){

        var callbackList = function (datosNotificaciones){
            gestorDatos.setNotificaciones(datosNotificaciones);
            if(callback){
                callback();
            }
        }

        Services.ServiciosAJAX("getFuegos", "", callbackList);
    }

    var cargaMapa = function (){
        var map = L.map('map').setView([41.66, -4.72], 15);
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'OpenStreetMap',
            maxZoom: 18
        }).addTo(map);

        L.control.scale().addTo(map);

        var listaCompleta = gestorDatos.getNotificaciones();
        var limite = (listaCompleta.data.length > 20) ? 20 : listaCompleta.data.length;

        for(var x=0; x < limite; x++) {
            L.marker([listaCompleta.data[x].lat, listaCompleta.data[x].lon],{}).addTo(map);
        }

    }

    var cargarListado = function (){
        var listaCompleta = gestorDatos.getNotificaciones();

        var limite = (listaCompleta.data.length > 20) ? 20 : listaCompleta.data.length;

        var cList = $('#listadoNotificaciones');

        for(var x=0; x < limite; x++){

            var li = $('<li/>')
                //.addClass('ui-menu-item')
                //.attr('role', 'menuitem')
                .appendTo(cList);
            var aaa = $('<a/>')
                //.addClass('ui-all')
                //.text(countries[i])
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

    }

})();