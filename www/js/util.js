var util = (function() {

    var UUID;

    function setUUID() {
        UUID = device.uuid;


        var callback = function(){
            var cargarListado = function(){

                //Una vez tenemos todas las notificaciones, cargamos el listado de notificaciones    
                pantallaPrincipal.cargarListado();
            }

            //una vez activado el usuario, obtenemos todos las notificaciones del servidor
            pantallaPrincipal.cargaFuegosNotificados_List(cargarListado);
        }

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
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL
        });
    }

    function onSuccess(imageData) {
        var image = document.getElementById('myImage');
        image.src = "data:image/jpeg;base64," + imageData;
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }

    return {
        setUUID: setUUID,
        getUUID: getUUID,
        changePage: changePage,
        onSuccess: onSuccess,
        onFail: onFail,
        foto: foto
    }
})(util || {});