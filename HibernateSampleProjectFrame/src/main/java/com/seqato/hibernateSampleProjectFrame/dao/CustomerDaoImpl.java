package com.seqato.hibernateSampleProjectFrame.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.seqato.hibernateSampleProjectFrame.model.Customer;


@Repository("customerDao")
public class CustomerDaoImpl extends AbstractDao<Integer, Customer> implements CustomerDao {

	public Customer findById(int id) {
		return getByKey(id);
	}

	public void saveCustomer(Customer customer) {
		persist(customer);
	}

	public void deleteCustomerByName(String name) {
		Customer customer = findCustomerByName(name);
		delete(customer);
	}
	
	@SuppressWarnings("unchecked")
	public List<Customer> checkCustomerExist(String name , String password) {
		String hql = "from customer where name = :name and password = :password";
		Query query = getSession().createQuery(hql);
		query.setString("name", name);
		query.setString("password", password);
		return query.list();
		
	}

	@SuppressWarnings("unchecked")
	public List<Customer> findAllCustomers() {
		Criteria criteria = createEntityCriteria();
		return (List<Customer>) criteria.list();
	}

	public Customer findCustomerByName(String name) {
		Criteria criteria = createEntityCriteria();
		criteria.add(Restrictions.eq("name", name));
		return (Customer) criteria.uniqueResult();
	}
}
