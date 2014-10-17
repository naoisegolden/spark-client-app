var locations     = [],
    tq            = new TinderQuery(),
    storage       = TinderStorage.getInstance(),
    notification  = TinderNotification.getInstance(),
    geolocation   = new TinderGeolocation();

/**
 * Takes the response API call, extracts the 
 * right data and returns it in an array
 * 
 * @param {Object} data JSON response from known API
 * @returns {Array} list Array of locations in the following format:
 * 
 *    [{
 *      "name": "Sagrada Familia",
 *      "city": "Barcelona",
 *      "country": "Spain",
 *      "description": "1.02342,-45.12003",
 *      "zip_code": "08008",
 *      "street": "Carrer Mallorca, 100"
 *    },…]
 */
function extractJSONData(data) {
	var list = [];

	if(!data) {
		throw new Error("Received data is empty");
	}	

	list = data.locations_list;
	return list;
}

/** 
 * Appends a success message after a given element
 */
function showSuccess(selector) {
  var html = "<span class=\"success\">Success!</span>";
  tq.querySelector(selector).after(html);
}


// TinderAjax
function callTinderAjax() {
  var url = "http://ironhack-meet-me-api.herokuapp.com/locations.json"

  TinderAjax.getJSON(url, function(data) {
  	console.log("TinderAjax.getJSON data:", data);
    locations = extractJSONData(data);
    showSuccess("#ajax");
  });
}

// TinderStorage
function callTinderStorage() {
  locations.forEach(function(element, index, array) {
    storage.create(element.name, element);
  });
  showSuccess("#save");
}

// TinderNotification
function callTinderNotification() {
  var options = {
    icon: "https://maps.googleapis.com/maps/api/staticmap?center=40.714728,-73.998672&zoom=12&size=100x100",
    body: "Carrer Alaba 61, Barcelona."
  }
  
  notification.notificate("Itnig", options);
}

// TinderQuery
tq.querySelector("#ajax").on("click", function(event) {
  callTinderAjax();
});
tq.querySelector("#save").on("click", function(event) {
  callTinderStorage();
});
tq.querySelector("#populate").on("click", function(event) {
  callTinderQuery();
});
tq.querySelector("#geolocate").on("click", function(event) {
  callTinderGeolocate();
});
tq.querySelector("#notify").on("click", function(event) {
  callTinderNotification();
});

function callTinderQuery() {
  locations.forEach(function(element, index, array) {
    var html = "<li>" + element.name + "</li>";
    tq.querySelector("#list").append(html);
  });
  showSuccess("#populate");
}

// TinderGeolocation
function callTinderGeolocate() {
  geolocation.geolocate(function(coords) {
    console.log(coords);
  })
}
