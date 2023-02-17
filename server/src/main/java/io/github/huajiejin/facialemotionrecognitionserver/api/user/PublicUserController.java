package io.github.huajiejin.facialemotionrecognitionserver.api.user;

import io.github.huajiejin.facialemotionrecognitionserver.api.result.RestResult;
import io.github.huajiejin.facialemotionrecognitionserver.security.TokenUserDetailsService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import static lombok.AccessLevel.PACKAGE;

@RestController
@RequestMapping("/public/user")
@RequiredArgsConstructor(access = PACKAGE)
@Log4j2
public class PublicUserController {

    @NonNull private final TokenUserDetailsService tokenUserDetailsService;

    @NonNull private final UserService userService;

    @PostMapping("/register")
    @ResponseBody
    public RestResult<String> createUser(@RequestBody UserCreationForm userCreationForm) {
        log.info(userCreationForm);
        User user = userService.saveUser(userCreationForm);
        return login(userCreationForm);
    }

    @PostMapping(value = "/login", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    @ResponseBody
    public RestResult<String> login(@RequestBody UserCreationForm userCreationForm) {
        log.info(userCreationForm);
        return tokenUserDetailsService
                .login(userCreationForm.getUsername(), userCreationForm.getPassword())
                .map(token -> RestResult.result(token))
                .orElseThrow(() -> new RuntimeException("invalid username or password"));
    }

}
