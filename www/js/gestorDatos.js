/**
* JS para controlar la pantalla principal, mostrara dos pestanas. 
* Una lista con las notificaciones creadas y que pueden ser consultadas y un mapa del terreno con esas mismas notificaciones
*/
var gestorDatos = (function() {

    var Notificaciones = [];
    var NotificacionActual = {};
    var NuevaNotificacion = {
        DatosGPS : {},
        DatosFotos : {},
        DatosObservaciones : ""
    }

    function inicializarVariables(){
        Notificaciones = [];
        NotificacionActual = {};
        NuevaNotificacion = {
            DatosGPS : {},
            DatosFotos : {},
            DatosObservaciones : ""
        }
    }

    /**
    *   NOTIFICACIONES DE FUEGO - TOTAL Y SELECCIONADA
    */
    function setNotificaciones(serverJSONArray){
        Notificaciones = serverJSONArray;
    }

    function getNotificaciones(){
        return (Notificaciones) ? Notificaciones : null;
    }

    function setNotificacionActual(idNot){
        NotificacionActual = jQuery.grep(Notificaciones, function( a ) {return a.id == idNot;});
    }

    function getNotificacionActual(){
        return (NotificacionActual) ? NotificacionActual : null;
    }

    /**
    *   CREACION DE NUEVAS NOTIFICACIONES DE FUEGO
    */
    function setDatosGPS(objectGPS){
        NuevaNotificacion.DatosGPS = objectGPS;
    }

    function setDatosFotos(objectFotos){
        NuevaNotificacion.DatosFotos = objectFotos;
    }

    function setDatosObservaciones(stringObservacion){
        NuevaNotificacion.DatosObservaciones = stringObservacion;
    }

    function getNuevaNotificacion(){
        return NuevaNotificacion;
    }

    return{
        inicializarVariables    : inicializarVariables,
        setNotificaciones       : setNotificaciones,
        getNotificaciones       : getNotificaciones,
        setNotificacionActual   : setNotificacionActual,
        getNotificacionActual   : getNotificacionActual,
        setDatosGPS             : setDatosGPS,
        setDatosFotos           : setDatosFotos,
        setDatosObservaciones   : setDatosObservaciones,
        getNuevaNotificacion    : getNuevaNotificacion
    }
})(gestorDatos || {});

