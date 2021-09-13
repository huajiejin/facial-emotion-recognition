package io.github.huajiejin.facialemotionrecognitionserver.api.course;

import io.github.huajiejin.facialemotionrecognitionserver.datajpa.User;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private String description;

    private String poster;

    @ManyToOne(cascade = CascadeType.ALL)
    private User user;
}
