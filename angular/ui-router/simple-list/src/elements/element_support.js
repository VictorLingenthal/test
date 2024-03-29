BetaJS.UI.Elements.Support = {

	elementFromPoint : function(x, y, disregarding) {
		disregarding = disregarding || [];
		if (!BetaJS.Types.is_array(disregarding))
			disregarding = [ disregarding ];
		var backup = [];
		for ( var i = 0; i < disregarding.length; ++i) {
			disregarding[i] = BetaJS.$(disregarding[i]);
			backup.push(disregarding[i].css("z-index"));
			disregarding[i].css("z-index", -1);
		}
		var element = document.elementFromPoint(x, y);
		for ( var i = 0; i < disregarding.length; ++i)
			disregarding[i].css("z-index", backup[i]);
		return element;
	},

	elementBoundingBox : function(element) {
		element = BetaJS.$(element);
		var offset = element.offset();
		return {
			left : offset.left,
			top : offset.top,
			right : offset.left + element.width() - 1,
			bottom : offset.top + element.height() - 1
		};
	},

	pointWithinElement : function(x, y, element) {
		var bb = this.elementBoundingBox(element);
		return bb.left <= x && x <= bb.right && bb.top <= y && y <= bb.bottom;
	},
	
	childContainingElement: function (parent, element) {
		parent = BetaJS.$(parent).get(0);
		element = BetaJS.$(element).get(0);
		while (element.parentNode != parent) {
			if (element == document.body)
				return null;
			element = element.parentNode;
		}
		return element;
	}

}