<jsp:directive.include file="/WEB-INF/views/includes.jsp"/>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>

<html>

<head>
<script type="text/javascript" src="/scripts/jquery-1.3.2.js"></script>
<script>
var index = <%= request.getAttribute("index") %>;

function startGame() {
    var level = $('#levelList').val();
    window.location = "/sudoku/play/level/" + level + "/index/" + index;
}

$(document).ready(function () {
    var level = <%= request.getAttribute("level") %>;   
    $('#levelList').val(level);
});


</script>
</head>

<body>
    <a href="javascript:startGame();">Start Sudoku</a>
    <select id='levelList'>
      <option value="0">Easy</option>
      <option value="1">Medium</option>
      <option value="2">Hard</option>
      <option value="3">Challenger</option>
    </select>

    <br/>

    <a href="/sudoku/scores">View Scores</a>

</body>
</html>