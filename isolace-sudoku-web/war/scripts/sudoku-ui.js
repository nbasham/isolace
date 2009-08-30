ISOLACE.namespace("sudoku");

/**
 * ui provides all user interface logic required to implement
 * Sudoku in JavaScript. JQuery and YUI are required.
 * 
 * <pre>
 * Example usage:
 *        var problem = [8,6,4,5,3,1,2,9,7,9,5,1,6,2,7,8,4,3,2,7,3,4,8,9,6,1,5,1,4,7,9,5,6,3,8,2,3,9,6,2,4,8,5,7,1,5,8,2,1,7,3,9,6,4,6,2,5,8,1,4,7,3,9,7,1,9,3,6,5,4,2,8,4,3,8,7,9,2,1,5,6];
 *        var mask = [2,7,11,12,15,18,21,23,26,29,31,34,35,36,39,40,44,45,46,49,51,54,56,60,62,64,67,68,73,77,78];
 *        $(document).ready(function(){
 *            $logic.initialize(problem, mask);
 *            $('#someDiv').html($ui.getBoardHTML() + $ui.getTimerHTML());
 *            $ui.startGame($logic);
 *        }
 * </pre>
 * 
 * @class ui
 * @namespace ISOLACE.sudoku
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009 iRise. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 * @see ISOLACE.sudoku.logic
 */
ISOLACE.sudoku.ui = function() {
    this.KEY_RETURN = 13;
    this.KEY_TAB = 9;
    this.KEY_BACKSPACE = 8;
    this.KEY_LEFT_ARROW = 37;
    this.KEY_RIGHT_ARROW = 39;
    this.KEY_UP_ARROW = 38;
    this.KEY_DOWN_ARROW = 40;
    /**
     * 1 to 9 inclusive including key pad
     */
    this.KEY_NUMBERS = [49,50,51,52,53,54,55,56,57,97,98,99,100,101,102,103,104,105];
    /**
     * don't map properly on Mac
     */
    this.KEY_FUNCTION_NUMBERS = [112,113,114,115,116,117,118,119,120];
    this.playTime = 0;
    this.playTimer = undefined;
    this.sudokuLogic = undefined;
    this.renderer = undefined;
};

/**
 * Create Sudoku board HTML string.
 * 
 * @method getBoardHTML
 * @ return {string} Board HTML;
 */
ISOLACE.sudoku.ui.prototype.getBoardHTML = function(top, left) {
    var cellIndex = 0;
    var html = '';
    html += "<div id='board' class='board' style='top: " + top + "; left: " + left + ";'>";
    for(var row = 0; row < 9; row++) {
        html += "<div class='cellrow'>";
        for(var col = 0; col < 9; col++) {
            html += "<div id='c" + cellIndex + "' class='cell'>&nbsp;</div>";
            cellIndex++;
        }
        html += "</div>";
    }
    html += "</div>";
    
    return html;
};

/**
 * Create Sudoku timer HTML string.
 * 
 * @method getTimerHTML
 * @ return {string} Timer HTML;
 */
ISOLACE.sudoku.ui.prototype.getTimerHTML = function(top, left) {
    return "<div id='timer' class='timer' style='top: " + top + "; left: " + left + ";'>00:00</div>";
};

/**
 * Entry point into Sudoku UI logic.
 * 
 * <ul>
 * <li>Iterate over each cell</li>
 * <ul>
 * <li>Add style classes</li>
 * <li>Attach click and mouseover events</li>
 * </ul>
 * <li>Attach key events</li>
 * <li>Start timer</li>
 * </ul>
 * @param {ISOLACE.sudoku.logic} Object to handle Sudoku game logic.
 * @param {ISOLACE.sudoku.ui.renderer} Object to handle cell rendering.
 * @method startGame
 */
ISOLACE.sudoku.ui.prototype.startGame = function(logic) {
    $ui.sudokuLogic = logic;
    $('.cell').each( function(i, el) {

        if ($ui.sudokuLogic.getSolution(i) === 0) {
            $(el).addClass('unrevealedCell');
            $(el).bind("mouseenter", {
                index :i
            }, $ui.handleSelectEvent);
            $(el).bind("mouseleave", {
                index :i
            }, $ui.handleUnselectEvent);
        } else {
            $renderer.updateRevealedCell(i, $ui.sudokuLogic.getSolution(i));
        }

        if ($ui.sudokuLogic.getGridFromIndex(i) % 2 === 0) {
            $(el).addClass('evenGrid');
        } else {
            $(el).addClass('oddGrid');
        }

        var row = $ui.sudokuLogic.getRowFromIndex(i);
        if (row == 2 || row == 5) {
            $(el).addClass('rowBorder');
        }
        var col = $ui.sudokuLogic.getColFromIndex(i);
        if (col == 2 || col == 5) {
            $(el).addClass('colBorder');
        }
    });
    $ui.mapKeysToEvents();
    $ui.startTimer();
};

/**
 * Select the cell to the left of the currently selected cell.
 * 
 * @method moveLeft
 */
ISOLACE.sudoku.ui.prototype.moveLeft = function() {
    var sel = $ui.sudokuLogic.selectedIndex();
    sel = $ui.dec(sel, 1);
    $ui.selectCell(sel);
};

/**
 * Select the cell to the left of the currently selected cell,
 * skipping revealed cells.
 * 
 * @method moveLeftToNextOpen
 */
ISOLACE.sudoku.ui.prototype.moveLeftToNextOpen = function() {
    var sel = $ui.sudokuLogic.selectedIndex();
    sel = $ui.dec(sel, 1);
    while($ui.sudokuLogic.revealed(sel)) {
        sel = $ui.dec(sel, 1);
    }
    $ui.selectCell(sel);
};

/**
 * Select the cell above the currently selected cell.
 * 
 * @method moveUp
 */
ISOLACE.sudoku.ui.prototype.moveUp = function() {
    var sel = $ui.sudokuLogic.selectedIndex();
    sel = $ui.dec(sel, 9);
    $ui.selectCell(sel);
};

/**
 * Select the cell above the currently selected cell,
 * skipping revealed cells.
 * 
 * @method moveUpToNextOpen
 */
ISOLACE.sudoku.ui.prototype.moveUpToNextOpen = function() {
    var sel = $ui.sudokuLogic.selectedIndex();
    sel = $ui.dec(sel, 9);
    while($ui.sudokuLogic.revealed(sel)) {
        sel = $ui.dec(sel, 9);
    }
    $ui.selectCell(sel);
};

/**
 * Select the cell to the right of the currently selected cell.
 * 
 * @method moveRight
 */
ISOLACE.sudoku.ui.prototype.moveRight = function() {
    var sel = $ui.sudokuLogic.selectedIndex();
    sel = $ui.inc(sel, 1);
    $ui.selectCell(sel);
};

/**
 * Select the cell to the right of the currently selected cell,
 * skipping revealed cells.
 * 
 * @method moveRightToNextOpen
 */
ISOLACE.sudoku.ui.prototype.moveRightToNextOpen = function() {
    var sel = $ui.sudokuLogic.selectedIndex();
    sel = $ui.inc(sel, 1);
    while($ui.sudokuLogic.revealed(sel)) {
        sel = $ui.inc(sel, 1);
    }
    $ui.selectCell(sel);
};

/**
 * Select the cell below the currently selected cell.
 * 
 * @method moveDown
 */
ISOLACE.sudoku.ui.prototype.moveDown = function() {
    var sel = $ui.sudokuLogic.selectedIndex();
    sel = $ui.inc(sel, 9);
    $ui.selectCell(sel);
};

/**
 * Select the cell below the currently selected cell,
 * skipping revealed cells.
 * 
 * @method moveDownToNextOpen
 */
ISOLACE.sudoku.ui.prototype.moveDownToNextOpen = function() {
    var sel = $ui.sudokuLogic.selectedIndex();
    sel = $ui.inc(sel, 9);
    while($ui.sudokuLogic.revealed(sel)) {
        sel = $ui.inc(sel, 9);
    }
    $ui.selectCell(sel);
};

/**
 * This function doesn't do anything, it exists for code readability
 * and to map a do nothing function in a consistent manner. By
 * default we map the backspace key to <code>ignore</code> so that
 * the user doesn't inadvertently refresh the page when attempting to
 * clear a cell.
 * 
 * @method ignore
 */
ISOLACE.sudoku.ui.prototype.ignore = function() {
};

/**
 * Attach a function to a key event. Events
 * are not propagated. Implementation introduces
 * a YUI dependency.
 * 
 * @param {function} Function to call on key event.
 * @param {object} Key values to map.
 * @method setupKeyHandler
 */
ISOLACE.sudoku.ui.prototype.setupKeyHandler = function(f, keys) {
    var handler = function(type, args, obj) {
        YAHOO.util.Event.stopEvent(args[1]);
        f(args[0] - 48);
    };
    var listener = new YAHOO.util.KeyListener(document, keys, handler);
    listener.enable();
};

/**
 * Map keys to event handlers. In the future it might be nice
 * to provide the user with a UI to map the keys.
 * 
 * @method mapKeysToEvents
 */
ISOLACE.sudoku.ui.prototype.mapKeysToEvents = function() {
    $ui.setupKeyHandler($ui.hint, { shift: true, keys: $ui.KEY_NUMBERS});
    $ui.setupKeyHandler($ui.guess, { shift: false, keys: $ui.KEY_NUMBERS});
    $ui.setupKeyHandler($ui.moveLeft, {keys: $ui.KEY_LEFT_ARROW});
    $ui.setupKeyHandler($ui.moveLeft, { shift: true, keys: $ui.KEY_TAB});
    $ui.setupKeyHandler($ui.moveRight, {keys: [$ui.KEY_TAB, $ui.KEY_RIGHT_ARROW]});
    $ui.setupKeyHandler($ui.moveUp, {keys: $ui.KEY_UP_ARROW});
    $ui.setupKeyHandler($ui.moveUp, { shift: true, keys: $ui.KEY_RETURN});
    $ui.setupKeyHandler($ui.moveDown, {keys: [$ui.KEY_RETURN, $ui.KEY_DOWN_ARROW]});
    $ui.setupKeyHandler($ui.ignore, {keys: $ui.KEY_BACKSPACE});
};

/**
 * Start the game timer. This will call <code>updateTimer</code>
 * once a second.
 * 
 * @method startTimer
 * @see ISOLACE.sudoku.ui.updateTimer
 */
ISOLACE.sudoku.ui.prototype.startTimer = function() {
    $ui.playTimer = setInterval($ui.updateTimer, 1000);
};

/**
 * Update the game timer. Occurs once a second.
 * 
 * @method updateTimer
 * @see ISOLACE.sudoku.ui.startTimer
 */
ISOLACE.sudoku.ui.prototype.updateTimer = function() {
    var timeStr = '';
    var min = Math.floor($ui.playTime / 60);
    var sec = $ui.playTime % 60;
    if(min < 10) {
        timeStr = '0' + min;
    } else {
        timeStr = '' + min;
    }
    timeStr += ':';
    if(sec < 10) {
        timeStr += '0' + sec;
    } else {
        timeStr += '' + sec;
    }
    $ui.playTime++;
    $('.timer').text(timeStr);
    
};

/**
 * Increment value to the amount and mod at 81. Private
 * utility used by moveXXX functions;
 * 
 * @private
 * @param {int} Initial value.
 * @param {int} Amount to increment by.
 * @method inc
 * @return {int} Incremented value.
 */
ISOLACE.sudoku.ui.prototype.inc = function(value, amount) {
    value += amount;
    if (value < 81) {
        return value;
    } else {
        return Math.abs(81 - value);
    }
};

/**
 * Decrement value to the amount and mod at 0. Private
 * utility used by moveXXX functions;
 * 
 * @private
 * @param {int} Initial value.
 * @param {int} Amount to decrement by.
 * @method dec
 * @return {int} Decremented value.
 */
ISOLACE.sudoku.ui.prototype.dec = function(value, amount) {
    value -= amount;
    if (value >= 0) {
        return value;
    } else {
        return 81 + value;
    }
};

/**
 * Show a message to the user. Need to implement dialog functionality, for
 * now using alert.
 * 
 * @param {string} Message to be displayed.
 * @method showMessage
 */
ISOLACE.sudoku.ui.prototype.showMessage = function(msg) {
    alert(msg);
};

/**
 * Update the HTML for all board cells.
 * 
 * @method updateBoard
 */
ISOLACE.sudoku.ui.prototype.updateBoard = function() {
    for(var index = 0; index < 81; index++) {
        if(!$ui.sudokuLogic.revealed(index)) {
            if($ui.sudokuLogic.hasHint(index)) {
                $renderer.updateHintCell(index);
            } else {
                var value = $ui.sudokuLogic.getSolution(index);
                var conflicts = $ui.sudokuLogic.conflicts(index, value);
                $renderer.updateGuessCell(index, value, conflicts);
            }
        }
    }
};

/**
 * Handle a user guess.
 * 
 * @param {int} Value of user's guess (1 to 9).
 * @method guess
 */
ISOLACE.sudoku.ui.prototype.guess = function(value) {
    var selectedIndex = $ui.sudokuLogic.selectedIndex();
    if (selectedIndex < 0) {
        $ui.showMessage('Select a cell before guessing.');
        return;
    }
    if ($ui.sudokuLogic.revealed(selectedIndex)) {
        return;
    }
    $ui.sudokuLogic.guess(selectedIndex, value);
    $ui.updateBoard();

    if ($ui.sudokuLogic.solved()) {
        var playingTime = $ui.playTime;
        $.ajax({url: '/sudoku/gameOver/level/' + GAME.level + '/index/' + GAME.index + '/time/' + playingTime});
        clearInterval($ui.playTimer);
        $ui.unselectCell(selectedIndex);
        //$('.guessCell').each(function() {YAHOO.util.Event.removeListener(this.id);alert(this.id, 'mouseover')});
        // show timer or message with time
        $ui.showMessage('You did it!!');
    }
};

/**
 * Handle a user's hint.
 * 
 * @param {int} Value of user's hint (1 to 9).
 * @method hint
 */
ISOLACE.sudoku.ui.prototype.hint = function(hintValue) {
    var selectedIndex = $ui.sudokuLogic.selectedIndex();
    if (selectedIndex < 0) {
        $ui.showMessage('Select a cell before choosing a hint.');
        return;
    }
    if ($ui.sudokuLogic.revealed(selectedIndex)) {
        return;
    }
    $ui.sudokuLogic.setHint(selectedIndex, hintValue);
    $ui.updateBoard();
};

/**
 * Before selecting a cell, unselect the current cell.
 * 
 * @param {int} Index of cell to un-select.
 * @method unselectCell
 */
ISOLACE.sudoku.ui.prototype.unselectCell = function(index) {
    var cell = $('#c' + index);
    $selectioner.removeSelectionDecoration(cell, index);
    
    // update grid style
    var grid = $ui.sudokuLogic.getGridFromIndex(index);
    if (grid % 2 === 0) {
        cell.addClass('evenGrid');
    } else {
        cell.addClass('oddGrid');
    }
};

/**
 * Select a cell.
 * 
 * @param {int} Index of cell to uselect.
 * @method selectCell
 */
ISOLACE.sudoku.ui.prototype.selectCell = function(index) {
    $ui.unselectCell($ui.sudokuLogic.selectedIndex());
    $ui.sudokuLogic.selectedIndex(index);
    var cell = $('#c' + index);
    $selectioner.addSelectionDecoration(cell, index);
    
    // update grid style
    var grid = $ui.sudokuLogic.getGridFromIndex(index);
    if (grid % 2 === 0) {
        cell.removeClass('evenGrid');
    } else {
        cell.removeClass('oddGrid');
    }
};

/**
 * Gets index from event and calls selectCell.
 * 
 * @param {object} YUI event.
 * @method handleSelectEvent
 */
ISOLACE.sudoku.ui.prototype.handleSelectEvent = function(e) {
    $ui.selectCell(e.data.index);
};

/**
 * Gets index from event and calls unselectCell.
 * 
 * @param {object} YUI event.
 * @method handleUnselectEvent
 */
ISOLACE.sudoku.ui.prototype.handleUnselectEvent = function(e) {
    $ui.unselectCell(e.data.index);
};

if (typeof $ui === "undefined" || !$ui) {
       /**
        * A singleton instance of ISOLACE.sudoku.ui automatically
        * created as a convenience so $logic can be used instead of
        * ISOLACE.sudoku.ui.
        * @class ISOLACE.sudoku.ui
        * @static
        */
       var $ui = new ISOLACE.sudoku.ui();
}
