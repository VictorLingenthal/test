function pointWithinElement(element, x, y) {
	element = $(element);
	var offset = element.offset();
	return offset.left <= x && offset.left + element.width() > x
			&& offset.top <= y && offset.top + element.height() > y;
}

function elementWithinElement(element, predicate) {
	var args = BetaJS.Functions.getArguments(arguments, 1);
	var ret = null;
	$(element).children().each(function() {
		args[0] = this;
		if (predicate.apply(this, args))
			ret = this;
	});
	return ret;
}

function replace_directive(scope, element, compile) {
    element.html(element.html().replace(/(<[/\w]*)directive\w*:{{([^}]+)}}/g, function (match, prefix, variable) {
        return prefix + scope[variable];
    }));
    compile(element.contents())(scope);
}


function draggable_list(list, items, focus_class, unfocus_class, options) {
	BetaJS.SyncAsync.eventually(function() {
        console.log("Number: 23");
        console.log("List: ");
        console.log(list);
        console.log("Items: ");
        console.log(items);
        console.log("$List: ");
        console.log($(list));
        console.log("Complete: ");
        console.log($(list).find(items));
		$(list).find(items).each(function() {
            console.log("24");
	        BetaJS.UI.Gestures.register(this, BetaJS.UI.Gestures.draggableMachine({}, BetaJS.Objs.extend(options, {
	            semi_start : function() {
	                var item = $(this);
	                $(list).find(items).addClass(unfocus_class);
	                item.removeClass(unfocus_class);
	                item.addClass(focus_class);
	            },
	            semi_finish : function() {
	            	$(list).find(items).removeClass(focus_class);
	            	$(list).find(items).removeClass(unfocus_class);
	            }
	        })));
	    });	
	});
}

function add_hover_target(element, target, hover_class) {
	var hovering = false;
	BetaJS.SyncAsync.eventually(function () {
		target = $(target);
	    $(element).on("mousemove", ".ui-draggable-dragging", function (event) {
	    	hovering = pointWithinElement(target, event.pageX, event.pageY);
	    	if (hovering)
	    		target.addClass(hover_class);
	    	else
	    		target.removeClass(hover_class);
	    }).on("mouseup", function () {
	    	target.removeClass(hover_class);
	    	if (hovering)
	    		element.data("dropped", target);
	    });
	});
}

function droppable_list(element, item, target, source_list, target_list, scope) {
	if (element.data("dropped").get(0) == $(target).get(0)) {
	    var data = $(item).data("item");
	    for (var i = 0; i < source_list.length; ++i)
	        if (source_list[i].t == data.t)
	        	source_list.splice(i, 1);
	    target_list.push(data);
	    BetaJS.SyncAsync.eventually(function () {
	        scope.$digest();
	    });
	}
}