/**
* TinderGeolocation
* A demonstration of the Constructor Pattern
* to retrieve your current coordinates.
*
* Usage:
*   var geolocation = new TinderGeolocation();
*   geolocation.geolocate(function(coords) {
*     console.log(coords);
*   })
*/

var TinderGeolocation = function() {
  var callback;

  function onSuccess(position) {
    callback(position.coords);
  }

  function onError() {
    throw new Error("Could not get latitude and longitude");
  }

  this.geolocate = function(callbackFunction) {
    callback = callbackFunction;
    if (navigator.geolocation) {
      // get permission
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  };
};