package com.sinoe.authmfa.service;

import com.sinoe.authmfa.domain.otp.OtpCode;
import com.sinoe.authmfa.domain.otp.OtpRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Instant;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OtpService {

  private final OtpRepository otpRepository;
  private final SecureRandom random = new SecureRandom();

  @Value("${app.otp.exp-minutes}") private long expMinutes;
  @Value("${app.otp.max-attempts}") private int maxAttempts;
  @Value("${app.otp.resend-cooldown-seconds}") private long resendCooldown;

  public String generateAndSave(Long userId, String purpose) {
    String code = String.format("%06d", random.nextInt(1_000_000));
    Instant now = Instant.now();
    OtpCode otp = OtpCode.builder()
        .userId(userId)
        .code(code)
        .createdAt(now)
        .lastSentAt(now)
        .expiresAt(now.plusSeconds(expMinutes * 60))
        .attempts(0)
        .purpose(purpose)
        .build();
    otpRepository.save(otp);
    return code;
  }

  public boolean canResend(Long userId, String purpose) {
    Optional<OtpCode> last = otpRepository.findTopByUserIdAndPurposeOrderByCreatedAtDesc(userId, purpose);
    if (last.isEmpty()) return true;
    OtpCode otp = last.get();
    return otp.getLastSentAt() == null || Instant.now().isAfter(otp.getLastSentAt().plusSeconds(resendCooldown));
  }

  public boolean validateAndConsume(Long userId, String purpose, String code) {
    Optional<OtpCode> lastOpt = otpRepository.findTopByUserIdAndPurposeOrderByCreatedAtDesc(userId, purpose);
    if (lastOpt.isEmpty()) return false;
    OtpCode last = lastOpt.get();

    if (Instant.now().isAfter(last.getExpiresAt())) return false;
    if (last.getAttempts() >= maxAttempts) return false;

    boolean ok = last.getCode().equals(code);
    last.setAttempts(last.getAttempts() + 1);
    otpRepository.save(last);

    return ok;
  }
}
