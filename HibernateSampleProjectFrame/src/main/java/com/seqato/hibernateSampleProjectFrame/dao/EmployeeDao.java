package com.seqato.hibernateSampleProjectFrame.dao;

import java.util.List;

import com.seqato.hibernateSampleProjectFrame.model.Employee;


public interface EmployeeDao {

	Employee findById(int id);

	void saveEmployee(Employee employee);
	
	void deleteEmployeeByName(String name);
	
	List<Employee> findAllEmployees();

	Employee findEmployeeByName(String name);
	
	List<Employee> checkEmployeeExist(String name, String password);

}
