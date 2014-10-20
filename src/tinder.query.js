/**
 * TinderQuery
 * Let's you query DOM elements by id, class name or element name,
 * and then assign an event listener or append some HTML.
 *
 * Usage:
 *   var v = new TinderQuery();
 *   v.querySelector("#id").on('click', doSomething);
 *   v.querySelector(".className").on('click', doSomething);
 *   v.querySelector("li").on('click', doSomething);
 *   
 *   v.querySelector("ul").append("<li>An item</li>");
 *   v.querySelector("ul").after("<div>New element</div>");
 */
var TinderQuery = function () {
	this.element; 
}

TinderQuery.prototype.querySelector = function (selector) {
		if (selector[0] === "#") {
			this.element = document.getElementById(selector.substr(1));
			return this;
		}
		if (selector[0] === ".") {
			this.element = document.getElementsByClassName(selector.substr(1))[0];
			return this;
		}
		this.element = document.getElementsByTagName(selector)[0];
		return this;
}

TinderQuery.prototype.on = function (event, eventHandler) {
    this.element.addEventListener(event, eventHandler);
    return this;
}

TinderQuery.prototype.append = function (html) {
    this.element.innerHTML += html;
    return this;
}

TinderQuery.prototype.after = function (html) {
    this.element.insertAdjacentHTML("afterend", html);
    return this;
}
