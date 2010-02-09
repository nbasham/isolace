if (typeof ISOLACE == "undefined" || !ISOLACE) {
	/**
	 * The ISOLACE global namespace object.  If ISOLACE is already defined, the
	 * existing ISOLACE object will not be overwritten so that defined
	 * namespaces are preserved.
	 * @class ISOLACE
	 * @static
	 */
	var ISOLACE = {};
}

/**
 * Global debug flag. This flag should be changed for local use only,
 * this value should always be false in SVN.
 */
ISOLACE.DEBUG = true;

/**
 * This code is from the folks at YUI - thanks!
 * 
 * Returns the namespace specified and creates it if it doesn't exist.
 *
 * Be careful when naming packages. Reserved words may work in some browsers
 * and not others. For instance, the following will fail in Safari:
 * <pre>
 * ISOLACE.namespace("really.long.nested.namespace");
 * </pre>
 * This fails because "long" is a future reserved word in ECMAScript
 *
 * @method namespace
 * @static
 * @param  {String*} arguments 1-n namespaces to create
 * @return {Object}  A reference to the last namespace object created
 */
ISOLACE.namespace = function() {
	var a = arguments, o = null, i, j, d;
	for (i = 0; i < a.length; i = i + 1) {
		d = ("" + a[i]).split(".");
		o = ISOLACE;

		// ISOLACE is implied, so it is ignored if it is included
		for (j = (d[0] == "ISOLACE") ? 1 : 0; j < d.length; j = j + 1) {
			o[d[j]] = o[d[j]] || {};
			o = o[d[j]];
		}
	}

	return o;
};

/**
 * This used to be part of jQuery.
 * <pre>
 * if($.browser.mozilla) {
 * } else if($.browser.safari) {
 * } else if($.browser.msie) {
 * }
 * </pre>
 */
(function($) {
    var userAgent = navigator.userAgent.toLowerCase();
    $.browser = {
        version : (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [ 0, '0' ])[1],
        safari : /webkit/.test(userAgent),
        opera : /opera/.test(userAgent),
        msie : /msie/.test(userAgent) && !/opera/.test(userAgent),
        mozilla : /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)
    };
})(jQuery);

ISOLACE.arrayToString = function(a) {
    var s = '[';
    if(a !== undefined && a !== null) {
        for(var i = 0; i < a.length; i++) {
            s += a[i];
            if(i != (a.length -1)) {
                s += ', ';
            }
        }
    }
    s += ']';
    
    return s;
};

/**
 * Check if two arrays are equal. This is only implemented for arrays containing primitive values.
 * 
 * @param {array} a1 One of the arrays to compare.
 * @param {array} a2 One of the arrays to compare.
 * @method arrayEquals
 * @return {boolean} True if the array values are equal.
 */
function arrayEquals(a1, a2) {
    if(a1 === undefined || a2 === undefined || a1.length === undefined || a2.length === undefined) {
        return false;
    }
    if(a1.length != a2.length) {
        return false;
    }
    for(var i = 0; i < a1.length; i++) {
        if(a1[i] != a2[i]) {
            return false;
        }
    }

    return true;
}

/**
 * Add a bind method to all functions. Stole this from prototype,
 * when passing a function pointer this will allow you set 'this'
 * for that function.
 * <pre>
 *     Consider applying the event handler 'handler':
 *     var listener = new YAHOO.util.KeyListener(document, keys, handler);
 *     When 'handler' is called, this will be set to document. By using bind
 *     var listener = new YAHOO.util.KeyListener(document, keys, handler.bind(myObject);
 *     When 'handler' is called, this will be set to myObject.
 * </pre>
 *
 * @method bind
 * @param  {object} context The scope to wrap a function call to.
 */
Function.prototype.bind = function(context) {
    var localFunctionRef = this;
    return function(){
      return localFunctionRef.apply(context, arguments);
    };
};

/**
 * Extends jQuery's removeClass.
 * <pre>
 *     Given: <div id='did' class='a b c1'/>
 *     $('#did').removeClassContains('c');
 *     Yields: <div id='did' class='a b'/>
 * </pre>
 *
 * @method removeClassContains
 * @param  {string} classFragment The class string to search for.
 */
$.fn.extend({
    removeClassContains: function(classFragment) {
    var classes = $(this).attr('class');
    if(classes !== null) {
        classes = classes.split(' ');
        for (var classIndex in classes) {
            var className = classes[classIndex];
            var i = className.indexOf(classFragment);
            if (i >= 0) {
                classes.splice(classIndex, 1);
            }
        }

        $(this).attr('class', classes.join(' '));}
    }
});

function parseBool(b) {
    if(typeof b == 'boolean') {
        return b;
    } else if(typeof b == 'string') {
        if(b.toLowerCase() == 'true') {
            return true;
        } else {
            return false;
        }
    } else if(typeof b == 'number') {
        if(b === 0) {
            return false;
        } else {
            return true;
        }
    }
    return false;
}
