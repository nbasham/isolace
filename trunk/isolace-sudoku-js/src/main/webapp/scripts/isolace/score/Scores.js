/**
 * Create a new Scores object.
 * @class Handles score manipulation. While this is not an efficient
 *        implementation, if the score list contains 1000 entries, a new entry
 *        can be added, saved, loaded and a new array of Score objects can be
 *        generated in about 20ms.
 * @namespace ISOLACE
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 */
ISOLACE.Scores = function() {
};

/**
 * Add and save the given score. The score will be marked with the current
 * date/time.
 * @method add
 * @param {number} puzzleId The unique puzzle identifier.
 * @param {number} time The number of seconds it took to solve the puzzle.
 * @param {number} numMissed The number of incorrect guesses.
 */
ISOLACE.Scores.prototype.add = function(puzzleId, time, numMissed) {
    assertNumber(puzzleId, 'puzzleId must be numeric value');
    assertNumber(time, 'time must be numeric value');
    assertNumber(numMissed, 'numMissed must be numeric value');
    var date = new Date().getTime();
    var newScore = puzzleId + ',' + date + ',' + time + ',' + numMissed;
    var existingScores = $Persistence.get('scores');
    if(existingScores === null) {
        existingScores = newScore;
    } else {
        existingScores += '|' + newScore;
    }
    $Persistence.set('scores', existingScores);
    var scoresStr = $Persistence.get('scores');
    var score = this.scoreFromString(newScore);
    return score;
};

/**
 * Get the scores.
 * @method get
 * @return An array of all scores.
 * @type array[Score]
 */
ISOLACE.Scores.prototype.get = function() {
    var a = [];
    var scoresStr = $Persistence.get('scores');
    // scoresStr = null;
    if(scoresStr == null) {
        return a;
    }
    scores = scoresStr.split('|');
    for( var i = 0; i < scores.length; i++) {
        var score = this.scoreFromString(scores[i]);
        a.push(score);
    }

    return a;
};

/**
 * Takes a CSV string and converts it into a Score object.
 * @method scoreFromString
 * @param {string} csvString CSV score string. 
 * @return A Score object 
 * @type {Score} 
 */
ISOLACE.Scores.prototype.scoreFromString = function(csvString) {
    var s = csvString.split(',');
    var score = new ISOLACE.Score(parseInt(s[0]), parseInt(s[1]), parseInt(s[2]), parseInt(s[3]));
    return score;
};

if(typeof $Scores == "undefined" || !$Scores) {
    /**
     * A singleton instance of ISOLACE.Scores automatically created as a
     * convenience vs. creating a new ISOLACE.Scores for each instance.
     * @class ISOLACE.Scores
     * @static
     */
    var $Scores = new ISOLACE.Scores();
}
