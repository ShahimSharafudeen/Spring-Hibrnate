/*
 * Copyright (c) 2015, KNOWESIS PTE LTD. All rights reserved.
 * KNOWESIS PTE LTD. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
package com.seqato.hibernateSampleProjectFrame.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.core.env.Environment;

import com.seqato.hibernateSampleProjectFrame.util.PropertyFileReader;



/**
 * @author KNOWESIS SIFT PORTAL DEVELOPMENT TEAM
 *
 */
@Configuration
@PropertySources({ @PropertySource("classpath:querybuilder.properties") })
//@ComponentScan({"com.knowesis.sift.service"})
public class PropertyFileReaderConfig {

	@Autowired
	private Environment env;

	/**
	 * @return
	 */
	@Bean
	public PropertyFileReader batchAppPropertyFileReaderConfigurer() {
		PropertyFileReader propertyReader = new PropertyFileReader();
		/*propertyReader.setDbUrl(env.getProperty("DB_URL"));
		propertyReader.setDriverClassName(env.getProperty("DRIVER_CLASS_NAME"));
		propertyReader.setUsername(env.getProperty("USERNAMES"));
		propertyReader.setPassword(env.getProperty("PASSWORD"));*/
		propertyReader.setQueryResultOutputPath(env.getProperty("QUERY_OUTPUT_FILE_PATH"));
		propertyReader.setBatchcaseFilePath(env.getProperty("BATCHCASE_FILE_PATH"));
		propertyReader.setConfigurationFileName(env.getProperty("BATCH_CONF_FILE_NAME"));
		propertyReader.setActiveMQUrl(env.getProperty("BATCH_ACTIVEMQ_QUEUES_URL"));
		propertyReader.setSegmentIdQueryFileName(env.getProperty("SEGMENTIDQUERY_FILE_PATH"));
		propertyReader.setOracleSelectTableNameQuery(env.getProperty("ORACLE_SELECT_TABLE_NAME_QUERY"));
		propertyReader.setOracleDropTableQuery(env.getProperty("ORACLE_DROP_TABLE_QUERY"));
		propertyReader.setMysqlDropTableQuery(env.getProperty("MYSQL_DROP_TABLE_QUERY"));
		propertyReader.setCreateTempTableQuery(env.getProperty("CREATE_TEMP_TABLE_QUERY"));
		propertyReader.setSelectTableDataQuery(env.getProperty("SELECT_TABLE_QUERY"));
		propertyReader.setSelectCountTableDataQuery(env.getProperty("SELECT_COUNT_TABLE_DATA_QUERY"));
		propertyReader.setReferenceTableDataFilterQuery(env.getProperty("REFERENCE_TABLE_DATA_FILTER_QUERY"));
		propertyReader.setOracleReferenceTableDataFilterQuery(env.getProperty("ORACLE_REFERENCE_TABLE_DATA_FILTER_QUERY"));
		propertyReader.setDataFetchSize(env.getProperty("DATA_FETCH_SIZE"));
		propertyReader.setFilterComparisonQuery(env.getProperty("FILTER_COMPARISON_QUERY"));
		propertyReader.setCampaignIdListQuery(env.getProperty("CAMPAIN-IDS_FROM_REFERENCE_TABLE_QUERY"));
		propertyReader.setContactStatusListQuery(env.getProperty("CONTACT-STATUS_FROM_REFERENCE_TABLE_QUERY"));
		propertyReader.setReferenceTableRowCountQuery(env.getProperty("REFERENCE_TABLE_ROW_COUNT_QUERY"));
		propertyReader.setReferenceTempTableCreateQuery(env.getProperty("REFERENCE_TEMP_TABLE_CREATE_QUERY"));
		propertyReader.setOracleReferenceTempTableCreateQuery(env.getProperty("ORACLE_REFERENCE_TEMP_TABLE_CREATE_QUERY"));
		propertyReader.setReferenceTempTableInsertQuery(env.getProperty("REFERENCE_TEMP_TABLE_INSERT_QUERY"));
		propertyReader.setOutputControllorTempTableRowCountQuery(env.getProperty("OUTPUT_CONTROLLOR_TEMP_TABLE_ROW_COUNT_QUERY"));
		propertyReader.setOutputControllorTempTableDataSelectQuery(env.getProperty("OUTPUT_CONTROLLOR_TEMP_TABLE_DATA_SELECT_QUERY"));
		propertyReader.setOracleOutputControllorTempTableDataSelectQuery(env.getProperty("ORACLE_OUTPUT_CONTROLLOR_TEMP_TABLE_DATA_SELECT_QUERY"));
		propertyReader.setSiftBatch(env.getProperty("SIFT_BATCH"));
		propertyReader.setModelExecutorRestApiUrl(env.getProperty("MODEL_EXECUTOR_REST_API_URL"));
		propertyReader.setModelFindRestApiUrl(env.getProperty("MODEL_FIND_REST_API_URL"));
		propertyReader.setModelListRestApiUrl(env.getProperty("MODEL_LIST_REST_API_URL"));
		
		return propertyReader;
	}
}