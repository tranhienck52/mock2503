package com.vti.cakeshop25.form;

import com.vti.cakeshop25.entity.Gender;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
public class UserUpdateForm {

//    @Length(min = 3, max = 50)
//    private String username;

    @Length(min = 3, max = 100)
    private String fullname;


//    @Length(min = 6, max = 100)
//    private String password;

    private Gender gender;

    @NotNull
    @Email
    private String email;

    @Length(min = 10, max = 15)
    private String phone;
    
    private LocalDate dob;

    private String address;
}
