package com.sinoe.authmfa.dto;

import jakarta.validation.constraints.*;

public class AuthDtos {

  public record RegisterRequest(
      @NotBlank String firstName,
      @NotBlank String lastName,
      @Email @NotBlank String email,
      @Size(min = 8) String password
  ) {}

  public record LoginRequest(
      @Email @NotBlank String email,
      @NotBlank String password
  ) {}

  public record VerifyOtpRequest(
      @Email @NotBlank String email,
      @NotBlank String code
  ) {}

  public record JwtResponse(String token) {}

  public record ApiMessage(String message) {}
}
