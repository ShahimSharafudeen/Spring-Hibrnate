<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page isELIgnored="false"%>
<script src="${pageContext.request.contextPath}/resources/js/sift/activemq/activemqsendmsg.js"></script><div id="content">
	<div class="wrapper">
		<div class="crumbs">
			<ul id="breadcrumbs" class="breadcrumb">
				<li><a href="#"> Active MQ Console </a></li>
			</ul>
		</div>
		<div class="page-header">
			<div class="page-title">
				<h5>Active MQ Console</h5>
			</div>
		</div>

		<div class="actions-wrapper">
<!-- 			<div style="text-align: center;"> -->
<!-- 				<input id="testCases" /><br /> <br /> -->
<!-- 			</div> -->
			<div align="center">
				<b><span class="text-success successMsg" style="display: none"
					id="successMsg"></span></b> <b><span class="text-error failureMsg"
					style="display: none" id="failureMsg"></span></b>
			</div>

			<div class="row-fluid">
				<div class="span12">

					<form class="form-horizontal form-Program"
						id="activemqsendmsgForm" action="activemqSendmsg.do"
						method="post">
						<div class="widget">
							<div class="navbar">
								<div class="navbar-inner">
									<h6>Active MQ Dashboard</h6>
								</div>
							</div>
							<div class="well">

								<div class=" control-group">
									<div class="span6">
										<div class="span5">
											<label class="control-label span12">Active MQ Queue Name</label>
										</div>
										<div class="span7">
<!-- 											<input class="span12" type="text" size="50" -->
<!-- 												name="queueName" id="queueName" -->
<!-- 												placeholder="Enter Queue Name" /> -->
												
									<select class="span12" name="queueName" id="queueName">
								<option>---- Select ----</option>
								<c:forTokens items="${activeMqQueues}" delims="," var="mySplit">
									<option value="<c:out value='${mySplit}' />"><c:out
											value='${mySplit}' /></option>

								</c:forTokens>
							</select>
												
										</div>
									</div>
									<div class="span6">
										<div class="span5">
											<label class="control-label span12">Message</label>
										</div>
										<div class="span7">
											<!-- <input class="span12" type="text" size="50" name="testCaseDescription" id="alternateNames" placeholder="testCaseDescription" /> -->
											<textarea id="message" name="message"
												class="span12" rows="3" cols="50"
												placeholder="Enter Message"></textarea>
										</div>
									</div>
								</div>


							</div>
						</div>

						<div align="center">
							<b><span class="text-success successMsg"
								style="display: none" id="successMsg"></span></b> <b><span
								class="text-error failureMsg" style="display: none"
								id="failureMsg"></span></b>
						</div>

					</form>
					<div class="row-fluid">
							<div class="control-group">
								<div class="span2 center">
									<button type="submit" id="activemqsendmsgButton"
										class="btn btn-block btn-primary" data-actionType="send">Send</button>
								</div>

							</div>
						</div>
				</div>
			</div>
		</div>
	</div>
</div>