ISOLACE.LOG = true;

/**
 * Wraps a 3rd party logger implementation.
 * The current implementation is jslog, a simple but limited logger.
 * @class Log
 * @namespace ISOLACE
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 */
ISOLACE.Log = function() {
};

/**
 * Log message to console and browser console (if it exists).
 * @method log
 * @param {string} message The message to log .
 * @param {string} level  The level to log message at (e.g. warn).
 */
ISOLACE.Log.prototype.log = function(message, level) {
    if(ISOLACE.LOG) {
        if(level === undefined || typeof (level) != 'string') {
            jslog.debug(message);
        } else {
            level = level.toLowerCase();
            if(level = 'debug') {
                jslog.debug(message);
            } else if(level = 'info') {
                jslog.info(message);
            } else if(level = 'warn') {
                jslog.warn(message);
            } else if(level = 'error') {
                jslog.error(message);
            } else {
                jslog.debug(message);
            }
        }
        if($.browser.mozilla) {
            console.log(message);
        } else if($.browser.safari) {
            window.console.log(message);
        }
    }
};

if(typeof $Log == "undefined" || !$Log) {
    /**
     * A singleton instance is automatically created as a convenience
     * vs. creating a new ISOLACE.Log for each instance.
     * @class ISOLACE
     * @static
     */
    var $Log = new ISOLACE.Log();
}