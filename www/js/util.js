var util = (function() {

    var UUID;

    function setUUID(callback) {
        UUID = device.uuid;
        //Activamos el usuario contra el server
        Services.ServiciosAJAXusuario(callback);
    }

    function getUUID() {
        return (UUID) ? UUID : null;
    }

    function changePage(page, reverse) {
        $.mobile.changePage('html/' + page, {
            reverse: !!reverse
        });
    }

    function foto() {
        navigator.camera.getPicture(function(result) {
            console.log("data:image/jpeg;base64," + result);
        }, function(error) {
            console.log(error);
        }, {
            sourceType: Camera.PictureSourceType.CAMERA
        });
    }

    function galeria() {
        navigator.camera.getPicture(function(result) {
            console.log("data:image/jpeg;base64," + result);
        }, function(error) {
            console.log(error);
        }, {
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM
        });
    }

    function irADetalle(idNotificacion){

        gestorDatos.setNotificacionActual(idNotificacion)

        //ChangePage
        util.changePage('page_detalle.html');

    }

    function traducirCoordenadas(lat, lon, id) {
        

        $.getJSON('https://nominatim.openstreetmap.org/reverse?json_callback=?&format=json', {lat: lat, lon: lon}, function(data) {
            var localidad = data.address.town;
            var pais = data.address.country;
            if(id){
                $('#'+id).val(localidad +" ("+pais+")");
            } 
        });
    }

    function showCountry(lat, lon) {
        $.getJSON('https://nominatim.openstreetmap.org/reverse?json_callback=?&format=json', {lat: lat, lon: lon}, function(data) {
           alert(data.address);
       });
    }

    return {
        setUUID     : setUUID,
        getUUID     : getUUID,
        changePage  : changePage,
        foto        : foto,
        galeria     : galeria,
        irADetalle  : irADetalle,
        traducirCoordenadas : traducirCoordenadas,
        showCountry : showCountry
        irADetalle  : irADetalle
    }
})(util || {});