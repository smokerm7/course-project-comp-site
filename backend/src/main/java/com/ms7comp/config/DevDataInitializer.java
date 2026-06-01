package com.ms7comp.config;

import com.ms7comp.entity.Client;
import com.ms7comp.entity.Employee;
import com.ms7comp.entity.Role;
import com.ms7comp.entity.User;
import com.ms7comp.repository.ClientRepository;
import com.ms7comp.repository.EmployeeRepository;
import com.ms7comp.repository.UserRepository;
import java.util.Optional;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Creates default service accounts on first run and keeps their passwords in sync
 * (admin, client, employee) for deployment and local development.
 */
@Component
public class DevDataInitializer implements CommandLineRunner {

    private static final String ADMIN_PASSWORD = "msrx7";
    private static final String CLIENT_PASSWORD = "msrx8";
    private static final String EMPLOYEE_PASSWORD = "msrx9";

    private final UserRepository userRepository;
    private final ClientRepository clientRepository;
    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;

    public DevDataInitializer(
        UserRepository userRepository,
        ClientRepository clientRepository,
        EmployeeRepository employeeRepository,
        PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.clientRepository = clientRepository;
        this.employeeRepository = employeeRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        ensureAccount("client", "client@ms7.local", CLIENT_PASSWORD, Role.CLIENT, true, false);
        ensureAccount("employee", "employee@ms7.local", EMPLOYEE_PASSWORD, Role.EMPLOYEE, false, true);
        ensureAccount("admin", "admin@ms7.local", ADMIN_PASSWORD, Role.ADMIN, false, false);
    }

    private void ensureAccount(
        String username,
        String email,
        String password,
        Role role,
        boolean asClient,
        boolean asEmployee
    ) {
        Optional<User> existing = userRepository.findByUsername(username);
        if (existing.isPresent()) {
            User user = existing.get();
            user.passwordHash = passwordEncoder.encode(password);
            user.role = role;
            userRepository.save(user);
            ensureClientProfile(user, asClient);
            ensureEmployeeProfile(user, asEmployee);
            return;
        }

        createUser(username, email, password, role, asClient, asEmployee);
    }

    private void createUser(
        String username,
        String email,
        String password,
        Role role,
        boolean asClient,
        boolean asEmployee
    ) {
        User user = new User();
        user.username = username;
        user.email = email;
        user.passwordHash = passwordEncoder.encode(password);
        user.role = role;
        userRepository.save(user);
        ensureClientProfile(user, asClient);
        ensureEmployeeProfile(user, asEmployee);
    }

    private void ensureClientProfile(User user, boolean asClient) {
        if (!asClient || clientRepository.findByUserId(user.id).isPresent()) {
            return;
        }
        Client client = new Client();
        client.user = user;
        client.fullName = "Тестовый Клиент";
        client.phone = "+7-900-000-00-01";
        client.address = "Ставрополь";
        clientRepository.save(client);
    }

    private void ensureEmployeeProfile(User user, boolean asEmployee) {
        if (!asEmployee || employeeRepository.findByUserId(user.id).isPresent()) {
            return;
        }
        Employee employee = new Employee();
        employee.user = user;
        employee.fullName = "Тестовый Сотрудник";
        employee.position = "Мастер ремонта";
        employee.phone = "+7-900-000-00-02";
        employeeRepository.save(employee);
    }
}
