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
  this.geolocate = function(callback) {
    if (navigator.geolocation) {

      // get permission
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
      
      function onSuccess(position) {
        callback(position.coords);
      }

      function onError() {
        throw new Error("Could not get latitude and longitude");
      }
    }
  }
}