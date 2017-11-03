package com.seqato.hibernateSampleProjectFrame.service;

import java.util.List;

import com.seqato.hibernateSampleProjectFrame.model.Customer;


public interface CustomerService {

	Customer findById(int id);
	
	void saveCustomer(Customer employee);
	
	void updateCustomer(Customer employee, String encriptedPassword, String roleName);
	
	void deleteCustomerByName(String name);

	List<Customer> findAllCustomers(); 
	
	Customer findCustomerByName(String name);

	boolean isCustomerNameUnique(Integer id, String name);
	
	boolean isExistingCustomer(String name, String password);
	
}
