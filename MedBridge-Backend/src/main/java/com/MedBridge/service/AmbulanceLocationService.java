package com.MedBridge.service;


import com.MedBridge.dao.AmbulanceRepository;
import com.MedBridge.dto.AmbulanceLocationDto;
import com.MedBridge.entity.Ambulance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class AmbulanceLocationService {

    @Autowired
    private AmbulanceRepository ambulanceRepo;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void updateLocationAndBroadcast(AmbulanceLocationDto dto) {
        Ambulance ambulance = ambulanceRepo.findById(dto.getAmbulanceId())
                .orElseThrow(() -> new RuntimeException("Ambulance not found"));

        ambulance.setCurrentLatitude(dto.getLatitude());
        ambulance.setCurrentLongitude(dto.getLongitude());
        ambulanceRepo.save(ambulance);

        // Broadcast updated location
        messagingTemplate.convertAndSend("/ambulance/location", dto);
    }
}
