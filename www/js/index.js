var index = {};
index = (function() {

    var fireIcon = L.icon({
        iconUrl: 'img/logo.png',

        iconSize:     [20, 40] /*, // size of the icon
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor*/
    });

    $(document).on("pagebeforeshow","#page_detalle",function(){
        page_detalle.rellenarForm();
    });

    $(document).on("pageshow","#mainScreen",function(){

        setTimeout(function() {
            //Activamos el usuario contra el server
            Services.ServiciosAJAXusuario(function() {
                cargaFuegosNotificados_List();
            });
        }, 3000);
    });

    $(document).on("pageshow","#page_insertar",function(){
        //Activamos el usuario contra el server
        page_insert.getCoords(function(res){

            util.traducirCoordenadas(res.lat , res.lon, 'coordInsert');
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
            var limite = (listaCompleta.data.length > 100) ? 100 : listaCompleta.data.length;

            for(var x=0; x < limite; x++) {
                L.marker([listaCompleta.data[x].lat, listaCompleta.data[x].lon],{icon: fireIcon}).addTo(map).bindPopup("<div><h2>Fuego detactado</h2><button onClick='util.irADetalle("+listaCompleta.data[x].id+")' class='ui-btn' >Ver</button></div>")
            }
        });

    }

    var cargarListado = function (){
        var listaCompleta = gestorDatos.getNotificaciones();

        if(!listaCompleta || !listaCompleta.data || listaCompleta.data.length === 0){
            return;
        }

        var limite = (listaCompleta.data.length > 100) ? 100 : listaCompleta.data.length;

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

    var addFuego = function() {
        util.changePage('page_insertar.html');
    }

    return {
        cargaFuegosNotificados_List: cargaFuegosNotificados_List,
        addFuego: addFuego
    }

})();


document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    util.setUUID(function() {
        //una vez activado el usuario, obtenemos todos las notificaciones del servidor

        index.cargaFuegosNotificados_List();
    });
}