/**
 * Constructs an Options object.
 * @class Maintains player options. TODO Persist values.
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 * @constructor
 */
ISOLACE.Options = function() {

    this.showTimer = $Persistence.getShowTimer();
    this.showMarkerConflict = $Persistence.getShowMarkerConflict();
    this.showGuessConflict = $Persistence.getShowGuessConflict();
    this.useColorSymbols = $Persistence.getUseColorSymbols();
    this._inMarkerMode = false;
    this.useTooltips = false;
};

/**
 * @method reset
 */
ISOLACE.Options.prototype.reset = function() {
    this._inMarkerMode = false;
};

/**
 * @method inMarkerMode
 * @type boolean
 */
ISOLACE.Options.prototype.inMarkerMode = function() {
    return this._inMarkerMode;
};

/**
 * @method toggleMarkerMode
 */
ISOLACE.Options.prototype.toggleMarkerMode = function() {
    this._inMarkerMode = !this._inMarkerMode;
    $GameEvent.fireToggleMarkMode();
};

/**
 * @method setMarkerMode
 * @param {boolean} showTimer
 */
ISOLACE.Options.prototype.setMarkerMode = function(inMarkerMode) {
    this._inMarkerMode = inMarkerMode;
    $GameEvent.fireToggleMarkMode();
};

/**
 * @method getShowTimer
 * @type boolean
 */
ISOLACE.Options.prototype.getShowTimer = function() {
    return this.showTimer;
};

/**
 * @method setShowTimer
 * @param {boolean} showTimer
 */
ISOLACE.Options.prototype.setShowTimer = function(showTimer) {
    this.showTimer = showTimer;
    $Persistence.setShowTimer(showTimer);
};

/**
 * @method getShowMarkerConflict
 * @type boolean
 */
ISOLACE.Options.prototype.getShowMarkerConflict = function() {
    return this.showMarkerConflict;
};

/**
 * @method setShowMarkerConflict
 * @param {boolean} showMarkerConflict
 */
ISOLACE.Options.prototype.setShowMarkerConflict = function(showMarkerConflict) {
    this.showMarkerConflict = showMarkerConflict;
    $Persistence.setShowMarkerConflict(showMarkerConflict);
};

/**
 * @method getShowGuessConflict
 * @type boolean
 */
ISOLACE.Options.prototype.getShowGuessConflict = function() {
    return this.showGuessConflict;
};

/**
 * @method setShowGuessConflict
 * @param {boolean} showGuessConflict 
 */
ISOLACE.Options.prototype.setShowGuessConflict = function(showGuessConflict) {
    this.showGuessConflict = showGuessConflict;
    $Persistence.setShowGuessConflict(showGuessConflict);
};

/**
 * @method getUseColorSymbols
 * @type boolean
 */
ISOLACE.Options.prototype.getUseColorSymbols = function() {
    return this.useColorSymbols;
};

/**
 * @method setUseColorSymbols
 * @param {boolean} useColorSymbols
 */
ISOLACE.Options.prototype.setUseColorSymbols = function(useColorSymbols) {
    this.useColorSymbols = useColorSymbols;
    $Persistence.setUseColorSymbols(useColorSymbols);
};

if(typeof $Options == "undefined" || !$Options) {
    /**
     * Global player options.
     * @class ISOLACE.Options
     * @static
     */
    var $Options = new ISOLACE.Options();
}