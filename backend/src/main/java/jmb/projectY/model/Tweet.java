package jmb.projectY.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.concurrent.ThreadLocalRandom;


@Entity
@Data
public class Tweet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private long user_id; //Fremdschlüssel
    @Column(nullable = false)
    private String content;
    private String imageUrl;
    private String videoUrl;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    private LocalDateTime lastChangedAt;
    private int numOfLikes;
    private int numOfComments;
    private int numOfRetweets;
    private int numOfSaves;
    private int numOfImpressions;

    public Tweet() {}

    public Tweet(long user_id, String content, String imageUrl, String videoUrl) {
        this.user_id = user_id;
        this.content = content;
        this.imageUrl = imageUrl;
        this.videoUrl = videoUrl;

        //Zufällige Werte generieren
        numOfImpressions = ThreadLocalRandom.current().nextInt(25, 100000);
        numOfLikes = ThreadLocalRandom.current().nextInt(10, numOfImpressions/4);
        numOfComments = ThreadLocalRandom.current().nextInt(9, numOfLikes/3);
        numOfRetweets = ThreadLocalRandom.current().nextInt(8, numOfComments/2);

    }

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now(ZoneId.of("Europe/Berlin"));
        lastChangedAt = LocalDateTime.now(ZoneId.of("Europe/Berlin"));
    }

    @PreUpdate
    public void onUpdate() {
        lastChangedAt = LocalDateTime.now(ZoneId.of("Europe/Berlin"));
    }


}
