BetaJS.Class.extend("BetaJS.UI.Interactions.ElementInteraction", [
    BetaJS.Events.EventsMixin,
	{
    	
    _attach_label: "interaction",
	
	constructor: function (element, options) {
		this._inherited(BetaJS.UI.Interactions.ElementInteraction, "constructor");
		this._element = BetaJS.$(element);
		this._enabled = false;
		this._options = options || {};
		if ("enabled" in this._options) {
			var enabled = this._options.enabled;
			delete this._options.enabled;
			if (enabled) 
				BetaJS.SyncAsync.eventually(this.enable, this);
		}
		this._host = new BetaJS.States.Host();
		this._host.parent = this;
	},
	
	destroy: function () {
		this.disable();
		this._host.destroy();
		this._inherited(BetaJS.UI.Interactions.ElementInteraction, "destroy");
	},
	
	enable: function () {
		if (this._enabled)
			return;
		this._enabled = true;
		this._enable();
	},
	
	disable: function () {
		if (!this._enabled)
			return;
		this._enabled = false;
		this._disable();
	},
	
	element: function () {
		return this._element;
	},
	
	options: function () {
		return this._options;
	},
	
	_enable: function () {},
	
	_disable: function () {}

}]);


BetaJS.States.State.extend("BetaJS.UI.Interactions.State", {
	
	parent: function () {
		return this.host.parent;
	},
	
	element: function () {
		return this.parent().element();
	},
	
	options: function () {
		return this.parent().options();
	},
	
	on: function (element, event, callback, context) {
		var self = this;
		var events = event.split(" ");
		for (var i = 0; i < events.length; ++i)
			BetaJS.$(element).on(events[i] + "." + BetaJS.Ids.objectId(this), function () {
				callback.apply(context || self, arguments);
			});
	},
	
	_end: function () {
		this.element().off("." + BetaJS.Ids.objectId(this));
		BetaJS.$("body").off("." + BetaJS.Ids.objectId(this));
	}	

});
