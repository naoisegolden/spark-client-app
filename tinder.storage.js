/**
 * TinderStorage
 * Module to store key/value pairs in local
 * storage, using the Singleton Pattern.
 *
 * Usage:
 *   var storage = TinderStorage.getInstance();
 *	 storage.create("location1", { address: "Main Street" });
 *   storage.read("location1");
 *   storage.update("location1", { address: "Secondary Street" });
 *   storage.destroy("location1");
 */

var TinderStorage = (function(){
	// first check localStorage support
	if(!window.localStorage) {
		throw new Error("LocalStorage is not supported!");
	}

	// private properties
	var _localStorage = window.localStorage;

	// private methods
	function _create(key, value) {
		var serialized = JSON.stringify(value);
		_localStorage.setItem(key, serialized);
	}

	function _read(key) {
		var serialized = _localStorage.getItem(key);
		return JSON.parse(serialized);
	}

	function _update(key, value) {
		var serialized = JSON.stringify(value);
		_localStorage.setItem(key, value);
	}

	function _destroy(key) {
		_localStorage.removeItem(key);
	}

    function Singleton() {
        // public methods
        this.create  = _create;
        this.read 	 = _read;
        this.update  = _update;
        this.destroy = _destroy;
    }

    var instance;  //this is our instance holder
    //this is an emulation of static variables and methods
    var _static = {
        getInstance: function () {
			// return instance if already exists
            if (instance === undefined) {
                instance = new Singleton();
            }
            return instance;
        }
    };

    return _static;
})();