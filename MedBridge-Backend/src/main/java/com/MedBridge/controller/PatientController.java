package com.MedBridge.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.MedBridge.dto.*;
import com.MedBridge.entity.Appointment;
import com.MedBridge.exception.ResourceNotFoundException;
import com.MedBridge.service.AppointmentService;
import com.MedBridge.service.CustomUserDetailsService;
import com.MedBridge.utility.Constants;
import com.MedBridge.utility.JwtUtil;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.MedBridge.entity.User;
import com.MedBridge.service.UserService;
import com.MedBridge.utility.Constants.BloodGroup;
import com.MedBridge.utility.Constants.UserRole;

@RestController
@RequestMapping("/api/patient")
//@CrossOrigin(origins = "http://localhost:5173")
@CrossOrigin(origins = {"http://localhost:5173" , "http://localhost:3000"})
public class PatientController {

	Logger LOG = LoggerFactory.getLogger(PatientController.class);

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private AppointmentService appointmentService;

	@Autowired
	private CustomUserDetailsService customUserDetailsService;

	@Autowired
	private UserService userService;

	@GetMapping("/bloodgroup/all")
	public ResponseEntity<?> getAllBloodGroups() {

		LOG.info("Received the request for getting all the Blood Groups");

		List<String> bloodGroups = new ArrayList<>();

		for (BloodGroup bg : BloodGroup.values()) {
			bloodGroups.add(bg.value());
		}

		LOG.info("Response Sent!!!");

		return new ResponseEntity(bloodGroups, HttpStatus.OK);
	}

	@GetMapping("all")
	public ResponseEntity<?> getAllPatient() {
		LOG.info("recieved request for getting ALL Customer!!!");

		List<User> patients = this.userService.getAllUserByRole(UserRole.PATIENT.value());

		LOG.info("response sent!!!");
		return ResponseEntity.ok(patients);
	}



	@PostMapping("register")
	@ApiOperation(value = "Api to register any User")
	public ResponseEntity<?> register(@RequestBody PatientRegisterDto patientRegisterDto) {
		LOG.info("Recieved request for User  register");

		CommanApiResponse response = new CommanApiResponse();
		String encodedPassword = passwordEncoder.encode(patientRegisterDto.getPassword());

		patientRegisterDto.setPassword(encodedPassword);
		patientRegisterDto.setStatus(Constants.UserStatus.ACTIVE.value());

		User registerUser = userService.registerPatient(patientRegisterDto);

		if (registerUser != null) {
			response.setResponseCode(Constants.ResponseCode.SUCCESS.value());
			response.setResponseMessage(patientRegisterDto.getRole() + " User Registered Successfully");
			return new ResponseEntity(response, HttpStatus.OK);
		} else {
			response.setResponseCode(Constants.ResponseCode.FAILED.value());
			response.setResponseMessage("Failed to Register " + patientRegisterDto.getRole() + " User");
			return new ResponseEntity(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/login")
	@ApiOperation(value = "Api to login any Patient")
	public ResponseEntity<?> login(@RequestBody UserLoginRequest userLoginRequest) {
		LOG.info("Recieved request for User Login");
		LOG.info("Login called with: email={}, password=[PROTECTED], role={}",
				userLoginRequest.getEmailId(),
				userLoginRequest.getRole());

		String jwtToken = null;
		UserLoginResponse useLoginResponse = new UserLoginResponse();
		User user = null;
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(userLoginRequest.getEmailId(), userLoginRequest.getPassword()));
		} catch (Exception ex) {
			LOG.error("Authentication Failed!!!");
			useLoginResponse.setResponseCode(Constants.ResponseCode.FAILED.value());
			useLoginResponse.setResponseMessage("Failed to Login as " + userLoginRequest.getEmailId());
			return new ResponseEntity(useLoginResponse, HttpStatus.UNAUTHORIZED);
		}

		UserDetails userDetails = customUserDetailsService.loadUserByUsername(userLoginRequest.getEmailId());

		user = userService.getUserByEmailId(userLoginRequest.getEmailId());

		if (user.getStatus() != Constants.UserStatus.ACTIVE.value()) {
			useLoginResponse.setResponseCode(Constants.ResponseCode.FAILED.value());
			useLoginResponse.setResponseMessage("User is Inactive");
			return new ResponseEntity(useLoginResponse, HttpStatus.BAD_REQUEST);
		}

		for (GrantedAuthority grantedAuthory : userDetails.getAuthorities()) {
			if (grantedAuthory.getAuthority().equals(userLoginRequest.getRole())) {
				jwtToken = jwtUtil.generateToken(userDetails.getUsername());
			}
		}

		// user is authenticated
		if (jwtToken != null) {
			useLoginResponse = User.toUserLoginResponse(user);

			useLoginResponse.setResponseCode(Constants.ResponseCode.SUCCESS.value());
			useLoginResponse.setResponseMessage(user.getFirstName() + " logged in Successful");
			useLoginResponse.setJwtToken(jwtToken);
			return new ResponseEntity(useLoginResponse, HttpStatus.OK);

		} else {

			useLoginResponse.setResponseCode(Constants.ResponseCode.FAILED.value());
			useLoginResponse.setResponseMessage("Failed to Login as " + userLoginRequest.getEmailId());
			return new ResponseEntity(useLoginResponse, HttpStatus.BAD_REQUEST);
		}


	}

//	@GetMapping("all")
//	public ResponseEntity<?> getAllAppointments() {
//		LOG.info("recieved request for getting ALL Appointments !!!");
//
//		List<Appointment> appointments = this.appointmentService.getAllAppointment();
//
//		List<AppointmentResponseDto> response = new ArrayList();
//
////		for (Appointment appointment : appointments) {
////
////			AppointmentResponseDto a = new AppointmentResponseDto();
////
////			User patient = this.userService.getUserById(appointment.getPatientId());
////
////			a.setPatientContact(patient.getContact());
////			a.setPatientId(patient.getId());
////			a.setPatientName(patient.getFirstName() + " " + patient.getLastName());
////
////			if (appointment.getDoctorId() != 0) {
////				User doctor = this.userService.getUserById(appointment.getDoctorId());
////				a.setDoctorContact(doctor.getContact());
////				a.setDoctorName(doctor.getFirstName() + " " + doctor.getLastName());
////				a.setDoctorId(doctor.getId());
////				a.setPrescription(appointment.getPrescription());
////
////				if (appointment.getStatus().equals(AppointmentStatus.TREATMENT_DONE.value())) {
////					a.setPrice(String.valueOf(appointment.getPrice()));
////				}
////
////				else {
////					a.setPrice(AppointmentStatus.TREATMENT_PENDING.value());
////				}
////			}
////
////			else {
////				a.setDoctorContact(AppointmentStatus.NOT_ASSIGNED_TO_DOCTOR.value());
////				a.setDoctorName(AppointmentStatus.NOT_ASSIGNED_TO_DOCTOR.value());
////				a.setDoctorId(0);
////				a.setPrice(AppointmentStatus.NOT_ASSIGNED_TO_DOCTOR.value());
////				a.setPrescription(AppointmentStatus.NOT_ASSIGNED_TO_DOCTOR.value());
////			}
////
////			a.setStatus(appointment.getStatus());
////			a.setProblem(appointment.getProblem());
////			a.setDate(appointment.getDate());
////			a.setAppointmentDate(appointment.getAppointmentDate());
////			a.setId(appointment.getId());
////
////			response.add(a);
////		}
//
//		for (Appointment appointment : appointments) {
//			AppointmentResponseDto a = new AppointmentResponseDto();
//
//			try {
//				User patient = this.userService.getUserById(appointment.getPatientId());
//				a.setPatientContact(patient.getContact());
//				a.setPatientId(patient.getId());
//				a.setPatientName(patient.getFirstName() + " " + patient.getLastName());
//			} catch (ResourceNotFoundException ex) {
//				LOG.warn("Skipping appointment {}: Patient not found", appointment.getId());
//				continue;
//			}
//
//			if (appointment.getDoctorId() != 0) {
//				try {
//					User doctor = this.userService.getUserById(appointment.getDoctorId());
//					a.setDoctorContact(doctor.getContact());
//					a.setDoctorName(doctor.getFirstName() + " " + doctor.getLastName());
//					a.setDoctorId(doctor.getId());
//					a.setPrescription(appointment.getPrescription());
//
//					if (appointment.getStatus().equals(Constants.AppointmentStatus.TREATMENT_DONE.value())) {
//						a.setPrice(String.valueOf(appointment.getPrice()));
//					} else {
//						a.setPrice(Constants.AppointmentStatus.TREATMENT_PENDING.value());
//					}
//				} catch (ResourceNotFoundException ex) {
//					LOG.warn("Doctor not found for appointment {}: Setting placeholders", appointment.getId());
//					a.setDoctorContact(Constants.AppointmentStatus.NOT_ASSIGNED_TO_DOCTOR.value());
//					a.setDoctorName(Constants.AppointmentStatus.NOT_ASSIGNED_TO_DOCTOR.value());
//					a.setDoctorId(0);
//					a.setPrice(Constants.AppointmentStatus.NOT_ASSIGNED_TO_DOCTOR.value());
//					a.setPrescription(Constants.AppointmentStatus.NOT_ASSIGNED_TO_DOCTOR.value());
//				}
//			} else {
//				a.setDoctorContact(Constants.AppointmentStatus.NOT_ASSIGNED_TO_DOCTOR.value());
//				a.setDoctorName(Constants.AppointmentStatus.NOT_ASSIGNED_TO_DOCTOR.value());
//				a.setDoctorId(0);
//				a.setPrice(Constants.AppointmentStatus.NOT_ASSIGNED_TO_DOCTOR.value());
//				a.setPrescription(Constants.AppointmentStatus.NOT_ASSIGNED_TO_DOCTOR.value());
//			}
//
//			a.setStatus(appointment.getStatus());
//			a.setProblem(appointment.getProblem());
//			a.setDate(appointment.getDate());
//			a.setAppointmentDate(appointment.getAppointmentDate());
//			a.setId(appointment.getId());
//
//			response.add(a);
//		}
//
//
//		LOG.info("response sent!!!");
//		return ResponseEntity.ok(response);
//	}
}