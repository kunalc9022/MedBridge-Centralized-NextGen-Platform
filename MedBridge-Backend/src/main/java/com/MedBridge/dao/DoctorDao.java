package com.MedBridge.dao;

import com.MedBridge.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorDao extends JpaRepository<Doctor,Integer> {

    List<Doctor> findBySpecialist(String speciality);
}
