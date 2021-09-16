package io.github.huajiejin.facialemotionrecognitionserver.api.user;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotEmpty;

@Data
public class UserCreationForm {

    @Length(min = 5, message = "*Your user name must have at least 5 characters")
    @NotEmpty(message = "username can not be empty!!!")
    private String username;

    @NotEmpty
    private String password;

    private String role = "STUDENT";

}
