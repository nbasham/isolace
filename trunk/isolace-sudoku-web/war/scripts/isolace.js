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
 * This code is from the good folks at YUI - thanks!
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
 * For implementation code that uses YUI, do not create your components
 * in the namespaces created by the library.  defined by YUI -- create
 * your own (ISOLACE.util, ISOLACE.widget, ISOLACE.lang, ISOLACE.env)
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
