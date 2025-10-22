package com.sinoe.authmfa.web;

import com.sinoe.authmfa.domain.user.User;
import com.sinoe.authmfa.dto.AuthDtos.*;
import com.sinoe.authmfa.service.JwtService;
import com.sinoe.authmfa.service.MailService;
import com.sinoe.authmfa.service.OtpService;
import com.sinoe.authmfa.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = { "http://localhost:5173" }, allowCredentials = "true")
public class AuthController {

    private final UserService userService;
    private final OtpService otpService;
    private final MailService mailService;
    private final JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<ApiMessage> register(@Valid @RequestBody RegisterRequest req) {
        userService.register(
                req.firstName(),
                req.lastNamePaternal(),
                req.lastNameMaternal(),
                req.email(),
                req.password());
        return ResponseEntity.ok(new ApiMessage("Usuario registrado"));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiMessage> login(@Valid @RequestBody LoginRequest req) {
        User u = userService.findByEmail(req.email())
                .filter(user -> userService.checkPassword(user, req.password()))
                .orElseThrow(() -> new IllegalArgumentException("Credenciales inválidas"));

        if (!otpService.canResend(u.getId(), "LOGIN")) {
            return ResponseEntity.badRequest().body(new ApiMessage("Espera antes de solicitar un nuevo código"));
        }

        String code = otpService.generateAndSave(u.getId(), "LOGIN");
        mailService.sendOtp(u.getEmail(), code);
        return ResponseEntity.ok(new ApiMessage("OTP enviado al correo"));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@Valid @RequestBody VerifyOtpRequest req) {
        User u = userService.findByEmail(req.email())
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        boolean ok = otpService.validateAndConsume(u.getId(), "LOGIN", req.code());
        if (!ok) {
            return ResponseEntity.badRequest().body(new ApiMessage("OTP inválido o expirado"));
        }
        String token = jwtService.generate(u.getEmail());
        return ResponseEntity.ok(new JwtResponse(token));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiMessage> me(java.security.Principal principal) {
        String email = principal.getName(); // viene del JWT (subject)
        return ResponseEntity.ok(new ApiMessage("Hola, " + email));
    }

}
