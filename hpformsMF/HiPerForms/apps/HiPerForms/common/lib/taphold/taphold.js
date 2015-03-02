// @author Rich Adams <rich@richadams.me>
// see https://github.com/richadams/jquery-taphold
// Implements a tap and hold functionality. If you click/tap and release, it will trigger a normal
// click event. But if you click/tap and hold for 1s (default), it will trigger a taphold2 event instead.

;(function($)
{
    // Default options
    var defaults = {
        duration: 500, // ms
        clickHandler: null,
        maximumMovementThreshold: 50
    };

    // When start of a taphold2 event is triggered.
    function startHandler(event)
    {
        var $elem = jQuery(this);
        
        if(event.originalEvent && (event.originalEvent.touches || event.originalEvent.changedTouches)) {
    		var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
    		var elm = $(this).offset();
    		startHoldX = touch.pageX - elm.left;
            startHoldY = touch.pageY - elm.top;
        } else {
        	startHoldX = event.pageX;
            startHoldY = event.pageY;
        }
        // Store the position of the click
        $elem.data("startHoldX", startHoldX);
        $elem.data("startHoldY", startHoldY);

        // Merge the defaults and any user defined settings.
        settings = jQuery.extend({}, defaults, event.data);

        // If object also has click handler, store it and unbind. Taphold will trigger the
        // click itself, rather than normal propagation.
        if (typeof $._data( $elem[0], 'events' ) != "undefined"
            && typeof $._data( $elem[0], 'events' ).click != "undefined")
        {
            // Find the one without a namespace defined.
            for (var c in $._data( $elem[0], 'events' ).click)
            {
                if ($._data( $elem[0], 'events' ).click[c].namespace == "")
                {
                    var handler = $._data( $elem[0], 'events' ).click[c].handler;
                    $elem.data("taphold2_click_handler", handler);
                    $elem.unbind("click", handler);
                    break;
                }
            }
        }
        
        // If object also has tap handler, store it and unbind. Taphold will trigger the
        // tap itself, rather than normal propagation.
        if (typeof $._data( $elem[0], 'events' ) != "undefined"
            && typeof $._data( $elem[0], 'events' ).tap != "undefined")
        {
            // Find the one without a namespace defined.
            for (var c in $._data( $elem[0], 'events' ).tap)
            {
                if ($._data( $elem[0], 'events' ).tap[c].namespace == "")
                {
                    var handler = $._data( $elem[0], 'events' ).tap[c].handler;
                    $elem.data("taphold2_click_handler", handler);
                    $elem.unbind("tap", handler);
                    break;
                }
            }
        }
        
        
        
        
        
        // Otherwise, if a custom click handler was explicitly defined, then store it instead.
        else if (typeof settings.clickHandler == "function")
        {
            $elem.data("taphold2_click_handler", settings.clickHandler);
        }

        // Reset the flags
        $elem.data("taphold2_triggered", false); // If a hold was triggered
        $elem.data("taphold2_clicked",   false); // If a click was triggered
        $elem.data("taphold2_cancelled", false); // If event has been cancelled.

        // Set the timer for the hold event.
        $elem.data("taphold2_timer",
            setTimeout(function()
            {
                // If event hasn't been cancelled/clicked already, then go ahead and trigger the hold.
                if (!$elem.data("taphold2_cancelled")
                    && !$elem.data("taphold2_clicked"))
                {
                    // Trigger the hold event, and set the flag to say it's been triggered.
                    $elem.trigger(jQuery.extend(event, jQuery.Event("taphold2")));
                    $elem.data("taphold2_triggered", true);
                }
            }, settings.duration));
    }

    // When user ends a tap or click, decide what we should do.
    function stopHandler(event)
    {
        var $elem = jQuery(this);

        // If taphold2 has been cancelled, then we're done.
        if ($elem.data("taphold2_cancelled")) { 
        	return; 
        }

        // Clear the hold timer. If it hasn't already triggered, then it's too late anyway.
        clearTimeout($elem.data("taphold2_timer"));

        // If hold wasn't triggered and not already clicked, then was a click event.
        if (!$elem.data("taphold2_triggered")
            && !$elem.data("taphold2_clicked"))
        {
            // If click handler, trigger it.
            if (typeof $elem.data("taphold2_click_handler") == "function")
            {
                $elem.data("taphold2_click_handler")(jQuery.extend(event, jQuery.Event("click")));
            }

            // Set flag to say we've triggered the click event.
            $elem.data("taphold2_clicked", true);
        }
    }

    // If a user prematurely leaves the boundary of the object we're working on.
    function leaveHandler(event)
    {
    	// http://www.devinrolsen.com/basic-jquery-touchmove-event-setup/
    	if(event.originalEvent && (event.originalEvent.touches || event.originalEvent.changedTouches)) {
    		var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
    		var elm = $(this).offset();
    		holdX = touch.pageX - elm.left;
            holdY = touch.pageY - elm.top;            
    	} else {
    		holdX = event.pageX;
            holdY = event.pageY;            
    	}
    	
    	
    	startHoldX = $(this).data("startHoldX");
        startHoldY = $(this).data("startHoldY");
        maximumMovementThreshold = defaults.maximumMovementThreshold;
        
        // if you have more the the threshold => cancel
        if((holdX > startHoldX + maximumMovementThreshold || holdX < startHoldX - maximumMovementThreshold ) ||
           (holdY > startHoldY + maximumMovementThreshold || holdY < startHoldY - maximumMovementThreshold )) {
        	// Cancel the event.
            $(this).data("taphold2_cancelled", true);
        }
        
    }

    // Determine if touch events are supported.
    var touchSupported = ("ontouchstart" in window) // Most browsers
                         || ("onmsgesturechange" in window); // Microsoft

    var taphold2 = $.event.special.taphold2 =
    {
        setup: function(data)
        {
            $(this).bind((touchSupported ? "touchstart" : "mousedown"),  data, startHandler)
                   .bind((touchSupported ? "touchend"   : "mouseup"),    stopHandler)
                   .bind((touchSupported ? "touchmove"  : "mousemove"), leaveHandler);
        },
        teardown: function(namespaces)
        {
            $(this).unbind((touchSupported ? "touchstart" : "mousedown"),  startHandler)
                   .unbind((touchSupported ? "touchend"   : "mouseup"),    stopHandler)
                   .unbind((touchSupported ? "touchmove"  : "mousemove"), leaveHandler);
        }
    };
})(jQuery);