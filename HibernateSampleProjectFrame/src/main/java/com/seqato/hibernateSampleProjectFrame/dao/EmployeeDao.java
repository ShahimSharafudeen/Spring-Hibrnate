package com.seqato.hibernateSampleProjectFrame.dao;

import java.util.List;

import com.seqato.hibernateSampleProjectFrame.model.Employee;


public interface EmployeeDao {

	Employee findById(int id);

	void saveEmployee(Employee employee);
	
	void deleteEmployeeBySsn(String ssn);
	
	List<Employee> findAllEmployees();

	Employee findEmployeeBySsn(String ssn);
	
	List<Employee> checkEmployeeExist(String name, String password);

}
