package com.sinoe.authmfa.security;

import com.sinoe.authmfa.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

  private final JwtService jwtService;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
      throws ServletException, IOException {

    String header = request.getHeader(HttpHeaders.AUTHORIZATION);
    if (header != null && header.startsWith("Bearer ")) {
      String token = header.substring(7);
      try {
        String subject = jwtService.parseSubject(token);
        var auth = new AbstractAuthenticationToken(AuthorityUtils.NO_AUTHORITIES) {
          @Override public Object getCredentials() { return token; }
          @Override public Object getPrincipal() { return subject; }
        };
        auth.setAuthenticated(true);
        SecurityContextHolder.getContext().setAuthentication(auth);
      } catch (Exception e) {
        // Token inválido: limpiamos el contexto y seguimos; caerá en 401 si el endpoint requiere auth
        SecurityContextHolder.clearContext();
      }
    }
    chain.doFilter(request, response);
  }
}
