package com.MedBridge.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RefundRequest {
    private String paymentId;
    private int amount; // in rupees


}

