/**
* JS para controlar la pantalla principal, mostrara dos pestanas. 
* Una lista con las notificaciones creadas y que pueden ser consultadas y un mapa del terreno con esas mismas notificaciones
*/
var pantallaPrincipal = (function() {

    function cargaFuegosNotificados_List(callback){

        var callbackList = function (datosNotificaciones){
            gestorDatos.setNotificaciones(datosNotificaciones);
            if(callback){
                callback();
            }
        }

        Services.ServiciosAJAX("getFuegos", "", callbackList);
    }

    function cargaMapa(){
         var listaCompleta = gestorDatos.getNotificaciones();
        //TODO una vez tenemos los datos en un objeto, cargamos los puntos en el mapa
    }

    function cargarListado(){
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

    return{
        cargaFuegosNotificados_List : cargaFuegosNotificados_List,
        cargaMapa       : cargaMapa,
        cargarListado   : cargarListado
    }
})(pantallaPrincipal || {});