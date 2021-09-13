package io.github.huajiejin.facialemotionrecognitionserver.datajpa;

import io.github.huajiejin.facialemotionrecognitionserver.api.course.Course;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
public class WatchLog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    private User user;

    @OneToOne(cascade = CascadeType.ALL)
    private Course course;

    private Date startTime;

    private Date endTime;

    private String emotion;
}
