


package com.MedBridge.entity;


import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

import com.MedBridge.dto.DoctorRegisterDto;
import com.MedBridge.dto.UserLoginResponse;

@Entity
@Getter
@Setter
public class User {


    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String firstName;

	private String lastName;

	private int age;

	private String sex;

	private String bloodGroup;

	private String emailId;

	private String contact;

	private String street;

	private String city;

	private String pincode;

	private String password;

	private String role;

	private int status;

	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonManagedReference
	private Doctor doctor;




	public static UserLoginResponse toUserLoginResponse(User user) {
		UserLoginResponse userLoginResponse = new UserLoginResponse();
		BeanUtils.copyProperties(user, userLoginResponse, "password");
		return userLoginResponse;
	}

	public static DoctorRegisterDto toUserDto(User user) {
		DoctorRegisterDto userDto = new DoctorRegisterDto();
		BeanUtils.copyProperties(user, userDto, "password");
		return userDto;
	}

}
