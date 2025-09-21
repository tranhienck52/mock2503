package com.vti.cakeshop25.form;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
public class AddressCreateForm {
    @NotBlank
    private String fullname;

    @NotBlank
    private String address;

    @Digits(integer = 15, fraction = 10, message = "Số điện thoại phải nhiều hơn 10 chữ số và ít hơn 15 chữ số")
    private int phoneAddress;
}
