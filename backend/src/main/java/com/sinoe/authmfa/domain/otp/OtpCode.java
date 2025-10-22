package com.sinoe.authmfa.domain.otp;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(
    name = "otp_codes",
    indexes = {
        @Index(name = "idx_otp_user_id", columnList = "userId"),
        @Index(name = "idx_otp_expires_at", columnList = "expiresAt")
    }
)
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class OtpCode {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private Long userId;

  @Column(nullable = false, length = 6)
  private String code;

  @Column(nullable = false)
  private Instant expiresAt;

  @Column(nullable = false)
  private int attempts;

  @Column(nullable = false)
  private Instant createdAt;

  private Instant lastSentAt;

  @Column(nullable = false, length = 30)
  private String purpose; // p.ej. "LOGIN"
}
