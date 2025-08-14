package com.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tbusermedicine")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EntityUserMedicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private String name;
    private int emailRemider;
    private int whatsappReminder;
}
