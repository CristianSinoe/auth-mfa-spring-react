package com.sinoe.authmfa.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;

@Service
public class JwtService {

  private final byte[] keyBytes;
  private final long expMinutes;

  public JwtService(
      @Value("${app.jwt.secret}") String secret,
      @Value("${app.jwt.exp-minutes}") long expMinutes
  ) {
    this.keyBytes = secret.getBytes(StandardCharsets.UTF_8);
    this.expMinutes = expMinutes;
  }

  public String generate(String subjectEmail) {
    Instant now = Instant.now();
    Instant exp = now.plusSeconds(expMinutes * 60);
    return Jwts.builder()
        .setSubject(subjectEmail)
        .setIssuedAt(Date.from(now))
        .setExpiration(Date.from(exp))
        .signWith(Keys.hmacShaKeyFor(keyBytes))
        .compact();
  }
}
