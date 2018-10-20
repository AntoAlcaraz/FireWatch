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

    }

    return{
        cargaFuegosNotificados_List : cargaFuegosNotificados_List,
        cargaMapa       : cargaMapa,
        cargarListado   : cargarListado
    }
})(pantallaPrincipal || {});