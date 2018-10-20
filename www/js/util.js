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


    return {
        setUUID: setUUID,
        getUUID: getUUID,
        changePage: changePage,
        foto: foto,
        galeria: galeria
    }
})(util || {});