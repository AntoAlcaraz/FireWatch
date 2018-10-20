var util = (function() {

    var UUID;

    function setUUID(){
        UUID = device.uuid;
    }

    function getUUID(){
        return (UUID) ? UUID : null;
    }

    return{
       setUUID  : setUUID,
       getUUID  : getUUID
    }
})(util || {});