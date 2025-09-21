package com.vti.cakeshop25.controller;

import com.vti.cakeshop25.form.UserCreateForm;
import com.vti.cakeshop25.form.UserUpdateForm;
import com.vti.cakeshop25.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Validated
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    private UserService userService;

    @GetMapping("/api/v1/users/{id}")
    public ResponseEntity<?> getUsers(@PathVariable int id){
        return ResponseEntity.ok(userService.getUsers(id));
    }

    @PostMapping(value = "/api/v1/users")
    public ResponseEntity<?> create(@RequestBody @Valid UserCreateForm form){
        return ResponseEntity.ok(userService.create(form));
    }

    @PutMapping(value = "/api/v1/users/{id}")
    public ResponseEntity<?> update(@RequestBody @Valid UserUpdateForm form,@PathVariable int id){
        return ResponseEntity.ok(userService.update(form,id));
    }
}
