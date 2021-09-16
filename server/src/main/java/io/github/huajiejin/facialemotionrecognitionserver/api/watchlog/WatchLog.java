package io.github.huajiejin.facialemotionrecognitionserver.api.watchlog;

import com.fasterxml.jackson.annotation.JsonRawValue;
import io.github.huajiejin.facialemotionrecognitionserver.api.course.Course;
import io.github.huajiejin.facialemotionrecognitionserver.api.user.User;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
public class WatchLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    private User user;

    @OneToOne(cascade = CascadeType.ALL)
    private Course course;

    private Date startTime;

    private Date endTime;

    @Column(columnDefinition = "json")
    @JsonRawValue
    private String emotion;
}
