package com.MedBridge.dto;



import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AmbulanceLocationDto {
    private Long ambulanceId;
    private Double latitude;
    private Double longitude;
}
