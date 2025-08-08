package com.backend.controller;

import com.backend.entity.EntityUser;
import com.backend.service.ServiceUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class ControllerUser {

    @Autowired
    ServiceUser oServiceUser;

    @PostMapping("/user/store")
    public void storeUser(@RequestBody EntityUser user) {
        oServiceUser.store(user);
    }

    @PutMapping("/user/update")
    public void updateUser(@RequestBody EntityUser user) {
        oServiceUser.update(user);
    }

    @DeleteMapping("/user/delete/{id}")
    public void deleteUser(@RequestParam long userId) {
        oServiceUser.delete(userId);
    }
}