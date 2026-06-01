package com.ms7comp.service;

import com.ms7comp.dto.AuthResponse;
import com.ms7comp.dto.LoginRequest;
import com.ms7comp.dto.RegisterRequest;
import com.ms7comp.entity.Client;
import com.ms7comp.entity.Role;
import com.ms7comp.entity.User;
import com.ms7comp.exception.ApiException;
import com.ms7comp.repository.ClientRepository;
import com.ms7comp.repository.UserRepository;
import com.ms7comp.security.JwtService;
import com.ms7comp.security.UserPrincipal;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final ClientRepository clientRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthService(
        UserRepository userRepository,
        ClientRepository clientRepository,
        PasswordEncoder passwordEncoder,
        AuthenticationManager authenticationManager,
        JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.clientRepository = clientRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.username())) {
            throw new ApiException(HttpStatus.CONFLICT, "Имя пользователя уже занято");
        }
        if (userRepository.existsByEmail(request.email())) {
            throw new ApiException(HttpStatus.CONFLICT, "Email уже зарегистрирован");
        }

        User user = new User();
        user.username = request.username();
        user.email = request.email();
        user.passwordHash = passwordEncoder.encode(request.password());
        user.role = Role.CLIENT;
        userRepository.save(user);

        Client client = new Client();
        client.user = user;
        client.fullName = request.fullName();
        client.phone = request.phone();
        clientRepository.save(client);

        return buildToken(user);
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.username(), request.password())
        );
        User user = userRepository.findByUsername(request.username())
            .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "Пользователь не найден"));
        return buildToken(user);
    }

    private AuthResponse buildToken(User user) {
        UserPrincipal principal = new UserPrincipal(user);
        String token = jwtService.generateToken(principal);
        return new AuthResponse(token, user.username, user.role);
    }
}
