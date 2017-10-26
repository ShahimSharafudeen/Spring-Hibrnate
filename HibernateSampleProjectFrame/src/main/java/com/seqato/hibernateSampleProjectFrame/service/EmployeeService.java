package com.seqato.hibernateSampleProjectFrame.service;

import java.util.List;

import com.seqato.hibernateSampleProjectFrame.model.Employee;


public interface EmployeeService {

	Employee findById(int id);
	
	void saveEmployee(Employee employee);
	
	void updateEmployee(Employee employee);
	
	void deleteEmployeeBySsn(String ssn);

	List<Employee> findAllEmployees(); 
	
	Employee findEmployeeBySsn(String ssn);

	boolean isEmployeeSsnUnique(Integer id, String ssn);
	
	boolean isExistingEmployee(String name, String password);
	
}
