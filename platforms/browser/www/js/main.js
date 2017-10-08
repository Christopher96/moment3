
$(document).ready(function(){
    document.addEventListener('deviceready', onDeviceReady, false);

    if(supports_html5_storage() && supports_json()){

        $('#removeImg').click(removeImage);
        $('#takeImg').click(takePic);

        if(hasInStorage('mainImg')){
            changeImage(getFromStorage('mainImg'));
        }
    } else {
        $('#takeImg').prop('disabled', true);
        $('#mainImg').hide();
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

    window.addEventListener('batterystatus', onBatteryStatus, false);
    console.log(device.cordova);
    console.log(navigator.globalization);
    StatusBar.show();
}

function onBatteryStatus(status) {
    $('#battery').html('Level: ' + status.level + ' isPlugged: ' + status.isPlugged);
}

function takePic() {
    navigator.camera.getPicture(
    function(imgBlob) {
        var date = new Date();
        var imageData = {
            timestamp: date.toDateString(),
            blob: imgBlob
        }
        changeImage(imageData);
        navigator.vibrate(1000);
        popup('Din bild har sparats!');
    }, function(){
        popup('Det gick inte att ta bilden...');
    }, {
        quality: 100,
        correctOrientation: true
    });
}

function changeImage(imageData){
    var imgBlob = imageData.blob;
    addToStorage('mainImg', imageData);
    if(!(imgBlob).includes('file:///')) {
        imgBlob = 'data:image/jpeg;base64,' + imgBlob;
    }
    $('#mainImg').attr('src', imgBlob);
    $('#mainImg').show();

    $('#timestamp span').text(imageData.timestamp);
    $('#timestamp').show();

    $('#noImg').hide();

    $('#takeImg').hide();
    $('#removeImg').show();
}

function removeImage(){
    removeFromStorage('mainImg');

    $('#mainImg').hide();
    $('#timestamp').hide();
    
    $('#noImg').show();
  
    $('#takeImg').show();
    $('#removeImg').hide();

    popup('Din bild har raderats!');
}

function popup(text) {
    navigator.notification.alert(
        text,  // message
        alertCallback,         // callback
        'Bildfunktion',            // title
        'Ok'                  // buttonName
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
    var current = localStorage['main'];
    var storage = {};
    if(typeof current != 'undefined') storage=window.JSON.parse(current);
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
    console.log('To store...');
    console.dir(storage);
    localStorage['main'] = window.JSON.stringify(storage);
}

function alertCallback() {
    console.log('callback');
}
