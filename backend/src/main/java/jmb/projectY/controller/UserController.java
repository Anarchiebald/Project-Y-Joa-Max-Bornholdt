package jmb.projectY.controller;

import jmb.projectY.dto.LoginRequest;
import jmb.projectY.dto.RegisterRequest;
import jmb.projectY.dto.UserResponse;
import jmb.projectY.exception.EmailAlreadyExistsException;
import jmb.projectY.exception.InvalidPasswordException;
import jmb.projectY.exception.UserNotFoundException;
import jmb.projectY.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    /**
     * Nimmt die Login-Anfrage an
     *
     * @param loginRequest LoginAnfrage
     * @return user oder error-message
     */
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            UserResponse user = userService.loginUser(loginRequest);
            return ResponseEntity.ok(user);
        } catch (UserNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", ex.getMessage()));
        } catch (InvalidPasswordException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", ex.getMessage()));
        }
    }

    /**
     * Nimmt die Registrierungs-Anfrage an
     *
     * @param registerRequest Registrierungs-Anfrage
     * @return User oder error-message
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        try {
            UserResponse newUser = userService.registerUser(registerRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
        } catch (EmailAlreadyExistsException ex) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", ex.getMessage()));
        }
    }
}
