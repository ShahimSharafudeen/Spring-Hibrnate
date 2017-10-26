/*
 * Copyright (c) 2015, KNOWESIS PTE LTD. All rights reserved.
 * KNOWESIS PTE LTD. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
package com.seqato.hibernateSampleProjectFrame.util;

/**
 * @author KNOWESIS SIFT PORTAL DEVELOPMENT TEAM
 *
 */
public class PropertyFileReader {

	private String dbUrl;
	private String username;
	private String password;
	private String driverClassName;
	private String queryResultOutputPath;
	private String batchcaseFilePath;
	private String configurationFileName;
	private String activeMQUrl;
	private String segmentIdQueryFileName;
	private String oracleSelectTableNameQuery;
	private String oracleDropTableQuery;
	private String mysqlDropTableQuery;
	private String createTempTableQuery;
	private String selectTableDataQuery;
	private String selectCountTableDataQuery;
	private String referenceTableDataFilterQuery;
	private String oracleReferenceTableDataFilterQuery;
	private String dataFetchSize;
	private String filterComparisonQuery;
	private String CampaignIdListQuery;
	private String ContactStatusListQuery;
	private String referenceTableRowCountQuery;
	private String referenceTempTableCreateQuery;
	private String oracleReferenceTempTableCreateQuery;
	private String referenceTempTableInsertQuery;
	private String outputControllorTempTableRowCountQuery;
	private String outputControllorTempTableDataSelectQuery;
	private String oracleOutputControllorTempTableDataSelectQuery;
	private String siftBatch;
	private String modelExecutorRestApiUrl;
	private String modelFindRestApiUrl;
	private String modelListRestApiUrl;
	
	
	public String getReferenceTableDataFilterQuery() {
		return referenceTableDataFilterQuery;
	}
	public void setReferenceTableDataFilterQuery(String referenceTableDataFilterQuery) {
		this.referenceTableDataFilterQuery = referenceTableDataFilterQuery;
	}
	public String getDataFetchSize() {
		return dataFetchSize;
	}
	public void setDataFetchSize(String dataFetchSize) {
		this.dataFetchSize = dataFetchSize;
	}
	public String getDbUrl() {
		return dbUrl;
	}
	public void setDbUrl(String dbUrl) {
		this.dbUrl = dbUrl;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getDriverClassName() {
		return driverClassName;
	}
	public void setDriverClassName(String driverClassName) {
		this.driverClassName = driverClassName;
	}
	public String getQueryResultOutputPath() {
		return queryResultOutputPath;
	}
	public void setQueryResultOutputPath(String queryResultOutputPath) {
		this.queryResultOutputPath = queryResultOutputPath;
	}
	public String getBatchcaseFilePath() {
		return batchcaseFilePath;
	}
	public void setBatchcaseFilePath(String batchcaseFilePath) {
		this.batchcaseFilePath = batchcaseFilePath;
	}
	public String getConfigurationFileName() {
		return configurationFileName;
	}
	public void setConfigurationFileName(String configurationFileName) {
		this.configurationFileName = configurationFileName;
	}
	public String getActiveMQUrl() {
		return activeMQUrl;
	}
	public void setActiveMQUrl(String activeMQUrl) {
		this.activeMQUrl = activeMQUrl;
	}
	public String getSegmentIdQueryFileName() {
		return segmentIdQueryFileName;
	}
	public void setSegmentIdQueryFileName(String segmentIdQueryFileName) {
		this.segmentIdQueryFileName = segmentIdQueryFileName;
	}
	public String getOracleSelectTableNameQuery() {
		return oracleSelectTableNameQuery;
	}
	public void setOracleSelectTableNameQuery(String oracleSelectTableNameQuery) {
		this.oracleSelectTableNameQuery = oracleSelectTableNameQuery;
	}
	public String getOracleDropTableQuery() {
		return oracleDropTableQuery;
	}
	public void setOracleDropTableQuery(String oracleDropTableQuery) {
		this.oracleDropTableQuery = oracleDropTableQuery;
	}
	public String getMysqlDropTableQuery() {
		return mysqlDropTableQuery;
	}
	public void setMysqlDropTableQuery(String mysqlDropTableQuery) {
		this.mysqlDropTableQuery = mysqlDropTableQuery;
	}
	public String getCreateTempTableQuery() {
		return createTempTableQuery;
	}
	public void setCreateTempTableQuery(String createTempTableQuery) {
		this.createTempTableQuery = createTempTableQuery;
	}
	public String getSelectTableDataQuery() {
		return selectTableDataQuery;
	}
	public void setSelectTableDataQuery(String selectTableDataQuery) {
		this.selectTableDataQuery = selectTableDataQuery;
	}
	public String getSelectCountTableDataQuery() {
		return selectCountTableDataQuery;
	}
	public void setSelectCountTableDataQuery(String selectCountTableDataQuery) {
		this.selectCountTableDataQuery = selectCountTableDataQuery;
	}
	public String getFilterComparisonQuery() {
		return filterComparisonQuery;
	}
	public void setFilterComparisonQuery(String filterComparisonQuery) {
		this.filterComparisonQuery = filterComparisonQuery;
	}
	public String getCampaignIdListQuery() {
		return CampaignIdListQuery;
	}
	public void setCampaignIdListQuery(String campaignIdListQuery) {
		CampaignIdListQuery = campaignIdListQuery;
	}
	public String getContactStatusListQuery() {
		return ContactStatusListQuery;
	}
	public void setContactStatusListQuery(String contactStatusListQuery) {
		ContactStatusListQuery = contactStatusListQuery;
	}
	public String getReferenceTableRowCountQuery() {
		return referenceTableRowCountQuery;
	}
	public void setReferenceTableRowCountQuery(String referenceTableRowCountQuery) {
		this.referenceTableRowCountQuery = referenceTableRowCountQuery;
	}
	public String getReferenceTempTableCreateQuery() {
		return referenceTempTableCreateQuery;
	}
	public void setReferenceTempTableCreateQuery(String referenceTempTableCreateQuery) {
		this.referenceTempTableCreateQuery = referenceTempTableCreateQuery;
	}
	public String getReferenceTempTableInsertQuery() {
		return referenceTempTableInsertQuery;
	}
	public void setReferenceTempTableInsertQuery(String referenceTempTableInsertQuery) {
		this.referenceTempTableInsertQuery = referenceTempTableInsertQuery;
	}
	public String getOutputControllorTempTableRowCountQuery() {
		return outputControllorTempTableRowCountQuery;
	}
	public void setOutputControllorTempTableRowCountQuery(String outputControllorTempTableRowCountQuery) {
		this.outputControllorTempTableRowCountQuery = outputControllorTempTableRowCountQuery;
	}
	public String getOutputControllorTempTableDataSelectQuery() {
		return outputControllorTempTableDataSelectQuery;
	}
	public void setOutputControllorTempTableDataSelectQuery(String outputControllorTempTableDataSelectQuery) {
		this.outputControllorTempTableDataSelectQuery = outputControllorTempTableDataSelectQuery;
	}
	public String getSiftBatch() {
		return siftBatch;
	}
	public void setSiftBatch(String siftBatch) {
		this.siftBatch = siftBatch;
	}
	public String getOracleReferenceTempTableCreateQuery() {
		return oracleReferenceTempTableCreateQuery;
	}
	public void setOracleReferenceTempTableCreateQuery(String oracleReferenceTempTableCreateQuery) {
		this.oracleReferenceTempTableCreateQuery = oracleReferenceTempTableCreateQuery;
	}
	public String getOracleReferenceTableDataFilterQuery() {
		return oracleReferenceTableDataFilterQuery;
	}
	public void setOracleReferenceTableDataFilterQuery(String oracleReferenceTableDataFilterQuery) {
		this.oracleReferenceTableDataFilterQuery = oracleReferenceTableDataFilterQuery;
	}
	public String getOracleOutputControllorTempTableDataSelectQuery() {
		return oracleOutputControllorTempTableDataSelectQuery;
	}
	public void setOracleOutputControllorTempTableDataSelectQuery(String oracleOutputControllorTempTableDataSelectQuery) {
		this.oracleOutputControllorTempTableDataSelectQuery = oracleOutputControllorTempTableDataSelectQuery;
	}
	public String getModelExecutorRestApiUrl() {
		return modelExecutorRestApiUrl;
	}
	public void setModelExecutorRestApiUrl(String modelExecutorRestApiUrl) {
		this.modelExecutorRestApiUrl = modelExecutorRestApiUrl;
	}
	public String getModelFindRestApiUrl() {
		return modelFindRestApiUrl;
	}
	public void setModelFindRestApiUrl(String modelFindRestApiUrl) {
		this.modelFindRestApiUrl = modelFindRestApiUrl;
	}
	public String getModelListRestApiUrl() {
		return modelListRestApiUrl;
	}
	public void setModelListRestApiUrl(String modelListRestApiUrl) {
		this.modelListRestApiUrl = modelListRestApiUrl;
	}
	
	

}