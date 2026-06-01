package com.ms7comp.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*; import java.time.LocalDateTime;
@Entity @Table(name="users")
public class User {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id;
 @Column(nullable=false,unique=true) public String username;
 @Column(nullable=false,unique=true) public String email;
 @JsonIgnore @Column(name="password_hash",nullable=false) public String passwordHash;
 @Enumerated(EnumType.STRING) @Column(nullable=false) public Role role;
 @Column(name="created_at") public LocalDateTime createdAt = LocalDateTime.now();
}
