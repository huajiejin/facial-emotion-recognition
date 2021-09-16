package io.github.huajiejin.facialemotionrecognitionserver.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PasswordEncoderImpl extends BCryptPasswordEncoder implements PasswordEncoder {
}
