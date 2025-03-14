package jmb.projectY.service;

import jmb.projectY.dto.LoginRequest;
import jmb.projectY.dto.RegisterRequest;
import jmb.projectY.dto.UserResponse;
import jmb.projectY.exception.EmailAlreadyExistsException;
import jmb.projectY.exception.InvalidPasswordException;
import jmb.projectY.exception.UserNotFoundException;
import jmb.projectY.model.UserAccount;
import jmb.projectY.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService{
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;


    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    /**
     * Überprüft die eingegebene Login-Anfrage
     *
     * @param loginRequest Login-Anfrage
     * @return user oder Fehlermeldung
     */
    public UserResponse loginUser(LoginRequest loginRequest) {
        UserAccount user = userRepository.findByEmail(loginRequest.getEmail().toLowerCase())
                .orElseThrow(() -> new UserNotFoundException("User does not exist"));
        if (!bCryptPasswordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new InvalidPasswordException("Invalid password");
        }
        return toUserResponse(user);
    }

    /**
     * Erstellt einen neuen user auf Basis der Registrierungs-Anfrage
     *
     * @param registerRequest Registrierungs-Anfrage
     * @return user oder Fehlermeldung
     */
    public UserResponse registerUser (RegisterRequest registerRequest) {
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException("Email already in use");
        }

        UserAccount userAccount = new UserAccount();
        userAccount.setEmail(registerRequest.getEmail().toLowerCase());
        userAccount.setFirstName(registerRequest.getFirstName());
        userAccount.setLastName(registerRequest.getLastName());
        userAccount.setUsername(registerRequest.getUsername());
        userAccount.setPassword(bCryptPasswordEncoder.encode(registerRequest.getPassword()));

        return toUserResponse(userRepository.save(userAccount));
    }

    /**
     * Konvertiert einen UserAccount in eine UserResponse
     *
     * @param userAccount User
     * @return UserResponse
     */
    public UserResponse toUserResponse(UserAccount userAccount) {
        return new UserResponse(userAccount.getId(),
                userAccount.getUsername(),
                userAccount.getFirstName(),
                userAccount.getLastName());
    }
}