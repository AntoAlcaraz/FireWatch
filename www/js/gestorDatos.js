/**
* JS para controlar la pantalla principal, mostrara dos pestanas. 
* Una lista con las notificaciones creadas y que pueden ser consultadas y un mapa del terreno con esas mismas notificaciones
*/
var gestorDatos = (function() {

    var Notificaciones = [];
    var NotificacionActual = {};

    function inicializarVariables(){
        Notificaciones = [];
        NotificacionActual = {};
    }

    function setNotificaciones(serverArray){

    }

    function getNotificaciones(){
        return (Notificaciones) ? Notificaciones : null;
    }

    function setNotificacionActual(idNot){
        NotificacionActual = jQuery.grep(Notificaciones, function( a ) {return a.ID == idNot;});
    }

    function getNotificacionActual(){
        return (NotificacionActual) ? NotificacionActual : null;
    }

    return{
        inicializarVariables    : inicializarVariables,
        setNotificaciones       : setNotificaciones,
        getNotificaciones       : getNotificaciones,
        setNotificacionActual   : setNotificacionActual,
        getNotificacionActual   : getNotificacionActual
    }
})(gestorDatos || {});

