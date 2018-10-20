var index = {};
index = (function() {

    $(document).delegate('#index', 'pageCreate', function() {

        document.addEventListener('deviceready', function() {

            util.setUUID(function() {
                var cargarListado = function(){

                    //Una vez tenemos todas las notificaciones, cargamos el listado de notificaciones    
                    pantallaPrincipal.cargarListado();
                }

                //una vez activado el usuario, obtenemos todos las notificaciones del servidor
                pantallaPrincipal.cargaFuegosNotificados_List(function() {
                    cargarListado();
                });
            });



        }, false);
    });

    var cargarListado = function() {

    }

    return {

    }

})();

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');

        //Cargamos UUID al acceder a la aplicacion
        util.setUUID();

    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);

        console.log('Received Event: ' + id);
    }
};

app.initialize();

