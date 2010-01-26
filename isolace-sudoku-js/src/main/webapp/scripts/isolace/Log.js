// WHEN SETTING TO TRUE, TURN OFF BROWSER POPUP BLOCKING
ISOLACE.LOG = false;

/**
 * Creates a Log object.
 * @class Wraps a 3rd party logger implementation. The current implementation is
 *        log4javascript. Tried YUI and jsLog, but preffered log4javascript.
 * @namespace ISOLACE
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 */
ISOLACE.Log = function() {
    if(ISOLACE.LOG) {
        this.log = log4javascript.getLogger();

        // Create a PopUpAppender with default options
        var popUpAppender = new log4javascript.PopUpAppender();

        // Change the desired configuration options
        popUpAppender.setFocusPopUp(false);
        popUpAppender.setNewestMessageAtTop(true);
        var popUpLayout = new log4javascript.PatternLayout("%-5p: %m%n");
        popUpAppender.setLayout(popUpLayout);

        // Add the appender to the logger
        this.log.addAppender(popUpAppender);

        this.log.debug("Logging intitialized.");
    }

};

/**
 * Log message to console and browser console (if it exists).
 * @method log
 * @param {string} message The message to log .
 * @param {string} level The level to log message at (e.g. warn).
 */
ISOLACE.Log.prototype.log = function(message, level) {
    if(ISOLACE.LOG) {
        if(level === undefined || typeof (level) != 'string') {
            this.debug(message);
        } else {
            level = level.toLowerCase();
            if(level == 'debug') {
                this.debug(message);
            } else if(level == 'info') {
                this.info(message);
            } else if(level == 'warn') {
                this.warn(message);
            } else if(level == 'error') {
                this.error(message);
            } else {
                this.debug(message);
            }
        }
    }
};

/**
 * Log message to console and browser console (if it exists).
 * @method debug
 * @param {string} message The message to log .
 */
ISOLACE.Log.prototype.debug = function(message) {
    if(ISOLACE.LOG) {
        this.log.debug(message);
        this.console(message);
    }
};

/**
 * Log message to console and browser console (if it exists).
 * @method info
 * @param {string} message The message to log.
 */
ISOLACE.Log.prototype.info = function(message) {
    if(ISOLACE.LOG) {
        this.log.info(message);
        this.console(message);
    }
};

/**
 * Log message to console and browser console (if it exists).
 * @method warn
 * @param {string} message The message to log.
 */
ISOLACE.Log.prototype.warn = function(message) {
    if(ISOLACE.LOG) {
        this.log.warn(message);
        this.console(message);
    }
};

/**
 * Log message to console and browser console (if it exists).
 * @method error
 * @param {string} message The message to log.
 */
ISOLACE.Log.prototype.error = function(message) {
    if(ISOLACE.LOG) {
        this.log.error(message);
        this.console(message);
    }
};

/**
 * Log message to console and browser console (if it exists).
 * @method debug
 * @param {string} message The message to log .
 */
ISOLACE.Log.prototype.console = function(message) {
    if(ISOLACE.LOG) {
        if($.browser.mozilla) {
            console.log(message);
        } else if($.browser.safari) {
            window.console.log(message);
        }
    }
};

if(typeof $Log == "undefined" || !$Log) {
    /**
     * A singleton instance is automatically created as a convenience vs.
     * creating a new ISOLACE.Log for each instance.
     * @class ISOLACE
     * @static
     */
    var $Log = new ISOLACE.Log();
}