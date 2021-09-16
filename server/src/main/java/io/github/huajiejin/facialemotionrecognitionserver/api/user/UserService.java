package io.github.huajiejin.facialemotionrecognitionserver.api.user;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Locale;
import java.util.Optional;

import static lombok.AccessLevel.PACKAGE;

@Service
@RequiredArgsConstructor(access = PACKAGE)
public class UserService {

    @NonNull private final UserRepository userRepository;

    @NonNull private final RoleRepository roleRepository;

    @NonNull private final PasswordEncoder passwordEncoder;

    public Optional<User> findById(Long id) {
        return this.userRepository.findById(id);
    }

    public Optional<User> findByUsername(String username) {
        return this.userRepository.findByUsername(username);
    }

    public User saveUser(UserCreationForm userCreationForm) {
        Role userRole = roleRepository.findByRole(userCreationForm.getRole().toUpperCase(Locale.ROOT));
        String username = userCreationForm.getUsername();
        String salt = RandomStringUtils.random(16, true, true);
        String encodedPassword = encodePassword(username, salt, userCreationForm.getPassword());
        User user = User
                .builder()
                .username(username)
                .salt(salt)
                .password(encodedPassword)
                .enabled(true)
                .roles(new HashSet<Role>(Arrays.asList(userRole)))
                .build();
        return userRepository.save(user);
    }

    public String encodePassword(String username, String salt, String password) {
        return passwordEncoder.encode(username + salt + password);
    }

    public Boolean isPasswordValid(User user, String password) {
        String username = user.getUsername();
        String salt = user.getSalt();
        String encodedPassword = user.getPassword();
        return passwordEncoder.matches(username + salt + password, encodedPassword);
    }

}
