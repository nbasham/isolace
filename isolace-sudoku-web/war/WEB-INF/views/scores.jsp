<jsp:directive.include file="/WEB-INF/views/includes.jsp"/>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>

<%@ page import="com.isolace.sudoku.GameRecord" %>
<%@ page import="java.util.List" %>

<html>

<head>
</head>

<body>

        <table width="300px">
            <tr>
                <thead>
                    <th>Nickname</th>
                    <th>Level</th>
                    <th>Game Number</th>
                    <th>Time</th>
                    <th>Date</th>
                </thead>
            </tr>
            <%= request.getAttribute("rows") %>
        </table>
</body>
</html>