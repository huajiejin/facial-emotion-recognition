package io.github.huajiejin.facialemotionrecognitionserver.api.watchlog;

import com.fasterxml.jackson.annotation.JsonRawValue;
import io.github.huajiejin.facialemotionrecognitionserver.api.course.Course;
import io.github.huajiejin.facialemotionrecognitionserver.api.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.Date;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WatchLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    @OneToOne(cascade = CascadeType.ALL)
    private User user;

    @NotEmpty
    @OneToOne(cascade = CascadeType.ALL)
    private Course course;

    @NotEmpty
    @Column(columnDefinition = "json")
    @JsonRawValue
    private String emotion;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;

}
