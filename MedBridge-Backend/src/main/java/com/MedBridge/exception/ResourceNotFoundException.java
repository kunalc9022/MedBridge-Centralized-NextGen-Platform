package com.MedBridge.exception;

public class ResourceNotFoundException  extends RuntimeException{
    public ResourceNotFoundException(String msg){
        super(msg);
    }
    public ResourceNotFoundException(String resourceName, String fieldName, Object fieldValue) {
        super(resourceName + " not found with " + fieldName + " : " + fieldValue);
    }
}
