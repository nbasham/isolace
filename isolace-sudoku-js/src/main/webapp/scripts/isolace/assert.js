/**
 * Throw an exception if value is true.
 * 
 * @method assertTrue
 * @param {boolean} value Value to check.
 * @param {string} message optional Message to report if assert is thrown.
 */
function assertTrue(value, message) {
    if(value !== true) {
        if(message === undefined) {
            message = 'Assertion failed.';
        }
        $Log.error(message);
        throw(message);
    }
}

/**
 * Throw an exception if value is true.
 * 
 * @method assertFalse
 * @param {boolean} value Value to check.
 * @param {string} message optional Message to report if assert is thrown.
 */
function assertFalse(value, message) {
    if(value !== false) {
        if(message === undefined) {
            message = 'Assertion failed.';
        }
        $Log.error(message);
        throw(message);
    }
}

/**
 * Throw an exception if value is out of range.
 * 
 * @method assertInRange
 * @param {int} value Value to check.
 * @param {int} lower Lower limit of range, inclusive.
 * @param {int} upper Upper limit of range, inclusive.
 */
function assertInRange(value, lower, upper) {
    if(value < lower || value > upper) {
        var message = "'" + value + "' out of range (must be between " + lower + " and " + upper + " inclusive).";
        $Log.error(message);
        throw(message);
    }
}

/**
 * Throw an exception if value is undefined.
 * 
 * @method assertDefined
 * @param {object} value Value to check.
 */
function assertDefined(value) {
    if(value === undefined) {
        var message = "Undefined value.";
        $Log.error(message);
        throw(message);
    }
}
