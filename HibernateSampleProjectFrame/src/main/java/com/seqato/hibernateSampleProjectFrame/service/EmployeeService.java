package com.seqato.hibernateSampleProjectFrame.service;

import java.util.List;

import com.seqato.hibernateSampleProjectFrame.model.Employee;


public interface EmployeeService {

	Employee findById(int id);
	
	void saveEmployee(Employee employee);
	
	void updateEmployee(Employee employee, String encriptedPassword, String roleName);
	
	void deleteEmployeeByName(String name);

	List<Employee> findAllEmployees(); 
	
	Employee findEmployeeByName(String name);

	boolean isEmployeeNameUnique(Integer id, String name);
	
	boolean isExistingEmployee(String name, String password);
	
}
