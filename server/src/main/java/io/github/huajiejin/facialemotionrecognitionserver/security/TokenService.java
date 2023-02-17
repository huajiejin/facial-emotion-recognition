package io.github.huajiejin.facialemotionrecognitionserver.security;

import java.util.Map;
import java.util.Optional;

public interface TokenService {

    String setSubject(String subject);

    String getSubject(String token);

}
