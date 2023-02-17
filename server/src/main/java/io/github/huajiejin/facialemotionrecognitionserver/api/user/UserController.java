package io.github.huajiejin.facialemotionrecognitionserver.api.user;

import io.github.huajiejin.facialemotionrecognitionserver.security.TokenUserDetailsService;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.security.Principal;

import static lombok.AccessLevel.PACKAGE;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor(access = PACKAGE)
@Log4j2
public class UserController {

    @NonNull
    private final TokenUserDetailsService tokenUserDetailsService;

    @GetMapping
    @Transactional
    public User getUser(@AuthenticationPrincipal @Parameter(hidden = true) final User user) {
        log.info(user);
        return user;
    }

    @GetMapping("/logout")
    public Boolean logout(@AuthenticationPrincipal @Parameter(hidden = true) final User user) {
        tokenUserDetailsService.logout(user);
        return true;
    }

}
