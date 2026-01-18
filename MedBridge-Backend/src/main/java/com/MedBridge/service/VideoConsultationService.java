package com.MedBridge.service;

import java.util.UUID;

public class VideoConsultationService {

    public String generateJitsiLink(Long appointmentId) {
        String randomString = UUID.randomUUID().toString().replace("-", "").substring(0, 8);
        String roomName = "MedBridge_" + appointmentId + "_" + randomString;
        return "https://meet.jit.si/" + roomName;
    }
}
