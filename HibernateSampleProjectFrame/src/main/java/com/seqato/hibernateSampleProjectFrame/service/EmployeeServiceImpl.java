package com.seqato.hibernateSampleProjectFrame.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.seqato.hibernateSampleProjectFrame.dao.EmployeeDao;
import com.seqato.hibernateSampleProjectFrame.model.Employee;
import com.seqato.hibernateSampleProjectFrame.model.EmployeeRolesModel;
import com.seqato.hibernateSampleProjectFrame.model.LoginModel;


@Service("employeeService")
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

	@Autowired
	private EmployeeDao dao;
	
	public Employee findById(int id) {
		return dao.findById(id);
	}

	public void saveEmployee(Employee employee) {
		dao.saveEmployee(employee);
	}

	/*
	 * Since the method is running with Transaction, No need to call hibernate update explicitly.
	 * Just fetch the entity from db and update it with proper values within transaction.
	 * It will be updated in db once transaction ends. 
	 */
	public void updateEmployee(Employee employee, String encriptedPassword, String roleName) {
		System.out.println(" inside update employee method");
		Employee entity = dao.findById(employee.getId());
		System.out.println(" outside update employee method");
		if(entity!=null){
			LoginModel login=entity.getLogin();
			EmployeeRolesModel employeeRolesModel=login.getEmployeeRoles();
			employeeRolesModel.setName(employee.getName());
			employeeRolesModel.setRoleName(roleName);
			
			login.setName(employee.getName());
			login.setPassword(encriptedPassword);
			login.setEmployeeRoles(employeeRolesModel);
			
			entity.setName(employee.getName());
			entity.setAddress(employee.getAddress());
			entity.setSalary(employee.getSalary());
			entity.setSsn(employee.getSsn());
			entity.setPassword(employee.getPassword());
			entity.setLogin(login);
		}
	}

	public void deleteEmployeeByName(String name) {
		dao.deleteEmployeeByName(name);
	}
	
	public List<Employee> findAllEmployees() {
		return dao.findAllEmployees();
	}

	public Employee findEmployeeByName(String name) {
		return dao.findEmployeeByName(name);
	}

	public boolean isEmployeeNameUnique(Integer id, String name) {
		Employee employee = findEmployeeByName(name);
		return ( employee == null || ((id != null) && (employee.getId() == id)));
	}
	
	public boolean isExistingEmployee(String name, String password) {
		List<Employee> employee = dao.checkEmployeeExist(name, password);
		System.out.println("test datata : "+employee);
		return ( employee.isEmpty());
	}
	
}
