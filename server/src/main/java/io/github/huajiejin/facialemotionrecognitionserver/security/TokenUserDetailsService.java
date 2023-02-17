package io.github.huajiejin.facialemotionrecognitionserver.security;

import io.github.huajiejin.facialemotionrecognitionserver.api.user.User;

import java.util.Optional;

public interface TokenUserDetailsService {

    Optional<String> login(String username, String password);

    Optional<User> findByToken(String token);

    void logout(User user);

}
