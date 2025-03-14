package jmb.projectY.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TweetRequest {
    private long user_id;
    private String content;
    private String imageUrl;
    private String videoUrl;
}
