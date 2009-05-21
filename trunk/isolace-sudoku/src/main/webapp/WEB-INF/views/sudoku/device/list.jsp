<jsp:directive.include file="/WEB-INF/views/includes.jsp"/>
<jsp:directive.include file="/WEB-INF/views/header.jsp"/>
<%@ page import="com.isolace.sudoku.device.Device" %>
<script type="text/javascript">dojo.require("dijit.TitlePane");</script> 
<div dojoType="dijit.TitlePane" style="width: 100%" title="List All Devices">
    <c:if test="${not empty devices}">
        <table width="300px">
        	<thead>
            	<tr>                
                    <th>Id</th>
                    <th>Device Id</th>
                    <th/>
                    <th/>
                    <th/>                
            	</tr>
            </thead>
            <c:forEach items="${devices}" var="device">
                <tr>
                    <td>${device.id}</td>
                    <td>${device.deviceId}</td>
                    <td>
                        <form:form action="/device/${device.id}" method="GET">
                            <input alt="Show Device" src="/static/images/show.png" title="Show Device" type="image" value="Show Device"/>
                        </form:form>
                    </td>
                    <td>
                        <form:form action="/device/${device.id}/form" method="GET">
                            <input alt="Update Device" src="/static/images/update.png" title="Update Device" type="image" value="Update Device"/>
                        </form:form>
                    </td>
                    <td>
                        <form:form action="/device/${device.id}" method="DELETE">
                            <input alt="Delete Device" src="/static/images/delete.png" title="Delete Device" type="image" value="Delete Device"/>
                        </form:form>
                    </td>
                </tr>
            </c:forEach>
        </table>
    </c:if>
    <c:if test="${empty devices}">No devices found.</c:if>
</div>
<form:form action="/device/form" method="GET">
	<input alt="Create Device" src="/static/images/create.png" title="Create Device" type="image" value="Create Device"/>
</form:form>
     
<jsp:directive.include file="/WEB-INF/views/footer.jsp"/>
