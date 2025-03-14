package jmb.projectY.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class TweetResponse {
    private long id;
    private UserResponse userResponse;
    private String content;
    private String imageUrl;
    private String videoUrl;
    private LocalDateTime createdAt;
    private LocalDateTime lastChangedAt;
    private int numOfLikes;
    private int numOfComments;
    private int numOfRetweets;
    private int numOfSaves;
    private int numOfImpressions;

    public TweetResponse(long id, UserResponse userResponse, String content, String imageUrl, String videoUrl, LocalDateTime createdAt, LocalDateTime lastChangedAt, int numOfLikes, int numOfComments, int numOfRetweets, int numOfSaves, int numOfImpressions) {
        this.id = id;
        this.userResponse = userResponse;
        this.content = content;
        this.imageUrl = imageUrl;
        this.videoUrl = videoUrl;
        this.createdAt = createdAt;
        this.lastChangedAt = lastChangedAt;
        this.numOfLikes = numOfLikes;
        this.numOfComments = numOfComments;
        this.numOfRetweets = numOfRetweets;
        this.numOfSaves = numOfSaves;
        this.numOfImpressions = numOfImpressions;
    }
}
