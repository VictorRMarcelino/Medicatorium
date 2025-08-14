package com.backend.repository;

import com.backend.entity.EntityUserMedicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryUserMedicine extends JpaRepository<EntityUserMedicine, Long> {}
