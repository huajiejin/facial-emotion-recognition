package io.github.huajiejin.facialemotionrecognitionserver.api.watchlog;

import io.github.huajiejin.facialemotionrecognitionserver.datajpa.User;
import org.springframework.data.repository.CrudRepository;

public interface WatchLogRepository extends CrudRepository<User, Long> {
}
