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

/**
 * Normalized logging. Only tested with Firefox.
 *
 * @method log
 * @static
 * @param {string} message The message to log.
 */
ISOLACE.log = function(message) {
    if(ISOLACE.DEBUG) {
        if($.browser.mozilla) {
            console.log(message);
        } else if($.browser.safari) {
            window.console.log(message);
        } else if($.browser.msie) {
            serverLog(message);
        }
    }
};

/**
 * Log a JavaScript message on the server side in the Java console. IE
 * does not yet have a logging console.
 *
 * REQUIRES -jslog program argument
 *
 * @method serverLog
 * @private
 * @param  {string} message The message to log.
 * @param {object}  jsonObject A JSON object to log.
 */
function serverLog(s, p) {
    var logParams = {};
    logParams.message = s;
    if (p) {
        var flatP;
        for ( var property in p) {
            flatP += property + ': ' + p[property];
        }
        window.status = flatP;
        logParams.message += flatP;
    }
    var params = jQuery.param(logParams).replace(/\+/g, "%20");
    var ajaxParams = {
        type : "GET",
        url : '/isolace/log',
        async : false
    };
    ajaxParams.data = params + '&' + Math.random();
    jQuery.ajax(ajaxParams);
}

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
    var fun = this;
    return function(){
      return fun.apply(context, arguments);
    };
};

/**
 * Throw an exception if value is true.
 * 
 * @method assertTrue
 * @param {boolean} value Value to check.
 * @param {string} message optional Message to report if assert is thrown.
 */
function assertTrue(value, message) {
    if(value !== true) {
        if(message === undefined) {
            message = 'Assertion failed.';
        }
        $Log.error(message);
        throw(message);
    }
}

/**
 * Throw an exception if value is true.
 * 
 * @method assertFalse
 * @param {boolean} value Value to check.
 * @param {string} message optional Message to report if assert is thrown.
 */
function assertFalse(value, message) {
    if(value !== false) {
        if(message === undefined) {
            message = 'Assertion failed.';
        }
        $Log.error(message);
        throw(message);
    }
}

/**
 * Throw an exception if value is out of range.
 * 
 * @method assertInRange
 * @param {int} value Value to check.
 * @param {int} lower Lower limit of range, inclusive.
 * @param {int} upper Upper limit of range, inclusive.
 */
function assertInRange(value, lower, upper) {
    if(value < lower || value > upper) {
        var message = "'" + value + "' out of range (must be between " + lower + " and " + upper + " inclusive).";
        $Log.error(message);
        throw(message);
    }
}

