/**
 * TinderNotification
 *
 * Usage:
 *    var options = {
 *      icon: "http://lorempixel.com/60/60",
 *      body: "Body text"
 *    }
 *    var notification = TinderNotification.getInstance();
 *    notification.notificate("Title", options);
 *
 */

var TinderNotification = (function(){
  var instance;

  function Singleton() {
    this.notificate = function(message, options) {
      if(Notification.permission !== "denied") {
        Notification.requestPermission(function(permission) {
          if(permission === "granted") {
            notification = new Notification(message, options);
          }
        });
      }
    }
  }

  var _static = {
    getInstance: function(message, options) {
      if (instance === undefined) {
        instance = new Singleton(message, options);
      }
      return instance;
    }
  }

  return _static;
})();
