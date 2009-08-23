<jsp:directive.include file="/WEB-INF/views/includes.jsp"/>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>

<html>

<head>

</head>

<body>
<a href="/sudoku/play/level/<%= request.getAttribute("level") %>/index/<%= request.getAttribute("index") %>">Start Sudoku</a>

</body>
</html>