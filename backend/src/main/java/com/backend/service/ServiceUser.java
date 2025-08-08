package com.backend.service;

import com.backend.entity.EntityUser;
import com.backend.repository.RepositoryUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceUser {

    @Autowired
    RepositoryUser oRespositoryUser;

    /**
     * Create a new user
     * @param oUser
     */
    public void store(EntityUser oUser) {
        oRespositoryUser.save(oUser);
    }

    /**
     * Update the user information
     * @param oUser
     */
    public void update(EntityUser oUser) {
        oRespositoryUser.save(oUser);
    }

    /**
     * Delete a user by the ID
     * @param userId
     */
    public void delete(Long userId) {
        oRespositoryUser.deleteById(userId);
    }
}
