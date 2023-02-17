package io.github.huajiejin.facialemotionrecognitionserver.security;

import io.github.huajiejin.facialemotionrecognitionserver.api.user.User;
import io.github.huajiejin.facialemotionrecognitionserver.api.user.UserService;
import io.github.huajiejin.facialemotionrecognitionserver.security.TokenService;
import io.github.huajiejin.facialemotionrecognitionserver.security.TokenUserDetailsService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

import static lombok.AccessLevel.PACKAGE;

@Service
@RequiredArgsConstructor(access = PACKAGE)
@Log4j2
public class TokenUserDetailsServiceImpl implements TokenUserDetailsService {

    @NonNull private final UserService userService;

    @NonNull private final TokenService tokenService;

    @Override
    public Optional<String> login(String username, String password) {
        Optional<User> user = userService.findByUsername(username);
        return user
                .filter(u -> userService.isPasswordValid(u, password))
                .map(u -> tokenService.setSubject(u.getUsername()));
    }

    @Override
    public Optional<User> findByToken(String token) {
        return Optional
                .of(tokenService.getSubject(token))
                .flatMap(userService::findByUsername);
    }

    @Override
    public void logout(User user) {

    }
}
