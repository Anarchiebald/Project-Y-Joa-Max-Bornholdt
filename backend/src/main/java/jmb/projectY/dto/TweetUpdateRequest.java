package jmb.projectY.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TweetUpdateRequest {
    private String content;
    private String imageUrl;
    private String videoUrl;
}
