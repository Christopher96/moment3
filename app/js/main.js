document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    document.querySelector("#pic").addEventListener("click", takePic);
    document.querySelector("#vibrate").addEventListener("click", vibrate);
    document.querySelector("#alert").addEventListener("click", alert);

    window.addEventListener("batterystatus", onBatteryStatus, false);
    console.log(device.cordova);
    console.log(navigator.globalization);
    StatusBar.show();
}

function onBatteryStatus(status) {
    console.log("Level: " + status.level + " isPlugged: " + status.isPlugged);
}

function takePic() {
    navigator.camera.getPicture(
    function() {
        console.log("success");
    }, function(){
        console.log("fail");
    }, {
        quality: 100
    });
}

function vibrate() {
    navigator.vibrate(3000);
}

function alert() {
    //console.log("alert");
    navigator.notification.alert(
        'You are the winner!',  // message
        alertCallback,         // callback
        'Game Over',            // title
        'Done'                  // buttonName
    );
}

function alertCallback() {
    console.log("callback");
}