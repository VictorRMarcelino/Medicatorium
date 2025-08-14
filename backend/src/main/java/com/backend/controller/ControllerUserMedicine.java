package com.backend.controller;

import com.backend.entity.EntityUserMedicine;
import com.backend.service.ServiceUserMedicine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class ControllerUserMedicine {

    @Autowired
    ServiceUserMedicine oServiceUserMedicine;

    @PostMapping("/userMedicine/store")
    public void storeUser(@RequestBody EntityUserMedicine userMedicine) {
        oServiceUserMedicine.store(userMedicine);
    }

    @PutMapping("/userMedicine/update")
    public void updateUser(@RequestBody EntityUserMedicine userMedicine) {
        oServiceUserMedicine.update(userMedicine);
    }

    @DeleteMapping("/userMedicine/delete/{id}")
    public void deleteUser(@RequestParam long userMedicineId) {
        oServiceUserMedicine.delete(userMedicineId);
    }
}
