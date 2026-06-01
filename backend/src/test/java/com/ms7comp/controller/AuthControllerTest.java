package com.ms7comp.controller;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void login_admin_success() throws Exception {
        loginAs("admin", "msrx7");
    }

    @Test
    void login_client_success() throws Exception {
        loginAs("client", "msrx8");
    }

    @Test
    void login_employee_success() throws Exception {
        loginAs("employee", "msrx9");
    }

    @Test
    void login_wrongPassword_returnsUnauthorized() throws Exception {
        mockMvc.perform(
            post("/api/auth/login")
                .contentType(APPLICATION_JSON)
                .content("{\"username\":\"admin\",\"password\":\"wrong-password\"}")
        )
            .andExpect(status().isUnauthorized());
    }

    @Test
    void login_responseDoesNotExposePasswordHash() throws Exception {
        mockMvc.perform(
            post("/api/auth/login")
                .contentType(APPLICATION_JSON)
                .content("{\"username\":\"client\",\"password\":\"msrx8\"}")
        )
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.token").isNotEmpty())
            .andExpect(jsonPath("$.username").value("client"))
            .andExpect(jsonPath("$.role").value("CLIENT"))
            .andExpect(jsonPath("$.password").doesNotExist())
            .andExpect(jsonPath("$.passwordHash").doesNotExist());
    }

    private void loginAs(String username, String password) throws Exception {
        String body = String.format(
            "{\"username\":\"%s\",\"password\":\"%s\"}",
            username,
            password
        );
        mockMvc.perform(post("/api/auth/login").contentType(APPLICATION_JSON).content(body))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.token").isNotEmpty())
            .andExpect(jsonPath("$.username").value(username));
    }
}
