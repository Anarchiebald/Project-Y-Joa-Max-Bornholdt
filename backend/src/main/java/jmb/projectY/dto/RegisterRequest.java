package jmb.projectY.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
}
