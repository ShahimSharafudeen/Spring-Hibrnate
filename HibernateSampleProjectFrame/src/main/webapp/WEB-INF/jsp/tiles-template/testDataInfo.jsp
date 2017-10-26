<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page isELIgnored="false"%>
<!-- <a href="uploadFile.do">Test Builder</a> -->

<div id="content">
	<div class="wrapper">
		<div class="crumbs">
			<ul id="breadcrumbs" class="breadcrumb">
				<li><a href="${listPrograms_Url}"> Test Data Builder </a></li>
				<li><a href="${createProgram_Url}"> Render Form </a></li>
				<li><a href="${createProgram_Url}"> Test Data Information </a></li>
			</ul>
		</div>
		<div class="page-header">
			<div class="page-title">
				<h5>Test Data Information</h5>
				<span> Information about created test data </span>
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
						action="generateTestFile.do" method="post">
						<div class="widget">
							
							<div class="well">
							<div><h6> Test data file for ${configurationName} has been created at <span style="color:red;">${createdFileName}</span>  </h6></div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>