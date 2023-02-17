package io.github.huajiejin.facialemotionrecognitionserver.security;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

// finding the user by it’s authentication token.
@Component
@RequiredArgsConstructor(access = AccessLevel.PACKAGE)
@Log4j2
public class TokenAuthenticationProvider extends AbstractUserDetailsAuthenticationProvider {

    @NonNull private final TokenUserDetailsService tokenUserDetailsService;

    @Override
    protected void additionalAuthenticationChecks(UserDetails userDetails, UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken) throws AuthenticationException {

    }

    @Override
    protected UserDetails retrieveUser(String s, UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken) throws AuthenticationException {
        final Object tokenCredentials = usernamePasswordAuthenticationToken.getCredentials();
        log.info(tokenCredentials);
        return Optional
                .ofNullable(tokenCredentials)
                .map(String::valueOf)
                .flatMap(tokenUserDetailsService::findByToken)
                .orElseThrow(() -> new UsernameNotFoundException("tokenCredentials="+tokenCredentials));
    }

}
