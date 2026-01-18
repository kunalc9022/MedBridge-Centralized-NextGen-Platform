package com.MedBridge.service;


import com.MedBridge.entity.Appointment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

//@Service
//public class EmailService {
//
//    @Autowired
//    private JavaMailSender mailSender;
//
//    public void sendAppointmentConfirmation(String toEmail, String patientName, String doctorName, String date) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(toEmail);
//        message.setSubject("Your Appointment has been Assigned");
//        message.setText("Dear " + patientName + ",\n\n" +
//                "Your appointment has been successfully assigned to Dr. " + doctorName + " on " + date + ".\n\n" +
//                "Thank you,\nMedBridge Team");
//
//        mailSender.send(message);
//    }
//}

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendAppointmentConfirmation(String toEmail, String subject, String fullMessage) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(fullMessage);

        mailSender.send(message);
    }

    public void AppointmentBooked(String toEmail, String patientName, Appointment appointment, double price) {
        String subject = "Appointment Confirmation - MedBridge";
        String body = "Dear " + patientName + ",\n\n"
                + "We are pleased to inform you that your appointment has been successfully booked with MedBridge Healthcare.\n\n"
                + "📅 Appointment Date: " + appointment.getDate() + "\n"
                + "💳 Payment Status: Confirmed\n"
                + "💰 Amount Paid: ₹" + price + "\n"
                + "🩺 Appointment Status: " + appointment.getStatus() + "\n\n"
                + "Thank you for your payment and for choosing MedBridge for your healthcare needs.\n"
                + "You will receive further details or reminders as your appointment date approaches.\n\n"
                + "Wishing you good health,\n"
                + "The MedBridge Healthcare Team";


        sendAppointmentConfirmation(toEmail, subject, body);
    }


    public void sendPrescriptionEmail(String toEmail , String patientName, String prescription, double price) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("Your Prescription is Updated");
            message.setText("Dear "+ patientName +",\n\nYour prescription has been updated:\n\nPrescription: " + prescription +
                    "\nEstimated Price: ₹" + price +
                    "\n\nThank you,\nMedBridge Team");

            mailSender.send(message);
            System.out.println("Prescription email sent successfully to: " + toEmail);
        } catch (Exception e) {
            System.err.println("Error sending email: " + e.getMessage());
        }
    }

    public void sendAppointmentScheduledEmail(String toEmail, String Subject, String mesage) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(Subject);
        message.setText(mesage);

        mailSender.send(message);

    }

}

