package com.vti.cakeshop25.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Digits;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
@Entity
@Table(name = "Address")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "fullname", nullable = false, length = 100)
    private String fullname;

    @Column(name = "address", nullable = false, length = 255)
    private String address;

    @Column(name = "phoneAddress", nullable = false, length = 15)
    @Digits(integer = 15, fraction = 10, message = "Số điện thoại phải nhiều hơn 10 chữ số và ít hơn 15 chữ số")
    private int phoneAddress ;

}
