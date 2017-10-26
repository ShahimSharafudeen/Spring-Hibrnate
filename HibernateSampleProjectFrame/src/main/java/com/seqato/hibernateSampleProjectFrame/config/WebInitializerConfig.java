/*
 * Copyright (c) 2016, SEQATO All rights reserved.
 * SEQATO PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
package com.seqato.hibernateSampleProjectFrame.config;
import java.util.HashSet;
import java.util.Set;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;
import javax.servlet.SessionTrackingMode;

import org.apache.log4j.Logger;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

/**
 * 
 * @author SEQATO Development Team
 *
 */
public class WebInitializerConfig implements WebApplicationInitializer {

	private static final Logger logger = Logger.getLogger(WebInitializerConfig.class);

	//@Override
	public void onStartup(ServletContext servletContext) throws ServletException {

		logger.debug("onStartup() : Start : servletContext={"+servletContext+"}");

		// Create the 'root' Spring application context
		 AnnotationConfigWebApplicationContext rootContext = new AnnotationConfigWebApplicationContext();
		// rootContext.register(SecurityContextConfig.class);

		// Create the dispatcher servlet's Spring application context
		AnnotationConfigWebApplicationContext dispatcherServlet = new AnnotationConfigWebApplicationContext();
		dispatcherServlet.register(DispatcherConfig.class);

		// Register and map the dispatcher servlet
		ServletRegistration.Dynamic dispatcher = servletContext.addServlet("dispatcher",
				new DispatcherServlet(dispatcherServlet));
		dispatcher.setLoadOnStartup(1);
		dispatcher.addMapping("/");

		// Manage the lifecycle of the root application context
		servletContext.addListener(new ContextLoaderListener(rootContext));
		// TObe uncommented
		// servletContext.addListener(new SessionListenerConfig());

		Set<SessionTrackingMode> sessionTrackingModes = new HashSet<SessionTrackingMode>(1);
		sessionTrackingModes.add(SessionTrackingMode.COOKIE);
		servletContext.setSessionTrackingModes(sessionTrackingModes);
		servletContext.getSessionCookieConfig().setHttpOnly(true);

		servletContext.setInitParameter("defaultHtmlEscape", "true");

		logger.debug("onStartup() : End.");
	}
}
