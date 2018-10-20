var Services = {};

Services = (function() {

    var SERVER_URL = "http://jsninjadevs.000webhostapp.com/firewatch.php";
    var SERVER_URL_CLON = "http://jsninjadevs.000webhostapp.com/firewatch.php";

    /**
    * INFO DE LAS LLAMADAS AL SERVICE
    *
    var ACTION = {
        activarUsuario  : "activarUsuario",
        getFuegos       : "getFuegos",
        createFuegos    : "createFuegos",
        getFotos        : "getFotos"
    }
    var dataACTION = {
        activarUsuario   : getUUID(),
        getFuegos        : "",
        getFotos         : "",
        createFuegos     : getUUID()
        
    } Services.ServiciosAJAX("activarUsuario", getUUID(), getUUID());
    */

    var ServiciosAJAX = function(Action, confData, callback) {



        $.ajax({
            type : "POST",
            url: SERVER_URL,
            data: {action: Action, data: confData, uuid: util.getUUID()},
            success: function(response) {
                try {
                    var res = JSON.parse(response);
                    if(callback){
                        callback(res);
                    }    
                } catch(e) {
                    if(callback){ 
                        callback(e);
                    }
                }
            },
            error: function(error) {
                if(callback){
                    callback(error);
                } 
            }
        });
    }

    return {
        ServiciosAJAX: ServiciosAJAX
    };

})();
