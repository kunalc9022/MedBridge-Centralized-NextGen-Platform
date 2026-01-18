package com.MedBridge.service;

import java.util.List;

import com.MedBridge.dao.DoctorDao;
import com.MedBridge.dao.UserDao;
import com.MedBridge.dto.AppointmentUpdateDto;
import com.MedBridge.entity.User;
import com.MedBridge.exception.ResourceNotFoundException;
import com.MedBridge.utility.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.MedBridge.dao.AppointmentDao;
import com.MedBridge.entity.Appointment;

@Repository
public class AppointmentService {
	
	@Autowired
	private AppointmentDao appointmentDao;

	@Autowired
	private EmailService emailService;

	@Autowired
	private UserDao userDao;

	@Autowired
	private DoctorDao doctorDao;


	public Appointment addAppointment(Appointment appointment) {
		return appointmentDao.save(appointment);
	}
	
//	public Appointment getAppointmentById(int id) {
//		return appointmentDao.findById(id).get();
//	}

	public Appointment getAppointmentById(int id) {
		return appointmentDao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Appointment", "id", id));
	}

	public List<Appointment> getAllAppointment() {
		return appointmentDao.findAll();
	}
	
	public List<Appointment> getAppointmentByPatientId(int patiendId) {
		return appointmentDao.findByPatientId(patiendId);
	}
	
	public List<Appointment> getAppointmentByDoctorId(int doctorId) {
		return appointmentDao.findByDoctorId(doctorId);
	}



	public void updatePrescriptionAndPrice(int appointmentId, AppointmentUpdateDto dto) {
		Appointment appointment = appointmentDao.findById(appointmentId)
				.orElseThrow(() -> new ResourceNotFoundException("Appointment not found with ID: " + appointmentId));

		appointment.setPrescription(dto.getPrescription());

		appointment.setStatus(Constants.AppointmentStatus.TREATMENT_DONE.value());

		System.out.println("Saving price: " + appointment.getPrice());



		appointmentDao.save(appointment);
		int patientId = appointment.getPatientId();
		User patient = userDao.findById(patientId)
				.orElseThrow(() -> new ResourceNotFoundException("Patient not found with ID: " + patientId));

		String email = patient.getEmailId();
		String fullName = patient.getFirstName() + " " + patient.getLastName();
		emailService.sendPrescriptionEmail(email,patient.getFirstName(),appointment.getPrescription(), appointment.getPrice());

	}

	public void scheduleAppointment(int appointmentId, String scheduledTime) {
		Appointment appointment = appointmentDao.findById(appointmentId)
				.orElseThrow(() -> new ResourceNotFoundException("Appointment not found with ID: " + appointmentId));

		appointment.setScheduledTime(scheduledTime);
		appointment.setStatus(Constants.AppointmentStatus.ASSIGNED.value()); // Set status as Assigned or suitable

		appointmentDao.save(appointment);

		// Fetch patient info
		int patientId = appointment.getPatientId();
		User patient = userDao.findById(patientId)
				.orElseThrow(() -> new ResourceNotFoundException("Patient not found with ID: " + patientId));

		int doctorId = appointment.getDoctorId();
		User doctor = userDao.findById(doctorId).orElseThrow(() ->new  ResourceNotFoundException("Doctor not found with ID : "+doctorId));

		// Send email notification
		String patientEmailId = patient.getEmailId();
		String doctorEmailId = doctor.getEmailId();
		String patientName = patient.getFirstName() + " " + patient.getLastName();

		String patientSubject = "Doctor Assigned to Your Appointment";
		String doctorSubject = "Patient has Booked an Appointment with you";

		String appointmentTime = appointment.getScheduledTime() != null ? appointment.getScheduledTime() : "To be decided";

		String meetingLink = "https://your-meeting-link.com/room/" + appointment.getId(); // or your actual meeting link logic

		String patientMessage = "Dear " + patient.getFirstName() + ",\n\n"
				+ "Your appointment has been successfully booked with Dr. " + doctor.getFirstName() + " " + doctor.getLastName() + ".\n"
				+ "Appointment Date: " + appointment.getAppointmentDate() + "\n"
				+ "Appointment Time: " + appointmentTime + "\n\n"
				+ "Please join the consultation at the scheduled time using the following link:\n"
				+ meetingLink + "\n\n"
				+ "Note: \"Please make sure the doctor joins the meeting first. Patients will be admitted after the doctor is inside the room.\"\n\n"
				+ "Regards,\n"
				+ "MedBridge Team";

		String doctorMessage = "Dear Dr. " + doctor.getFirstName() + ",\n\n"
				+ "You have a new appointment booked by patient " + patient.getFirstName() + " " + patient.getLastName() + ".\n"
				+ "Appointment Date: " + appointment.getAppointmentDate() + "\n"
				+ "Appointment Time: " + appointmentTime + "\n\n"
				+ "Please join the consultation at the scheduled time using the following link:\n"
				+ meetingLink + "\n\n"
				+ "Regards,\n"
				+ "MedBridge Team";

		if (appointment.getPrescription() != null) {
			patientMessage += "Prescription: " + appointment.getPrescription() + "\n";
		}

		if (appointment.getPrice() > 0) {
			patientMessage += "Fee: ₹" + appointment.getPrice() + "\n";
		}

		patientMessage += "\nThank you for using MedBridge.\n\nRegards,\nMedBridge Team";


		// You may want to create a dedicated email method in emailService for scheduling emails
		emailService.sendAppointmentScheduledEmail(patientEmailId , patientSubject ,patientMessage);
		emailService.sendAppointmentScheduledEmail(doctorEmailId , doctorSubject ,doctorMessage);
	}

}
