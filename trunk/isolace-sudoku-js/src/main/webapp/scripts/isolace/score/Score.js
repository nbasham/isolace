/**
 * Constructs an Score object.
 * @class Score is an immutable object that contains the elements that comprise
 *        a score. This will have to be application specific, and Score should
 *        perform the role of an interface.
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 * @constructor
 * @param {number} puzzleId The unique puzzle identifier.
 * @param {number} date The date/time the puzzle was solved in milliseconds since 1970.
 * @param {number} time The number of seconds it took to solve the puzzle.
 * @param {number} numMissed The number of incorrect guesses.
 */
ISOLACE.Score = function(puzzleId, date, time, numMissed) {
    assertNumber(puzzleId, 'puzzleId should be numeric.');
    assertNumber(date, 'date should be passed as milliseconds since 1970.')
    assertNumber(time, 'time should be numeric, a value representing the number of seconds it took to finsih the game.');
    assertNumber(numMissed, 'numMissed id should be numeric.');
    this.puzzleId = puzzleId;
    this.date = date;
    this.time = time;
    this.numMissed = numMissed;
};

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
    return 30;
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
 * @method getDate
 * @return The date/time the puzzle was solved in milliseconds since 1970.
 * @type number
 */
ISOLACE.Score.prototype.getDate = function() {
    return this.date;
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
 * @method getNumMissed
 * @return The number incorrect guess attempted while solving this puzzle.
 * @type number
 */
ISOLACE.Score.prototype.getNumMissed = function() {
    return this.numMissed;
};

