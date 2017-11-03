package com.seqato.hibernateSampleProjectFrame.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import org.springframework.stereotype.Component;

@Component
@Entity
@Table(name="LOGIN")
public class LoginModel {

	@Id
	@GeneratedValue
	@Column(name="id")
	private int id;

	@Size(min=3, max=50)
	@Column(name = "NAME", nullable = false)
	private String name;
	
	@Size(min=1, max=100)
	@Column(name = "PASSWORD", nullable = false)
	private String password;

	@MapsId
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "id")
	private EmployeeRolesModel employeeRoles; 
	

	/**
	 * @return the id
	 */
	public int getId() {
		return id;
	}



	/**
	 * @param id the id to set
	 */
	public void setId(int id) {
		this.id = id;
	}



	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}



	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}



	/**
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}



	/**
	 * @param password the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	

	/**
	 * @return the employeeRoles
	 */
	public EmployeeRolesModel getEmployeeRoles() {
		return employeeRoles;
	}



	/**
	 * @param employeeRoles the employeeRoles to set
	 */
	public void setEmployeeRoles(EmployeeRolesModel employeeRoles) {
		this.employeeRoles = employeeRoles;
	}


	@Override
	public String toString() {
		return "Employee [id=" + id + ", name=" + name + ", password=" + password;
	}
	
	
	

}
