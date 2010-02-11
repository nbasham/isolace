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
 * TODO see if there's a way to iterate over a domain's cookies
 * Clears all stored values, use with care.
 * @method clearAll
 */
ISOLACE.sudoku.Persistence.prototype.clearAll = function() {
    this.remove('puzzleLevel');
    this.remove('puzzleIndex0');
    this.remove('puzzleIndex1');
    this.remove('puzzleIndex2');
    this.remove('puzzleIndex3');
    this.remove('scores');
    this.remove('showTimer');
    this.remove('showMarkerConflict');
    this.remove('showGuessConflict');
    this.remove('useColorSymbols');
};

/**
 * Internal bottleneck to get a value.
 * @method get
 * @private
 * @param {string} key 
 * @return {*} The value, null if not found.
 */
ISOLACE.sudoku.Persistence.prototype.get = function(key) {
    var value = $.cookie(key);
    if(value === '') {
        value = null;
    }
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
 * Internal bottleneck to delete a cookie.
 * @method remove
 * @private
 * @param {string} key 
 */
ISOLACE.sudoku.Persistence.prototype.remove = function(key) {
    $.cookie(key, '', this.options);
    $Log.debug('Deleted cookie [' + key + '] = ');
};

/**
 * @method getPuzzleLevel
 * @return The current puzzle level.
 * @type {int}
 */
ISOLACE.sudoku.Persistence.prototype.getPuzzleLevel = function() {
    var puzzleLevel = this.get('puzzleLevel');
    if(puzzleLevel === null) {
        puzzleLevel = 0;
        this.set('puzzleLevel', puzzleLevel);
    }
    return parseInt(puzzleLevel);
};

/**
 * @method setPuzzleLevel
 * @param {int} puzzleLevel The puzzle level.
 */
ISOLACE.sudoku.Persistence.prototype.setPuzzleLevel = function(puzzleLevel) {
    assertNumber(puzzleLevel, 'setPuzzleLevel() requires a number parameter');
    var currentLevel = this.getPuzzleLevel();
    if(puzzleLevel != currentLevel) {
        this.set('puzzleLevel', puzzleLevel);
        $GameEvent.fireLevelChange(puzzleLevel);
    }
};

/**
 * @method getPuzzleIndex
 * @return {int} The current puzzle index.
 */
ISOLACE.sudoku.Persistence.prototype.getPuzzleIndex = function() {
    var level = $Persistence.getPuzzleLevel();
    var key = 'puzzleIndex' + level;
    var puzzleIndex = this.get(key);
    if(puzzleIndex === null) {
        puzzleIndex = 0;
        this.set(key, puzzleIndex);
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
    var level = $Persistence.getPuzzleLevel();
    var key = 'puzzleIndex' + level;
    this.set(key, puzzleIndex);
};

/**
 * Add and save the given score. The score will be marked with the current
 * date/time.
 * @method addScore
 * @param {number} time The number of seconds it took to solve the puzzle.
 * @param {number} numMissed The number of incorrect guesses.
 * @return The new score object.
 * @type {Score}
 */
ISOLACE.sudoku.Persistence.prototype.addScore = function(time, numMissed) {
    assertNumber(time, 'time must be numeric value');
    assertNumber(numMissed, 'numMissed must be numeric value');
    
    var date = new Date().getTime();
    var puzzleLevel = $Persistence.getPuzzleLevel();
    var puzzleId = $Persistence.getPuzzleIndex();
    var symbolType = $Persistence.getUseColorSymbols() ? 1 : 0;
    var score = new ISOLACE.Score();
    score.setDate(date);
    score.setNumMissed(numMissed);
    score.setPuzzleId(puzzleId);
    score.setPuzzleLevel(puzzleLevel);
    score.setTime(time);
    score.setSymbolType(symbolType);
    score.setUserId(UID);

    var scores = $Persistence.getScores();
    scores.push(score);
    $Persistence.setScores(scores);

    return score;
};

/**
 * @method getScores
 * @return An array of Score objects.
 * @type {array[Score]}
 */
ISOLACE.sudoku.Persistence.prototype.getScores = function() {
    var a = [];
    var scoresStr = $Persistence.get('scores');
    if(scoresStr === null) {
        return a;
    }
    scores = scoresStr.split('|');
    for(var i = 0; i < scores.length; i++) {
        var score = new ISOLACE.Score();
        score.fromScoreCsv(scores[i]);
        a.push(score);
    }

    return a.reverse();
};

/**
 * @method setScores
 * @param {array[Score]} scores An array of Score objects.
 */
ISOLACE.sudoku.Persistence.prototype.setScores = function(scores) {
    this.remove('scores', '');
    var s = '';
    for(var i = 0; i < scores.length; i++) {
        if(s != '') {
            s += '|';
        }
        var scoreCsvStr = scores[i].toScoreCsv();
        s += scoreCsvStr;
    }
    var scoresStr = $Persistence.set('scores', s);
};

/**
 * @method getShowMarkerConflict
 * @return True if conflicting markers should be shown in red.
 * @type {boolean}
 */
ISOLACE.sudoku.Persistence.prototype.getShowMarkerConflict = function() {
    var showMarkerConflict = this.get('showMarkerConflict');
    if(showMarkerConflict === null) {
        showMarkerConflict = true;
        this.set('showMarkerConflict', showMarkerConflict);
    } else {
        showMarkerConflict = parseBool(showMarkerConflict);
    }
    return showMarkerConflict;
};

/**
 * @method setShowMarkerConflict
 * @param {boolean} showMarkerConflict True if conflicting markers should be shown in red.
 */
ISOLACE.sudoku.Persistence.prototype.setShowMarkerConflict = function(showMarkerConflict) {
    var showMarkerConflict = this.set('showMarkerConflict', '' + showMarkerConflict);
    $GameEvent.fireShowMarkerConflict(showMarkerConflict);
};

/**
 * @method getShowGuessConflict
 * @return True if incorrect guess should be flagged.
 * @type {boolean}
 */
ISOLACE.sudoku.Persistence.prototype.getShowGuessConflict = function() {
    var showGuessConflict = this.get('showGuessConflict');
    if(showGuessConflict === null) {
        showGuessConflict = true;
        this.set('showGuessConflict', showGuessConflict);
    } else {
        showGuessConflict = parseBool(showGuessConflict);
    }
    return showGuessConflict;
};

/**
 * @method setShowGuessConflict
 * @param {boolean} showGuessConflict True if incorrect guess should be flagged.
 */
ISOLACE.sudoku.Persistence.prototype.setShowGuessConflict = function(showGuessConflict) {
    var showGuessConflict = this.set('showGuessConflict', '' + showGuessConflict);
    $GameEvent.fireShowGuessConflict(showGuessConflict);
};

/**
 * @method getShowTimer
 * @return True if timer should be shown.
 * @type {boolean}
 */
ISOLACE.sudoku.Persistence.prototype.getShowTimer = function() {
    var showTimer = this.get('showTimer');
    if(showTimer === null) {
        showTimer = true;
        this.set('showTimer', showTimer);
    } else {
        showTimer = parseBool(showTimer);
    }
    return showTimer;
};

/**
 * @method setShowTimer
 * @param {boolean} showTimer The puzzle level.
 */
ISOLACE.sudoku.Persistence.prototype.setShowTimer = function(showTimer) {
    var showTimer = this.set('showTimer', '' + showTimer);
    $GameEvent.fireShowTimer(showTimer);
};

/**
 * @method getUseColorSymbols
 * @return True if symbols should be rendered as colors.
 * @type {boolean}
 */
ISOLACE.sudoku.Persistence.prototype.getUseColorSymbols = function() {
    var useColorSymbols = this.get('useColorSymbols');
    if(useColorSymbols === null) {
        useColorSymbols = false;
        this.set('useColorSymbols', useColorSymbols);
    } else {
        useColorSymbols = parseBool(useColorSymbols);
    }
    return useColorSymbols;
};

/**
 * @method setUseColorSymbols
 * @param {boolean} useColorSymbols True if symbols should be rendered as colors.
 */
ISOLACE.sudoku.Persistence.prototype.setUseColorSymbols = function(useColorSymbols) {
    var showGuessConflict = this.set('useColorSymbols', '' + useColorSymbols);
    $GameEvent.fireUseColorSymbols(useColorSymbols);
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
