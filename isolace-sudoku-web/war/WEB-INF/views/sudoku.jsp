<jsp:directive.include file="/WEB-INF/views/includes.jsp"/>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>

<html>

<head>

<link rel="stylesheet" href="/stylesheets/reset-fonts-grids.css" type="text/css" media="screen" />
<link rel="stylesheet" href="/stylesheets/sudoku.css" type="text/css" media="screen" />
<link rel="stylesheet" href="/stylesheets/sudoku-selection-background.css" type="text/css" media="screen" />
<link rel="stylesheet" href="/stylesheets/sudoku-render-text.css" type="text/css" media="screen" />

<script type="text/javascript" src="/scripts/jquery-1.3.2.js"></script>
<script type="text/javascript" src="/scripts/yahoo-dom-event.js"></script>
<script type="text/javascript" src="/scripts/isolace.js"></script>
<script type="text/javascript" src="/scripts/sudoku-logic.js"></script>
<script type="text/javascript" src="/scripts/sudoku-ui.js"></script>
<script type="text/javascript" src="/scripts/sudoku-render-text.js"></script>
<script type="text/javascript" src="/scripts/sudoku-selection-background.js"></script>

<script type="text/javascript">

var GAME = {
        level: <%= request.getAttribute("level") %>,
        index: <%= request.getAttribute("index") %>,
        puzzle: <%= request.getAttribute("puzzle") %>,
        revealed: <%= request.getAttribute("revealed") %>
};

$(document).ready(function () {

    var revealed = GAME.revealed;
    if(GAME.index == 101)
        revealed = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79];
    $logic.initialize(GAME.puzzle, revealed);
    $('#gameDiv').append($ui.getTimerHTML(10, 14));
    $('#gameDiv').append($ui.getBoardHTML(10, 100));
    $ui.startGame($logic);   
});

</script>

<style type="text/css">
body, li, a {
    font-family: Arial, sans-serif;
    font-size: 64px;
    text-align: left;
}

</style>
</head>

<body>

<div id='gameDiv' style='height: 100%; width: 100%;'>
    &nbsp;
</div>

<div style='display: block; position: absolute; top: 130; left: 700; font-size: 14px'>
Marker - shift 1 to shift 9<br/>
Move left - left arrow, shift tab<br/>
Move right - right arrow, tab<br/>
Move up - up arrow, shift return<br/>
Move down - down arrow, return<br/>
<a style='font-size: 14px' href="javascript:$('#timer').toggle();">Toggle timer</a>
</div>

</body>
</html>