package com.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tbuser")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EntityUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String cpf;
    String password;
    String fullname;
}
