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
 * @method toScoreCsv
 * @return The comma separated values representing the Score object as a string.
 * @type string
 */
ISOLACE.Score.prototype.toScoreCsv = function() {
    var scoreCsvStr = this.getPuzzleId() + ',' + this.getPuzzleLevel() + ',' + this.getDate() + ',' + this.getTime()
            + ',' + this.getNumMissed();
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
};

