package io.github.huajiejin.facialemotionrecognitionserver.api.watchlog;

import io.github.huajiejin.facialemotionrecognitionserver.api.course.Course;
import io.github.huajiejin.facialemotionrecognitionserver.api.user.User;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WatchLogService {

    @NonNull private final WatchLogRepository watchLogRepository;

    WatchLog save(User user, Long courseId, String emotion) {
        Course course = new Course();
        course.setId(courseId);

        WatchLog watchLog = WatchLog
                .builder()
                .user(user)
                .course(course)
                .emotion(emotion)
                .build();

        watchLogRepository.save(watchLog);

        return watchLog;
    }

}
