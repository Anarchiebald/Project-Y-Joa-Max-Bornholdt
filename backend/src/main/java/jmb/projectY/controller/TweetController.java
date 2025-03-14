package jmb.projectY.controller;

import jmb.projectY.dto.TweetRequest;
import jmb.projectY.dto.TweetResponse;
import jmb.projectY.dto.TweetUpdateRequest;
import jmb.projectY.service.TweetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tweet")
public class TweetController {

    public final TweetService tweetService;

    @GetMapping
    public List<TweetResponse> getAllTweets() {
        return tweetService.getAllTweets();
    }

    @PostMapping
    public ResponseEntity<TweetResponse> createTweet(@RequestBody TweetRequest tweetRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(tweetService.createTweet(tweetRequest));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateTweet(@PathVariable long id, @RequestBody TweetUpdateRequest request) {
        tweetService.updateTweet(id, request);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTweet(@PathVariable Long id) {
        tweetService.deleteTweet(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/upload-image")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(tweetService.saveImage(file));
    }

    @PostMapping("/upload-video")
    public ResponseEntity<String> uploadVideo(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(tweetService.saveVideo(file));
    }
}
