package com.MedBridge.service;

import com.MedBridge.dao.DoctorDao;
import com.MedBridge.entity.Doctor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorDao doctorDao;

    public List<Doctor> getDoctorsBySpeciality(String speciality) {
        return doctorDao.findBySpecialist(speciality);
    }
}
