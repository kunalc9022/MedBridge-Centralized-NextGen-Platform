package com.MedBridge.dto;

import com.MedBridge.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PatientRegisterDto {

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
    private int status;
    private String role;

    public static User toEntity(PatientRegisterDto dto) {
        User user = new User();
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setAge(dto.getAge());
        user.setSex(dto.getSex());
        user.setBloodGroup(dto.getBloodGroup());
        user.setEmailId(dto.getEmailId());
        user.setContact(dto.getContact());
        user.setStreet(dto.getStreet());
        user.setCity(dto.getCity());
        user.setPincode(dto.getPincode());
        user.setPassword(dto.getPassword());
        user.setRole("patient"); // Hardcoded or assign via controller
        user.setStatus(0);
        return user;
    }
}

