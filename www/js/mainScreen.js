/**
* JS para controlar la pantalla principal, mostrara dos pestanas. 
* Una lista con las notificaciones creadas y que pueden ser consultadas y un mapa del terreno con esas mismas notificaciones
*/
var pantallaPrincipal = (function() {

    function cargaFuegosNotificados_List(){
        //TODO  recoleccion de datos desde servicio PHP
    }

    function cargaFuegosNotificados_Map(){
        //TODO una vez tenemos los datos en un objeto, cargamos los puntos en el mapa
    }

    return{
        cargaFuegosNotificados_List : cargaFuegosNotificados_List,
        cargaFuegosNotificados_Map  : cargaFuegosNotificados_Map
    }
})(pantallaPrincipal || {});

