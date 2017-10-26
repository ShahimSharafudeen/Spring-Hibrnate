<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>


<div id="content">
	<div class="wrapper">
		<div class="crumbs">
			<ul id="breadcrumbs" class="breadcrumb">
				<li><a href="${listPrograms_Url}"> Test Data Builder </a></li>
				<li><a href="${createProgram_Url}"> Upload File </a></li>
			</ul>
		</div>
		<div class="page-header">
			<div class="page-title">
				<h5>Upload File</h5>
				<span> Upload Sample Test data file </span>
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
					<form enctype="multipart/form-data" method="post"
						action="createForm.do">
						<div class="widget">
							<div class="navbar">
								<div class="navbar-inner">
									<h6>Upload Sample Test File Here</h6>
								</div>
							</div>
							<div class="well">
								<div class="control-group">
									<div class="span6">
										<div class="span3">
											<label class="control-label span12"> Sample File </label>
										</div>
										<div class="span7">
											<input type="file" name="sampleTestFile"
												class="span12 validate[required]" />
										</div>
									</div>

									<div class="span6">
										<div class="span3">
											<label class="control-label span12"> Separator(, if not provided) </label>
										</div>
										<div class="span7">
											<input type="text" name="delimiter" class="span12" />
										</div>
									</div>
								</div>
								<div class="control-group">
								<div class="span12">
								</div>
								</div>
							</div>
						</div>
						<div class="row-fluid">
							<div class="control-group">
								<div class="span2 center">
									<button type="submit" id="createButton" class="btn btn-block btn-primary">Create Form</button> 
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


