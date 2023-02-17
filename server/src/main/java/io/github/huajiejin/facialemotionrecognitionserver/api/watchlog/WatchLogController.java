package io.github.huajiejin.facialemotionrecognitionserver.api.watchlog;

import io.github.huajiejin.facialemotionrecognitionserver.api.user.User;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/watch-log")
@RequiredArgsConstructor
@Log4j2
public class WatchLogController {

    @NonNull
    private final WatchLogService watchLogService;

    @PostMapping
    void save(
            @AuthenticationPrincipal @Parameter(hidden = true) final User user,
            @RequestBody Long courseId,
            @RequestBody String emotion
    ) {
        log.info(user);
        log.info(courseId);
        log.info(emotion);
        this.watchLogService.save(user, courseId, emotion);
    }

}
