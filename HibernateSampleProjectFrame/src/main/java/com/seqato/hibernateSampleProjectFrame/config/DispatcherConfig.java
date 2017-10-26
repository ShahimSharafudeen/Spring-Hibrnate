/*
 * Copyright (c) 2016, SEQATO All rights reserved.
 * SEQATO PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
package com.seqato.hibernateSampleProjectFrame.config;

import org.apache.log4j.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;
import org.springframework.web.servlet.view.tiles3.TilesConfigurer;
import org.springframework.web.servlet.view.tiles3.TilesView;
import org.springframework.web.servlet.view.tiles3.TilesViewResolver;

import com.seqato.hibernateSampleProjectFrame.dao.EmployeeDao;
import com.seqato.hibernateSampleProjectFrame.dao.EmployeeDaoImpl;
import com.seqato.hibernateSampleProjectFrame.service.EmployeeService;
import com.seqato.hibernateSampleProjectFrame.service.EmployeeServiceImpl;

/**
 * 
 * @author SEQATO Development Team
 *
 */
@EnableWebMvc
@Configuration
@ComponentScan(basePackages = { "com.seqato.hibernateSampleProjectFrame" })
public class DispatcherConfig extends WebMvcConfigurerAdapter {

	 static final Logger logger = Logger.getLogger(DispatcherConfig.class);

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter
	 * #addResourceHandlers(org.springframework.web.servlet.config.annotation.
	 * ResourceHandlerRegistry)
	 */
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		logger.debug("addResourceHandlers() : Start : registry={"+registry+"}");

		registry.addResourceHandler("/resources/**").addResourceLocations("/resources/assets/");

		logger.debug("addResourceHandlers() : End : registry={"+registry+"}");
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see..
	 * org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter
	 * #configureDefaultServletHandling(org.springframework.web.servlet.config.
	 * annotation.DefaultServletHandlerConfigurer)
	 */
	@Override
	public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
		logger.debug("configureDefaultServletHandling() : Start : configurer=={"+configurer+"}");

		configurer.enable();

		logger.debug("configureDefaultServletHandling() : Start : configurer=={"+configurer+"}");
	}

	/**
	 * @return tilesViewResolver
	 */
	@Bean
	public TilesViewResolver getTilesViewResolver() {
		logger.debug("getTilesViewResolver() : Start.");
		TilesViewResolver tilesViewResolver = new TilesViewResolver();
		tilesViewResolver.setViewClass(TilesView.class);
		tilesViewResolver.setOrder(0);
		logger.debug("getTilesViewResolver() : End : tilesViewResolver={"+tilesViewResolver+"}");
		return tilesViewResolver;
	}

	@Bean
	public InternalResourceViewResolver viewResolver() {
		InternalResourceViewResolver resolver = new InternalResourceViewResolver();
		resolver.setViewClass(JstlView.class);
		resolver.setPrefix("/WEB-INF/jsp/");
		resolver.setSuffix(".jsp");
		resolver.setOrder(1);
		return resolver;
	}

	/**
	 * @return tilesConfigurer
	 */
	@Bean(name = "tilesConfigurer")
	public TilesConfigurer tilesConfigurer() {
		logger.debug("tilesConfigurer() : Start.");

		TilesConfigurer tilesConfigurer = new TilesConfigurer();
		tilesConfigurer.setCheckRefresh(true);
		tilesConfigurer.setDefinitions(new String[] { "/WEB-INF/tiles-config/*.xml" });

		logger.debug("tilesConfigurer() : End : tilesConfigurer={"+tilesConfigurer+"}");

		return tilesConfigurer;
	}

	/**
	 * @return multipartResolver
	 */
	@Bean(name = "multipartResolver")
	public CommonsMultipartResolver getMultipartResolver() {
		logger.debug("getMultipartResolver() : Start.");

		CommonsMultipartResolver commonsMultipartResolver = new CommonsMultipartResolver();
		commonsMultipartResolver.setMaxUploadSize(10000000);

		logger.debug("getMultipartResolver() : End: commonsMultipartResolver={"+commonsMultipartResolver+"}");

		return commonsMultipartResolver;
	}

	/**
	 * @return messageSource
	 */
	@Bean(name = "messageSource")
	public ReloadableResourceBundleMessageSource getMessageSource() {
		logger.debug("getMessageSource() : Start.");

		ReloadableResourceBundleMessageSource resource = new ReloadableResourceBundleMessageSource();
		resource.setBasename("classpath:messages");
		resource.setDefaultEncoding("UTF-8");

		logger.debug("getMessageSource() : End : resource={"+resource+"}");

		return resource;
	}
}
