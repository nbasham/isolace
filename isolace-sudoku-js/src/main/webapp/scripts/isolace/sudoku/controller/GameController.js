ISOLACE.namespace("sudoku");

/**
 * GameController handles game flow.
 * @class GameController
 * @namespace ISOLACE.sudoku.controller
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 */
ISOLACE.sudoku.GameController = function(puzzle) {
    this.mainMenuView = new ISOLACE.sudoku.MainMenuView();
    $Events.handleShowBoard(this, this.showBoard);
    $Events.handleShowMainMenu(this, this.showMainMenu);
};

/**
 * Show the main menu.
 * @method showMenu
 */
ISOLACE.sudoku.GameController.prototype.showMainMenu = function() {
    this.mainMenuView.show();
};

/**
 * Hide the main menu.
 * @method hideMenu
 */
ISOLACE.sudoku.GameController.prototype.hideMainMenu = function() {
    this.mainMenuView.hide();
};

/**
 * Show the main menu.
 * @method showMenu
 */
ISOLACE.sudoku.GameController.prototype.showBoard = function(level) {
    this.hideMainMenu();
    var p = this.getNextPuzzle(level);
    this.boardView = new ISOLACE.sudoku.BoardView(p, {});
    this.boardView.show();
    this.boardView.start();
};

/**
 * Hide the main menu.
 * @method hideMenu
 */
ISOLACE.sudoku.GameController.prototype.hideBoard = function() {
    this.boardView.hide();
};

/**
 * Make a server call, retrieve from cookie, or data lookup and get the next
 * puzzle at the given level.
 * @method getNextPuzzle
 */
ISOLACE.sudoku.GameController.prototype.getNextPuzzle = function(level) {
    return puzzle;
};
