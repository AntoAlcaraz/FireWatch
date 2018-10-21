/**
 * JS para controlar la pantalla principal, mostrara dos pestanas. 
 * Una lista con las notificaciones creadas y que pueden ser consultadas y un mapa del terreno con esas mismas notificaciones
 */
var page_insert = (function() {

     function getCoords(callback) {
        navigator.geolocation.getCurrentPosition(function(location) {
            console.log(location.coords.latitude);
            console.log(location.coords.longitude);
            console.log(location.coords.accuracy);

            callback({lat: location.coords.latitude, lon: location.coords.longitude});
        });
    }



    return {
        getCoords: getCoords
    }

})(page_insert || {});
