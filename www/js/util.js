var util = (function() {

    var UUID;

    function setUUID(callback) {
        UUID = device.uuid;

        //UUID = "4e41a8367f289755";
        
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
            var localidad = (data.address.city) ? data.address.city : ((data.address.town) ? data.address.town : data.address.village);
            var pais = data.address.country;
            if(id){
                $('#'+id).text(localidad +" ("+pais+")");
            } 
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
        irADetalle  : irADetalle
    }
})(util || {});