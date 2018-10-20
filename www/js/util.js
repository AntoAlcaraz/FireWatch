var util = (function() {

    var UUID;

    function setUUID() {
        UUID = device.uuid;
        Services.ServiciosAJAX("activarUsuario", getUUID(), null);
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