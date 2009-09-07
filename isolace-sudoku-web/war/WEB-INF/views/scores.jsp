<jsp:directive.include file="/WEB-INF/views/includes.jsp" />
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page import="com.isolace.sudoku.Score"%>
<%@ page import="java.util.List"%>
<%@ page isELIgnored="false"%>

<html>

<head>
</head>

<body>

<table width="500px">
    <tr>
    <thead>
        <th>Nickname</th>
        <th>Level</th>
        <th>Time</th>
        <th>Date</th>
    </thead>
    </tr>
    <c:forEach var="score" items="${scores}">
        <tr>
            <td>${score.user}</td>
            <td>${score.level}</td>
            <td>${score.time}</td>
            <td>${score.date}</td>
        </tr>
    </c:forEach>
</table>
<br />
<a href="/sudoku/start">Main Menu</a>
</body>
</html>