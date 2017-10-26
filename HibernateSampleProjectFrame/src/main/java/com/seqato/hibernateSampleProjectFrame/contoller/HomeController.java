/**
 * 
 */
package com.seqato.hibernateSampleProjectFrame.contoller;

import java.io.IOException;
import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authc.credential.DefaultPasswordService;
import org.apache.shiro.authc.credential.PasswordService;
import org.apache.shiro.subject.Subject;
import org.hibernate.SessionFactory;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;

import com.seqato.hibernateSampleProjectFrame.model.Employee;
import com.seqato.hibernateSampleProjectFrame.model.EmployeeRolesModel;
import com.seqato.hibernateSampleProjectFrame.model.LoginModel;
import com.seqato.hibernateSampleProjectFrame.service.EmployeeService;
import com.seqato.hibernateSampleProjectFrame.util.PropertyFileReader;

/**
 * @author seqato
 *
 */
@Controller
public class HomeController {

	@Autowired
	EmployeeService service;
	
	@Autowired
	private SessionFactory sessionFactory;

	@Autowired
	MessageSource messageSource;

	private static final Logger logger = Logger.getLogger(HomeController.class);

	@Autowired
	PropertyFileReader propertyFileReader;

	@RequestMapping(value = { "/", "/welcome" }, method = RequestMethod.GET)
	public String getHomePage(HttpServletRequest request) throws IOException {
		logger.debug("getHomePage() : Start :  ");

		logger.debug("getHomePage() : End ");
		return "welcome";
	}

	/*
	 * This method will list all existing employees.
	 */
	@RequestMapping(value = { "/login/list" }, method = RequestMethod.GET)
	public String listEmployees(ModelMap model) {

		List<Employee> employees = service.findAllEmployees();
		model.addAttribute("employees", employees);
		return "allemployees";
	}

	/*
	 * This method will provide the medium to add a new employee.
	 */
	@RequestMapping(value = { "/login" }, method = RequestMethod.GET)
	public String loginPage(ModelMap model) {
		LoginModel loginModel=new LoginModel();
		model.addAttribute("loginModel", loginModel);
		return "login";
	}

	// This method will provide the medium to add a new employee.

	@RequestMapping(value = { "/login/success" }, method = RequestMethod.GET)
	public String LoginHomePage(ModelMap model) {
		return "success";
	}

	/*
	 * This method will be called on form submission, handling POST request for
	 * saving employee in database. It also validates the user input
	 */
	@RequestMapping(value = { "/login" }, method = RequestMethod.POST)
	public String loginEmployee(@Valid @ModelAttribute("loginModel") LoginModel loginModel, BindingResult result, ModelMap model) {
		
		if (result.hasErrors()) {
			return "login";
		}
		
		Subject subject = SecurityUtils.getSubject();
		if (subject.isAuthenticated()) {
			subject.logout();
		}

		UsernamePasswordToken token = new UsernamePasswordToken(loginModel.getName(), loginModel.getPassword());
		token.setRememberMe(true);
		try {
			subject.login(token);
			return "redirect:/login/success";
		} catch (UnknownAccountException uae) {
			model.addAttribute("message", "There is no user with username of " + token.getPrincipal());
			logger.info("There is no user with username of " + token.getPrincipal());
		} catch (IncorrectCredentialsException ice) {
			model.addAttribute("message", "Password for account " + token.getPrincipal() + " was incorrect!");
			logger.info("Password for account " + token.getPrincipal() + " was incorrect!");
		} catch (LockedAccountException lae) {
			model.addAttribute("message", "The account for username " + token.getPrincipal() + " is locked. Please contact your administrator to unlock it.");
			logger.info("The account for username " + token.getPrincipal() + " is locked.  "
					+ "Please contact your administrator to unlock it.");
		}
		return null;
	}

	/*
	 * This method will provide the medium to add a new employee.
	 */
	@RequestMapping(value = { "/reg" }, method = RequestMethod.GET)
	public String newEmployee(ModelMap model) {
		Employee employee = new Employee();
		model.addAttribute("employee", employee);
		model.addAttribute("edit", false);
		return "registration";
	}

	/*
	 * This method will be called on form submission, handling POST request for
	 * saving employee in database. It also validates the user input
	 */
	@Transactional
	@RequestMapping(value = { "/reg" }, method = RequestMethod.POST)
	public String saveEmployee(@Valid Employee employee, BindingResult result, ModelMap model) {
		
		PasswordService passwordService = new DefaultPasswordService();
		LoginModel loginModel =new LoginModel();
		EmployeeRolesModel employeeRolesModel = new EmployeeRolesModel();

		if (result.hasErrors()) {
			return "registration";
		}

		/*
		 * Preferred way to achieve uniqueness of field [ssn] should be
		 * implementing custom @Unique annotation and applying it on field [ssn]
		 * of Model class [Employee].
		 * 
		 * Below mentioned peace of code [if block] is to demonstrate that you
		 * can fill custom errors outside the validation framework as well while
		 * still using internationalized messages.
		 * 
		 */
		if (!service.isEmployeeSsnUnique(employee.getId(), employee.getSsn())) {
			FieldError ssnError = new FieldError("employee", "ssn", messageSource.getMessage("non.unique.ssn",
					new String[] { employee.getSsn() }, Locale.getDefault()));
			result.addError(ssnError);
			return "registration";
		}
		
		String encryptedValue = passwordService.encryptPassword(employee.getPassword());
		loginModel.setName(employee.getName());
		loginModel.setPassword(encryptedValue);
		employeeRolesModel.setName(employee.getName());
		employeeRolesModel.setRoleName("ADMIN");
		
		service.saveEmployee(employee);
		sessionFactory.getCurrentSession().persist(loginModel);
		sessionFactory.getCurrentSession().persist(employeeRolesModel);

		model.addAttribute("message", "Employee " + employee.getName() + " registered successfully . Please Login");
		model.addAttribute("loginModel", loginModel);
		return "login";
	}

	/*
	 * This method will provide the medium to update an existing employee.
	 */
	@RequestMapping(value = { "/login/edit-{ssn}-employee" }, method = RequestMethod.GET)
	public String editEmployee(@PathVariable String ssn, ModelMap model) {
		Employee employee = service.findEmployeeBySsn(ssn);
		model.addAttribute("employee", employee);
		model.addAttribute("edit", true);
		return "registration";
	}

	/*
	 * This method will be called on form submission, handling POST request for
	 * updating employee in database. It also validates the user input
	 */
	@RequestMapping(value = { "/login/edit-{ssn}-employee" }, method = RequestMethod.POST)
	public String updateEmployee(@Valid Employee employee, BindingResult result, ModelMap model,
			@PathVariable String ssn) {

		if (result.hasErrors()) {
			return "registration";
		}

		if (!service.isEmployeeSsnUnique(employee.getId(), employee.getSsn())) {
			FieldError ssnError = new FieldError("employee", "ssn", messageSource.getMessage("non.unique.ssn",
					new String[] { employee.getSsn() }, Locale.getDefault()));
			result.addError(ssnError);
			return "registration";
		}

		service.updateEmployee(employee);

		model.addAttribute("success", "Employee " + employee.getName() + " updated successfully");
		return "success";
	}

	/*
	 * This method will delete an employee by it's SSN value.
	 */
	@RequestMapping(value = { "/login/delete-{ssn}-employee" }, method = RequestMethod.GET)
	public String deleteEmployee(@PathVariable String ssn) {
		service.deleteEmployeeBySsn(ssn);
		return "redirect:/login/list";
	}

}
