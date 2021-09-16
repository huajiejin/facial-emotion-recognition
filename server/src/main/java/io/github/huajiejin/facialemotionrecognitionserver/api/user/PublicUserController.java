package io.github.huajiejin.facialemotionrecognitionserver.api.user;

import io.github.huajiejin.facialemotionrecognitionserver.security.TokenUserDetailsService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static lombok.AccessLevel.PACKAGE;

@RestController
@RequestMapping("/public/user")
@RequiredArgsConstructor(access = PACKAGE)
@Log4j2
public class PublicUserController {

    @NonNull private final TokenUserDetailsService tokenUserDetailsService;

    @NonNull private final UserService userService;

    @PostMapping("/register")
    public User createUser(UserCreationForm userCreationForm) {
        log.info(userCreationForm);
        User user = userService.saveUser(userCreationForm);
        login(userCreationForm);
        return user;
    }

    @PostMapping("/login")
    public String login(UserCreationForm userCreationForm) {
        log.info(userCreationForm);
        return tokenUserDetailsService
                .login(userCreationForm.getUsername(), userCreationForm.getPassword())
                .orElseThrow(() -> new RuntimeException("invalid username or password"));
    }

}
