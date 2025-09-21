package com.vti.cakeshop25.service;

import com.vti.cakeshop25.dto.AddressDto;
import com.vti.cakeshop25.entity.Address;
import com.vti.cakeshop25.form.AddressCreateForm;
import com.vti.cakeshop25.repository.AddressRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AddressServiceImpl implements AddressService{
    private final AddressRepository addressRepository;
    private final ModelMapper modelMapper;

    @Override
    public Page<AddressDto> getAllAddress(Pageable pageable) {
        return addressRepository.findAll(pageable).map(address -> modelMapper.map(address, AddressDto.class));
    }

    @Override
    public AddressDto getAddress(int id) {
        return null;
    }

    @Override
    public AddressDto createAddress(AddressCreateForm form) {
        Address address = modelMapper.map(form, Address.class);
        addressRepository.save(address);
        return modelMapper.map(address, AddressDto.class);
    }

    @Override
    public void deleteAddress(int id) {
        addressRepository.deleteById(id);
    }


}
