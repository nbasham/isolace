/**
 * Constructs an Score POJsO.
 * @class Score is an object that contains the elements that comprise a Sudoku score.
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 * @constructor
 */
ISOLACE.Score = function() {
    this.puzzleId = undefined;
    this.puzzleLevel = undefined;
    this.date = undefined;
    this.time = undefined;
    this.numMissed = undefined;
    this.userId = undefined;
    this.symbolType = undefined;
};

ISOLACE.Score.PENALTY = 30;

/**
 * Calculate the score based on time and penalty time.
 * @method getScore
 * @return The total time, in seconds, including penalties.
 * @type number
 */
ISOLACE.Score.prototype.getScore = function() {
    var totalTime = this.getPenalty() * this.numMissed + this.time;
    return totalTime;
};

/**
 * Get the amount to access for each incorrect guess.
 * @method getPenalty
 */
ISOLACE.Score.prototype.getPenalty = function() {
    return ISOLACE.Score.PENALTY;
};

/**
 * @method getPuzzleId
 * @return The puzzle id this score applies to.
 * @type number
 */
ISOLACE.Score.prototype.getPuzzleId = function() {
    return this.puzzleId;
};

/**
 * @method setPuzzleId
 * @param {number} puzzleId The puzzle id this score applies to.
 */
ISOLACE.Score.prototype.setPuzzleId = function(puzzleId) {
    this.puzzleId = puzzleId;
};

/**
 * @method getPuzzleLevel
 * @return The puzzle level this score applies to. The puzzle level i.e NOVICE=0, EASY=1, MEDIUM=2, HARD=3.
 * @type number
 */
ISOLACE.Score.prototype.getPuzzleLevel = function() {
    return this.puzzleLevel;
};

/**
 * @method setPuzzleLevel
 * @param {number} puzzleLevel The puzzle level this score applies to. The puzzle level i.e NOVICE=0, EASY=1, MEDIUM=2, HARD=3.
 */
ISOLACE.Score.prototype.setPuzzleLevel = function(puzzleLevel) {
    this.puzzleLevel = puzzleLevel;
};

/**
 * @method getDate
 * @return The date/time the puzzle was solved in milliseconds since 1970.
 * @type number
 */
ISOLACE.Score.prototype.getDate = function() {
    return this.date;
};

/**
 * @method setDate
 * @param {number} milliseconds The date/time the puzzle was solved in
 *            milliseconds since 1970.
 */
ISOLACE.Score.prototype.setDate = function(milliseconds) {
    this.date = milliseconds;
};

/**
 * @method getTime
 * @return The number of seconds it took to solve this puzzle.
 * @type number
 */
ISOLACE.Score.prototype.getTime = function() {
    return this.time;
};

/**
 * @method setTime
 * @param {number} time The number of seconds it took to solve this puzzle.
 */
ISOLACE.Score.prototype.setTime = function(time) {
    this.time = time;
};

/**
 * @method getNumMissed
 * @return The number incorrect guesses attempted while solving this puzzle.
 * @type number
 */
ISOLACE.Score.prototype.getNumMissed = function() {
    return this.numMissed;
};

/**
 * @method setNumMissed
 * @param {number} numMissed The number incorrect guesses attempted while solving
 *            this puzzle.
 */
ISOLACE.Score.prototype.setNumMissed = function(numMissed) {
    this.numMissed = numMissed;
};

/**
 * @method getUserId
 * @return The user id this score applies to.
 * @type number
 */
ISOLACE.Score.prototype.getUserId = function() {
    return this.userId;
};

/**
 * @method setUserId
 * @param {number} userId The user id this score applies to.
 */
ISOLACE.Score.prototype.setUserId = function(userId) {
    this.userId = userId;
};

/**
 * @method getSymbolType
 * @return The symbol set used when completing the puzzle i.e NUMBER=0, COLOR=2...
 * @type number
 */
ISOLACE.Score.prototype.getSymbolType = function() {
    return this.symbolType;
};

/**
 * @method setSymbolType
 * @param {number} symbolType The symbol set used when completing the puzzle i.e NUMBER=0, COLOR=2...
 */
ISOLACE.Score.prototype.setSymbolType = function(symbolType) {
    this.symbolType = symbolType;
};

/**
 * @method toScoreCsv
 * @return The comma separated values representing the Score object as a string.
 * @type string
 */
ISOLACE.Score.prototype.toScoreCsv = function() {
    var scoreCsvStr = this.getPuzzleId() + ',' + this.getPuzzleLevel() + ',' + this.getDate() + ',' + this.getTime()
            + ',' + this.getNumMissed() + ',' + this.getUserId() + ',' + this.getSymbolType();
    return scoreCsvStr;
};

/**
 * @method fromScoreCsv
 * @param {string} scoreCsvStr The comma separated values to be parsed into the Score object.
 */
ISOLACE.Score.prototype.fromScoreCsv = function(scoreCsvStr) {
    var s = scoreCsvStr.split(',');
    this.setPuzzleId(parseInt(s[0]));
    this.setPuzzleLevel(parseInt(s[1]));
    this.setDate(parseInt(s[2]));
    this.setTime(parseInt(s[3]));
    this.setNumMissed(parseInt(s[4]));
    if(s.length > 4) {
        this.setUserId(parseInt(s[5]));
        this.setSymbolType(parseInt(s[6]));
    } else {
        this.setUserId(UID);
        this.setSymbolType(0);
    }
};

/**
 * @method toTable
 * @return The Table HTMLElement.
 * @type HTMLElement
 */
ISOLACE.Score.prototype.toTable = function() {
    var puzzleId = this.getPuzzleId();
    var level = $SUDOKU_UTIL.levelToString(this.getPuzzleLevel());
    var date = new Date(parseInt(this.getDate()));
    var time = $SUDOKU_UTIL.formatTime(this.getTime());
    var nuMissed = this.getNumMissed();
    var penalty = $SUDOKU_UTIL.formatTime(this.getNumMissed() * this.getPenalty());
    var finalTime = $SUDOKU_UTIL.formatTime(this.getScore());
    var symbolType = this.getSymbolType() == 0 ? 'Number' : 'Color' + "&nbsp;<img src='../images/colors.png'>";
    var sOut = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">';
    sOut += '<tr><td>Puzzle:</td><td>' + level + ' ' + puzzleId + '</td></tr>';
    sOut += '<tr><td>Date:</td><td>' + dateFormat(date, "dddd, mmmm dS, yyyy, h:MM:ss TT") + '</td></tr>';
    sOut += '<tr><td>Symbol Type:</td><td>' + symbolType + '</td></tr>';
    sOut += '<tr><td>Play Time:</td><td>' + time + '</td></tr>';
    sOut += '<tr><td>Incorrect guesses:</td><td>' + nuMissed + '</td></tr>';
    sOut += '<tr><td>Penalty:</td><td>' + penalty + '</td></tr>';
    sOut += '<tr><td>Score:</td><td>' + finalTime + '</td></tr>';
    sOut += '</table>';

    return sOut;
};
