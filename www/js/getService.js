var Services = {};

Services = (function() {

    var SERVER_URL = "http://jsninjadevs.000webhostapp.com/firewatch.php";
    var GETACTION = "getFuegos";
    var defaultData = undefined;

    var getNotificaciones = function(callback) {
        Debug.log("Conectando con PHP...", "i");
        Debug.log("Metodo -> " + GETACTION, "i");

        $.ajax({
            type : "POST",
            url: SERVER_URL,
            data: {action: GETACTION, data: defaultData, uuid: util.getUUID()},
            success: function(response) {
                Debug.log("Respuesta: " + response);

                try {
                    var res = JSON.parse(response);
                    if(callback)callback(res);
                } catch(e) {
                    if(callback)callback(getMsgByHttpStatus(500));
                }
            },
            error: function(error) {
                //utiles.showNotifyError(error);
                if(callback)callback(getMsgByHttpStatus(504));
            }
        });
    }

    var getMsgByHttpStatus = function(status) {
        var msg = "";
        switch (status) {
            case 0:
            case 504:
                msg = l.MSG_NO_CONNECTION;
                break;
            case 503:
                msg = l.MSG_SERVICE_UNAVAILABLE;
                break;
            case 500:
                msg = l.MSG_SERVER_ERROR;
                break;
            case 401:
                msg = l.LOGIN_FAILED;
                break;
            default:
                msg = l.MSG_GENERIC_ERROR;
                break;
        }
        return msg;
    };

    return {
        getNotificaciones: getNotificaciones,
        getMsgByHttpStatus: getMsgByHttpStatus
    };

})();
