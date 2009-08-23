<jsp:directive.include file="/WEB-INF/views/includes.jsp"/>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>

<html>

<head>

<link rel="stylesheet" href="/stylesheets/reset-fonts-grids.css" type="text/css" media="screen" />
<link rel="stylesheet" href="/stylesheets/sudoku.css" type="text/css" media="screen" />
<link rel="stylesheet" href="/stylesheets/sudoku-selection-background.css" type="text/css" media="screen" />
<link rel="stylesheet" href="/stylesheets/sudoku-render-text.css" type="text/css" media="screen" />

<script src="/scripts/jquery-1.3.2.js"></script>
<script type="text/javascript" src="/scripts/yahoo-dom-event.js"></script>
<script src="/scripts/isolace.js"></script>
<script src="/scripts/sudoku-logic.js"></script>
<script src="/scripts/sudoku-ui.js"></script>
<script src="/scripts/sudoku-render-text.js"></script>
<script src="/scripts/sudoku-selection-background.js"></script>


<script type="text/javascript">

$(document).ready(function () {

    var puzzle = <%= request.getAttribute("puzzle") %>;
    var revealed = <%= request.getAttribute("revealed") %>;
    $logic.initialize(puzzle, revealed);
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