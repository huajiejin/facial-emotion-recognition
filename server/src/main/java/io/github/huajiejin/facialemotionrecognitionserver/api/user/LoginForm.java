package io.github.huajiejin.facialemotionrecognitionserver.api.user;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class LoginForm {

    @NotEmpty(message = "username can not be empty!!!")
    private String username;

    @NotEmpty
    private String hash;

}
