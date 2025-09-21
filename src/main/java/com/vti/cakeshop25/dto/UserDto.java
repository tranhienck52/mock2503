package com.vti.cakeshop25.dto;

import com.vti.cakeshop25.entity.Gender;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
public class UserDto {
    private int id;

    private String username;

    private String fullname;

    private Gender gender;

    private String email;

    private String phone;

    private LocalDate dob;

    private String address;
}
