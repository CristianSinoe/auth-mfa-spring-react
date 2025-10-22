package com.sinoe.authmfa.dto;

import jakarta.validation.constraints.*;

public class AuthDtos {

    public static final String NAME_REGEX = "^[\\p{L}\\p{M} .'-]{1,80}$";

    public record RegisterRequest(
            @NotBlank @Pattern(regexp = NAME_REGEX, message = "Nombre contiene caracteres inválidos") String firstName,

            @NotBlank @Pattern(regexp = NAME_REGEX, message = "Apellido paterno inválido") String lastNamePaternal,

            @Pattern(regexp = NAME_REGEX, message = "Apellido materno inválido") String lastNameMaternal,

            @Email @NotBlank String email,
            @Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres") String password) {
    }

    public record LoginRequest(
            @Email @NotBlank String email,
            @NotBlank String password) {
    }

    public record VerifyOtpRequest(
            @Email @NotBlank String email,
            @NotBlank String code) {
    }

    public record JwtResponse(String token) {
    }

    public record ApiMessage(String message) {
    }
}
