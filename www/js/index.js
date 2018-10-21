var index = {};
index = (function() {

    $(document).on("pagebeforeshow","#page_detalle",function(){
        page_detalle.rellenarForm();
    });

    $(document).on("pageshow","#mainScreen",function(){
        //Activamos el usuario contra el server
        Services.ServiciosAJAXusuario(function() {
            cargaFuegosNotificados_List();
        });
    });

    var cargaFuegosNotificados_List = function (callback){

        Services.ServiciosAJAX("getFuegos", "", function (datosNotificaciones) {
            gestorDatos.setNotificaciones(datosNotificaciones);
         
            cargarListado();

            cargaMapa();

        });

    }

    var cargaMapa = function (){

        page_insert.getCoords(function(coords) {

            console.log(coords);

            var map = L.map('mapContainer', {preferCanvas: true}).setView([coords.lat, coords.lon], 5);
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

        if(!listaCompleta || !listaCompleta.data || listaCompleta.data.length === 0){
            return;
        }

        var limite = (listaCompleta.data.length > 20) ? 20 : listaCompleta.data.length;

        var cList = $('#listadoNotificaciones');

        for(var x=0; x < limite; x++){


            var idLista = 'Noti_'+listaCompleta.data[x].lat+'_'+listaCompleta.data[x].lon;
            idLista = idLista.replace('.','').replace('.','');

            var li = $('<li/>')
                .appendTo(cList);
            var aaa = $('<a/>')
                .attr('onClick', 'util.irADetalle('+listaCompleta.data[x].id+')')
                .appendTo(li);
            var h2 = $('<h2/>')
                .attr('id',idLista)
                .text("LAT: "+listaCompleta.data[x].lat+" - LONG: "+listaCompleta.data[x].lon)
                .appendTo(aaa);
            var p = $('<p/>')
                .text(listaCompleta.data[x].comentario)
                .appendTo(aaa);

            util.traducirCoordenadas(listaCompleta.data[x].lat, listaCompleta.data[x].lon, idLista);
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