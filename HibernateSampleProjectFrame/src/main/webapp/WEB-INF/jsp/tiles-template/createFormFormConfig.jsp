<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page isELIgnored="false"%>
<script
	src="${pageContext.request.contextPath}/resources/js/sift/testcase/customActions.js"></script>
<!-- <a href="uploadFile.do">Test Builder</a> -->

<div id="content">
	<div class="wrapper">
		<div class="crumbs">
			<ul id="breadcrumbs" class="breadcrumb">
				<li><a href="${listPrograms_Url}"> Test Data Builder </a></li>
				<li><a href="${createProgram_Url}"> Render Form </a></li>
			</ul>
		</div>
		<div class="page-header">
			<div class="page-title">
				<h5>Render Form</h5>
				<span> Form generated based on the uploaded file </span>
			</div>
		</div>

		<div class="actions-wrapper">
			<div align="center">
				<b><span class="text-success" style="display: none"
					id="successMsg"></span></b> <b><span class="text-error"
					style="display: none" id="failureMsg"></span></b>
			</div>
			<div class="row-fluid">
				<div class="span12">
					<form class="form-horizontal form-Program"
						action="generateTestFile.do?configurationName=${configurationName}"
						method="post">
						<div class="widget">
							<div class="navbar">
								<div class="navbar-inner">
									<h6>Configurable fields in the CDR</h6>
								</div>
							</div>
							<div class="well">
								<%-- <c:forEach begin="0" end="${fn:length(placeHolders) - 1}" var="index">

									<div class="control-group">
										<div class="span6">
											<div class="span3">
												<label class="control-label span12"> <c:out
														value='${placeHolders[index]}' />
												</label>
											</div>
											<div class="span7">
												<input type="text" class="span12"
													name="<c:out value='${placeHolders[index]}' />"  />
											</div>
										</div>
									</div>
								</c:forEach> --%>
								<c:forEach begin="0" end="${fn:length(placeHolders) - 1}"
									var="index">
									<c:set var="parts"
										value="${fn:split(placeHolders[index], ':')}" />

									<c:if test="${not empty parts[1]}">
										<c:set var="items" value="${fn:split(parts[1], ',')}" />
										<c:if test="${fn:length(items) gt 1}">
											<div class="control-group">
												<div class="span6">
													<div class="span3">
														<label class="control-label span12"> <c:out
																value='${parts[0]}' />
														</label>
													</div>
													<div class="span7">
														<select class="span3 <c:out value='${parts[2]}' />"
															name="<c:out value='${parts[0]}' />"
															id="<c:out value='${parts[0]}' />">
															<c:forTokens items="${parts[1]}" delims="," var="mySplit">
																<option value="<c:out value='${mySplit}' />"><c:out
																		value='${mySplit}' /></option>

															</c:forTokens>
														</select>
													</div>
												</div>
											</div>
										</c:if>
										<c:if test="${fn:length(items) eq 1}">
											<div class="control-group">
												<div class="span6">
													<div class="span3">
														<label class="control-label span12"> <c:out
																value='${parts[0]}' />
														</label>
													</div>
													<div class="span7">
														<input type="text"
															class="span12 <c:out value='${parts[2]}' />"
															name="<c:out value='${parts[0]}' />"
															id="<c:out value='${parts[0]}' />"
															value="<c:out value='${parts[1]}' />" />
													</div>
												</div>
											</div>
										</c:if>
									</c:if>
									<c:if test="${empty parts[1]}">
										<div class="control-group">
											<div class="span6">
												<div class="span3">
													<label class="control-label span12"> <c:out
															value='${parts[0]}' />
													</label>
												</div>
												<div class="span7">
													<input type="text"
														class="span12 <c:out value='${parts[2]}' />"
														name="<c:out value='${parts[0]}' />"
														id="<c:out value='${parts[0]}' />" />
												</div>
											</div>
										</div>
									</c:if>

									<br />
								</c:forEach>
							</div>
						</div>
						<!-- <button type="submit">Generate</button> -->
						<div class="row-fluid">
							<div class="control-group">
								<div class="span2 center">
									<button type="submit" id="createButton"
										class="btn btn-block btn-primary">Generate Test File</button>
								</div>
								<!-- <div class="span2 center">
									<button type="button" id="cancelButton" class="btn btn-block btn-warning">
										<spring:message code="common.label.Cancel" />
									</button>
								</div> -->
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>