
$(document).ready(function(){
    document.addEventListener("deviceready", onDeviceReady, false);
  
    $("#vibrate").click(vibrate);
    $("#alert").click(alert);
   
    if(supports_html5_storage() && supports_json()){

        $("#removeImg").click(removeImage);
        $("#takeImg").click(takePic);

        if(hasInStorage("mainImg")){
            changeImage(getFromStorage("mainImg"));
        } else {
            removeImage();
        }
    } else {
        $("#takeImg").prop("disabled", true);
        $("#mainImg").hide();
    }

    
    
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
    
    window.addEventListener("batterystatus", onBatteryStatus, false);
    console.log(device.cordova);
    console.log(navigator.globalization);
    StatusBar.show();
}

function onBatteryStatus(status) {
    $("#battery").html("Level: " + status.level + " isPlugged: " + status.isPlugged);
}

function takePic() {
    navigator.camera.getPicture(
    function(imageData) {
        changeImage(imageData);
        vibrate(1000);
        alert();
    }, function(){
        console.log("fail");
    }, {
        quality: 100
    });
}

function changeImage(imageData){
  addToStorage("mainImg", imageData);
  if(!(imageData).includes("file:///")) {
    imageData = "data:image/jpeg;base64," + imageData;
  }
  $("#mainImg").attr("src", imageData);
  $("#mainImg").show();
  $("#noImg").hide();

  $("#takeImg").hide();
  $("#removeImg").show();
}

function removeImage(){
    removeFromStorage("mainImg");

    $("#mainImg").hide();
    $("#noImg").show();
  
    $("#takeImg").show();
    $("#removeImg").hide();
}

function vibrate() {
    navigator.vibrate(3000);
}

function alert() {
    navigator.notification.alert(
        'Your picture has been taken!',  // message
        alertCallback,         // callback
        'Alert',            // title
        'OK!'                  // buttonName
    );
}
//Adding to storage
function addToStorage(id,data){
    var storage = getStorage();
    storage[id] = data;
    saveStorage(storage);
}

//loading from storage
function getStorage(){
    var current = localStorage["main"];
    var storage = {};
    if(typeof current != "undefined") storage=window.JSON.parse(current);
    return storage;
}

function getFromStorage(id) {
    var storage = getStorage();
    return storage[id]
}

//Checking storage
function hasInStorage(id){
    return (id in getStorage());
}

//Adding to storage
function removeFromStorage(id,data){
    if (hasInStorage(id)) {
        var storage = getStorage();
        delete storage[id];
        console.log('removed '+id);
        saveStorage(storage);
    }
}

//save storage
function saveStorage(storage){
    console.log("To store...");
    console.dir(storage);
    localStorage["main"] = window.JSON.stringify(storage);
}

function alertCallback() {
    console.log("callback");
}
