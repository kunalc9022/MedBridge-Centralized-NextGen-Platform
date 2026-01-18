package com.MedBridge.controller;


import com.MedBridge.dto.AmbulanceLocationDto;
import com.MedBridge.service.AmbulanceLocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;



@Controller
public class AmbulanceSocketController {

    @Autowired
    private AmbulanceLocationService locationService;

    @MessageMapping("/ambulance/update-location")
    public void updateLocation(@Payload AmbulanceLocationDto dto) {
        locationService.updateLocationAndBroadcast(dto);
    }
}

