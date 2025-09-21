package com.vti.cakeshop25.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
public class AddressDto {
    private int id;

    private String fullname;

    @NotBlank(message = "Địa chỉ không được để trống")
    private String address;

    private int phoneAddress;
}
