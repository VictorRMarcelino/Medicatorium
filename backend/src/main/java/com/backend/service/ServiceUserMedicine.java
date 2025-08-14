package com.backend.service;

import com.backend.entity.EntityUserMedicine;
import com.backend.repository.RepositoryUserMedicine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceUserMedicine {

    @Autowired
    RepositoryUserMedicine oRespositoryUserMedicine;

    /**
     * Create a new user medicine
     * @param userMedicine Entity of UserMedicine
     */
    public void store(EntityUserMedicine userMedicine) {
        oRespositoryUserMedicine.save(userMedicine);
    }

    /**
     * Update the user information
     * @param userMedicine Entity of user medicine
     */
    public void update(EntityUserMedicine userMedicine) {
        oRespositoryUserMedicine.save(userMedicine);
    }

    /**
     * Delete a user medicine by the ID
     * @param userMedicineId ID of user medicine
     */
    public void delete(Long userMedicineId) {
        oRespositoryUserMedicine.deleteById(userMedicineId);
    }
}
