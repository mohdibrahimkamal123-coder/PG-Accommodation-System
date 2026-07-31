
package com.Project.SmartStay.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Project.SmartStay.dto.ChangePasswordRequest;
import com.Project.SmartStay.entity.User;
import com.Project.SmartStay.exception.ResourceNotFoundException;
import com.Project.SmartStay.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Register User
    public User registerUser(User user) {
        return userRepository.save(user);
    }

    // Get All Users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get User By Id
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found with id : " + id));
    }

    // Update User
    public User updateUser(Long id, User updatedUser) {

        User user = getUserById(id);

        user.setFullName(updatedUser.getFullName());
        user.setPhone(updatedUser.getPhone());
        user.setGender(updatedUser.getGender());

        return userRepository.save(user);
    }

    // Delete User
    public void deleteUser(Long id) {

        User user = getUserById(id);

        userRepository.delete(user);
    }
    
    public String changePassword(Long userId, ChangePasswordRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User Not Found"));

        if (!user.getPassword().equals(request.getOldPassword())) {
            throw new RuntimeException("Old Password is Incorrect");
        }

        user.setPassword(request.getNewPassword());

        userRepository.save(user);

        return "Password Changed Successfully";
    }
}

