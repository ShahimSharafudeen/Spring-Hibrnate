package com.seqato.hibernateSampleProjectFrame.dao;

import java.util.List;

import com.seqato.hibernateSampleProjectFrame.model.Customer;


public interface CustomerDao {

	Customer findById(int id);

	void saveCustomer(Customer customer);
	
	void deleteCustomerByName(String name);
	
	List<Customer> findAllCustomers();

	Customer findCustomerByName(String name);
	
	List<Customer> checkCustomerExist(String name, String password);

}
