package com.vti.cakeshop25.form;

import com.vti.cakeshop25.entity.Gender;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
public class UserCreateForm {

    @NotBlank
    @Length(min = 3, max = 50)
    private String username;

    @NotBlank
    @Length(min = 3, max = 100)
    private String fullname;

    @NotBlank
    @Length(min = 6, max = 100)
    private String password;

    @NotNull(message = "Giới tính không được để trống")
    private Gender gender;

    @NotBlank
    @Email
    private String email;

    @Pattern(regexp ="^\\+?[0-9]{10,15}$", message = "Số điện thoại không hợp lệ")
    private String phone;

    private LocalDate dob;

    private String address;
}
