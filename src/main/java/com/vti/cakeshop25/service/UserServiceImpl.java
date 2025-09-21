package com.vti.cakeshop25.service;

import com.vti.cakeshop25.dto.UserDto;
import com.vti.cakeshop25.entity.User;
import com.vti.cakeshop25.form.UserCreateForm;
import com.vti.cakeshop25.form.UserUpdateForm;
import com.vti.cakeshop25.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    public UserDto getUsers(int id) {
        User user = userRepository.findById(id).orElseThrow(()->new RuntimeException("User not found"));
        return modelMapper.map(user, UserDto.class);
    }

    @Override
    public UserDto create(UserCreateForm form) {
        User user = modelMapper.map(form, User.class);
        userRepository.save(user);
        return modelMapper.map(user, UserDto.class);
    }

    @Override
    public UserDto update(UserUpdateForm form, int id) {
        User user = userRepository.findById(id).orElseThrow(()->new RuntimeException("User not found"));
        modelMapper.map(form, user);
        userRepository.save(user);
        return modelMapper.map(user, UserDto.class);
    }
}
