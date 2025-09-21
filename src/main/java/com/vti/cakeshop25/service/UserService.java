package com.vti.cakeshop25.service;

import com.vti.cakeshop25.dto.UserDto;
import com.vti.cakeshop25.form.UserCreateForm;
import com.vti.cakeshop25.form.UserUpdateForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {
    UserDto getUsers(int id);
    UserDto create(UserCreateForm form);
    UserDto update(UserUpdateForm form, int id);
}
