package com.vti.cakeshop25.controller;

import com.vti.cakeshop25.form.AddressCreateForm;
import com.vti.cakeshop25.service.AddressService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Validated
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AddressController {
    private AddressService addressService;

    @GetMapping("/api/v1/addresses")
    public ResponseEntity<?> getAllAddress(Pageable pageable){
        return ResponseEntity.ok(addressService.getAllAddress(pageable));
    }

    @PostMapping(value = "/api/v1/addresses")
    public ResponseEntity<?> createAddress(@RequestBody @Valid AddressCreateForm form){
        return ResponseEntity.ok(addressService.createAddress(form));
    }

    @DeleteMapping(value = "/api/v1/addresses/{id}")
    public ResponseEntity<?> deleteAddress(@PathVariable int id){
        addressService.deleteAddress(id);
        return ResponseEntity.ok("Delete successfully");
    }
}
