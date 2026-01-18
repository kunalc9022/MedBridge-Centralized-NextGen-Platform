package com.MedBridge.controller;

import com.MedBridge.dto.RefundRequest;
import com.MedBridge.service.RazorpayService;
import com.razorpay.RazorpayClient;
import com.razorpay.Refund;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:5173" , "http://localhost:3000"})
@RequestMapping("/api/payment")
public class RazorpayController {

    @Autowired
    private RazorpayService razorpayService;

    private final String KEY = "rzp_test_TNpcedZQbcsMrm"; // Replace with your Razorpay Key ID
    private final String SECRET = "MlTwYdCqYFt1QeDtI9P97nWt"; // Replace with Razorpay secret


    @PostMapping("/createOrder")
    public ResponseEntity<?> createOrder(@RequestParam int amount) {
        try {
            String orderStr = razorpayService.createOrder(amount);
            JSONObject orderJson = new JSONObject(orderStr);

            Map<String, Object> order = new HashMap<>();
            order.put("id", orderJson.getString("id"));
            order.put("amount", orderJson.getInt("amount"));
            order.put("currency", orderJson.getString("currency"));

            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating order: " + e.getMessage());
        }
    }

    @PostMapping("/refund")
    public ResponseEntity<String> refundPayment(@RequestBody RefundRequest refundRequest) {
        try {
            RazorpayClient razorpay = new RazorpayClient(KEY, SECRET);

            int amountInPaise = refundRequest.getAmount() * 100;

            JSONObject refundReq = new JSONObject();
            refundReq.put("amount", amountInPaise);

            Refund refund = razorpay.payments.refund(refundRequest.getPaymentId(), refundReq);

            return ResponseEntity.ok(refund.toString());
        } catch (Exception e) {
            e.printStackTrace();
            String msg = e.getMessage();
            // Return error message with details
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Refund failed: " + msg);
        }
    }



    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, String> data) {
        boolean isVerified = razorpayService.verifyPayment(
                data.get("order_id"),
                data.get("razorpay_payment_id"),
                data.get("razorpay_signature"));

        if (isVerified) {
            return ResponseEntity.ok("Payment verified");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid signature");
        }
    }
}

