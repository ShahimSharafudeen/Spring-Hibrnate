package com.seqato.hibernateSampleProjectFrame.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.seqato.hibernateSampleProjectFrame.model.Employee;


@Repository("employeeDao")
public class EmployeeDaoImpl extends AbstractDao<Integer, Employee> implements EmployeeDao {

	public Employee findById(int id) {
		return getByKey(id);
	}

	public void saveEmployee(Employee employee) {
		persist(employee);
		//saveOrUpdate(employee);
	}

	public void deleteEmployeeByName(String name) {
		Employee employee = findEmployeeByName(name);
		delete(employee);
		//Query query = getSession().createSQLQuery("delete from Employee where name = :name");
		//query.setString("name", name);
		//query.executeUpdate();
	}
	
	@SuppressWarnings("unchecked")
	public List<Employee> checkEmployeeExist(String name , String password) {
		String hql = "from Employee where name = :name and password = :password";
		Query query = getSession().createQuery(hql);
		query.setString("name", name);
		query.setString("password", password);
		return query.list();
		
	}

	@SuppressWarnings("unchecked")
	public List<Employee> findAllEmployees() {
		Criteria criteria = createEntityCriteria();
		return (List<Employee>) criteria.list();
	}

	public Employee findEmployeeByName(String name) {
		Criteria criteria = createEntityCriteria();
		criteria.add(Restrictions.eq("name", name));
		return (Employee) criteria.uniqueResult();
	}
}
