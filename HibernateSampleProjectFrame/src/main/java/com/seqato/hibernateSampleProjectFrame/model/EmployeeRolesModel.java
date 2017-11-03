package com.seqato.hibernateSampleProjectFrame.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.stereotype.Component;

@Component
@Entity
@Table(name="employee_roles")
public class EmployeeRolesModel {

	@Id
	@GeneratedValue
	@Column(name="id")
	private int id;

	@Column(name = "name", nullable = false)
	private String name;
	
	@Column(name = "role_name", nullable = false)
	private String roleName;
	

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
	 * @return the roleName
	 */
	public String getRoleName() {
		return roleName;
	}



	/**
	 * @param roleName the roleName to set
	 */
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
}
