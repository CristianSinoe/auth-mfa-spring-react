package com.sinoe.authmfa.domain.user;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
    name = "users",
    uniqueConstraints = @UniqueConstraint(columnNames = "email")
)
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 80)
  private String firstName;

  @Column(nullable = false, length = 80)
  private String lastNamePaternal;

  @Column(nullable = false, length = 80)
  private String lastNameMaternal;

  @Column(nullable = false, unique = true, length = 160)
  private String email;

  @Column(nullable = false, length = 255)
  private String passwordHash;

  @Column(nullable = false)
  private boolean enabled = true;
}
