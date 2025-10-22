package com.sinoe.authmfa.service;

import com.sinoe.authmfa.domain.user.User;
import com.sinoe.authmfa.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;
  private final BCryptPasswordEncoder encoder;

  public User register(String first, String last, String email, String rawPassword) {
    if (userRepository.existsByEmail(email)) {
      throw new IllegalStateException("Email ya registrado");
    }
    User u = User.builder()
        .firstName(first)
        .lastName(last)
        .email(email.toLowerCase())
        .passwordHash(encoder.encode(rawPassword))
        .enabled(true)
        .build();
    return userRepository.save(u);
  }

  public Optional<User> findByEmail(String email) {
    return userRepository.findByEmail(email.toLowerCase());
  }

  public boolean checkPassword(User u, String raw) {
    return encoder.matches(raw, u.getPasswordHash());
  }
}
