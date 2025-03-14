package jmb.projectY.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class UserAccount{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String username;
    private String firstName;
    private String lastName;
    @Column(unique = true)
    private String email;
    private String password;
}
