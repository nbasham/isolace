ISOLACE.namespace("sudoku");

/**
 * Wraps persistence implementation. For now using cookies, will migrate to 
 * a server side solution using Google's AppEngine.
 * @class Persistence
 * @namespace ISOLACE.sudoku
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
*/
ISOLACE.sudoku.Persistence = function() {
    var FIFTY_YEARS = 365*50;
    this.options = {
        expires: FIFTY_YEARS
    };
};

/**
 * Internal bottleneck to get a value.
 * @method get
 * @private
 * @param {string} key 
 * @return {*} The value.
 */
ISOLACE.sudoku.Persistence.prototype.get = function(key) {
    var value = $.cookie(key);
    $Log.debug('Read [' + key + '] = ' + value);
    return value;
};

/**
 * Internal bottleneck to set a value.
 * @method set
 * @private
 * @param {string} key 
 * @param {*} value 
 */
ISOLACE.sudoku.Persistence.prototype.set = function(key, value) {
    $.cookie(key, '' + value, this.options);
    $Log.debug('Wrote [' + key + '] = ' + value);
};

/**
 * @method getPuzzleIndex
 * @return {int} The current puzzle index.
 */
ISOLACE.sudoku.Persistence.prototype.getPuzzleIndex = function() {
    var puzzleIndex = this.get('puzzleIndex');
    if(puzzleIndex === null) {
        puzzleIndex = 0;
        this.incPuzzleIndex(-1);
    }
    return parseInt(puzzleIndex);
};

/**
 * 
 * @method incPuzzleIndex
 * @param {int} puzzleIndex 
 */
ISOLACE.sudoku.Persistence.prototype.incPuzzleIndex = function() {
    var puzzleIndex = this.getPuzzleIndex() + 1;
    this.set('puzzleIndex', puzzleIndex);
};

if(typeof $Persistence == "undefined" || !$Persistence) {
    /**
     * A singleton instance of ISOLACE.sudoku.Persistence automatically created as a
     * convenience vs. creating a new ISOLACE.sudoku.Persistence for each instance.
     * @class ISOLACE.sudoku.Persistence
     * @static
     */
    var $Persistence = new ISOLACE.sudoku.Persistence();
}