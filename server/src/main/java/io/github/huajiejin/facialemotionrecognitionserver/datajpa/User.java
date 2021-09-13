package io.github.huajiejin.facialemotionrecognitionserver.entity;

import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String name;

    private String username;

    private String avatar;

    private String salt;

    private String passwordHash;

    private String role;
}
