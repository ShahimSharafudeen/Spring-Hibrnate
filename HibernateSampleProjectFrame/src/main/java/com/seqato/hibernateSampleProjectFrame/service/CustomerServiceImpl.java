package com.seqato.hibernateSampleProjectFrame.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.seqato.hibernateSampleProjectFrame.dao.CustomerDao;
import com.seqato.hibernateSampleProjectFrame.model.Customer;
import com.seqato.hibernateSampleProjectFrame.model.EmployeeRolesModel;
import com.seqato.hibernateSampleProjectFrame.model.LoginModel;


@Service("customerService")
@Transactional
public class CustomerServiceImpl implements CustomerService {

	@Autowired
	private CustomerDao dao;

	/* (non-Javadoc)
	 * @see com.seqato.hibernateSampleProjectFrame.service.CustomerService#findById(int)
	 */
	public Customer findById(int id) {
		return dao.findById(id);
	}

	/* (non-Javadoc)
	 * @see com.seqato.hibernateSampleProjectFrame.service.CustomerService#saveCustomer(com.seqato.hibernateSampleProjectFrame.model.Customer)
	 */
	public void saveCustomer(Customer customer) {
		dao.saveCustomer(customer);
		
	}

	/* (non-Javadoc)
	 * @see com.seqato.hibernateSampleProjectFrame.service.CustomerService#updateCustomer(com.seqato.hibernateSampleProjectFrame.model.Customer, java.lang.String, java.lang.String)
	 */
	public void updateCustomer(Customer customer, String encriptedPassword, String roleName) {
		System.out.println(" inside update customer method");
		Customer entity = dao.findById(customer.getId());
		System.out.println(" outside update customer method");
		if(entity!=null){
			LoginModel login=entity.getLogin();
			EmployeeRolesModel employeeRolesModel=login.getEmployeeRoles();
			employeeRolesModel.setName(customer.getName());
			employeeRolesModel.setRoleName(roleName);
			
			login.setName(customer.getName());
			login.setPassword(encriptedPassword);
			login.setEmployeeRoles(employeeRolesModel);
			
			entity.setName(customer.getName());
			entity.setAddress(customer.getAddress());
			entity.setSalary(customer.getSalary());
			entity.setData(customer.getData());
			entity.setPassword(customer.getPassword());
			entity.setLogin(login);
		}
		
	}

	/* (non-Javadoc)
	 * @see com.seqato.hibernateSampleProjectFrame.service.CustomerService#deleteCustomerByName(java.lang.String)
	 */
	public void deleteCustomerByName(String name) {
		dao.deleteCustomerByName(name);
		
	}

	/* (non-Javadoc)
	 * @see com.seqato.hibernateSampleProjectFrame.service.CustomerService#findAllCustomers()
	 */
	public List<Customer> findAllCustomers() {
		return dao.findAllCustomers();
	}

	/* (non-Javadoc)
	 * @see com.seqato.hibernateSampleProjectFrame.service.CustomerService#findCustomerByName(java.lang.String)
	 */
	public Customer findCustomerByName(String name) {
		return dao.findCustomerByName(name);
	}

	/* (non-Javadoc)
	 * @see com.seqato.hibernateSampleProjectFrame.service.CustomerService#isCustomerNameUnique(java.lang.Integer, java.lang.String)
	 */
	public boolean isCustomerNameUnique(Integer id, String name) {
		Customer customer = findCustomerByName(name);
		return ( customer == null || ((id != null) && (customer.getId() == id)));
	}

	/* (non-Javadoc)
	 * @see com.seqato.hibernateSampleProjectFrame.service.CustomerService#isExistingCustomer(java.lang.String, java.lang.String)
	 */
	public boolean isExistingCustomer(String name, String password) {
		List<Customer> customer = dao.checkCustomerExist(name, password);
		return ( customer.isEmpty());
	}
	
}
