package com.vti.cakeshop25.service;

import com.vti.cakeshop25.dto.AddressDto;
import com.vti.cakeshop25.form.AddressCreateForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AddressService {
    Page<AddressDto> getAllAddress(Pageable pageable);
    AddressDto getAddress(int id);
    AddressDto createAddress(AddressCreateForm form);
    void deleteAddress(int id);
}
