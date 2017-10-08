

$(document).ready(function () {
    document.addEventListener("deviceready", onDeviceReady, false);
});

function supports_html5_storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}
function supports_json() {
    try {
        return 'JSON' in window && window['JSON'] !== null;
    } catch (e) {
        return false;
    }
}

function onDeviceReady() {
    $("#pic").click(takePic);
    $("#vibrate").click(vibrate);
    $("#alert").click(alert);

    window.addEventListener("batterystatus", onBatteryStatus, false);
    console.log(device.cordova);
    console.log(navigator.globalization);
    StatusBar.show();
}

function onBatteryStatus(status) {
    $("#battery").html("Level: " + status.level + " isPlugged: " + status.isPlugged);
}

function takePic() {
    navigator.camera.getPicture(function (imageData) {
        console.log("success");
        changeImage(imageData);
    }, function () {
        console.log("fail");
    }, {
        quality: 100
    });
}

function changeImage(imageData) {
    $("#mainImg").attr("src", "data:image/jpeg;base64," + imageData);
}

function vibrate() {
    navigator.vibrate(3000);
}

function alert() {
    //console.log("alert");
    navigator.notification.alert('You are the winner!', // message
    alertCallback, // callback
    'Game Over', // title
    'Done' // buttonName
    );
}
//Adding to storage
function addToStorage(id, data) {
    if (!hasInStorage(id)) {
        var storage = getStorage();
        storage[id] = data;
        saveStorage(data);
    }
}

//loading from storage
function getStorage() {
    var current = localStorage["main"];
    var storage = {};
    if (typeof current != "undefined") storage = window.JSON.parse(current);
    return storage;
}

//Checking storage
function hasInStorage(id) {
    return id in getStorage();
}

//Adding to storage
function removeFromStorage(id, data) {
    if (hasInStorage(id)) {
        var storage = getStorage();
        delete storage[id];
        console.log('removed ' + id);
        saveStorage(storage);
    }
}

//save storage
function saveStorage(data) {
    console.log("To store...");
    console.dir(storage);
    localStorage["main"] = window.JSON.stringify(storage);
}

function alertCallback() {
    console.log("callback");
}
//# sourceMappingURL=main.js.map
