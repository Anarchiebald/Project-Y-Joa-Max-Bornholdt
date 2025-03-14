package jmb.projectY.service;

import jmb.projectY.dto.TweetRequest;
import jmb.projectY.dto.TweetResponse;
import jmb.projectY.dto.TweetUpdateRequest;
import jmb.projectY.dto.UserResponse;
import jmb.projectY.exception.TweetNotFoundException;
import jmb.projectY.exception.UserNotFoundException;
import jmb.projectY.model.Tweet;
import jmb.projectY.model.UserAccount;
import jmb.projectY.repository.TweetRepository;
import jmb.projectY.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;


@Service
public class TweetService {
    private final TweetRepository tweetRepository;
    private final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd-HH_mm_ss");
    private final UserRepository userRepository;
    private final TweetLoadingService tweetLoadingService;

    @Autowired
    public TweetService(TweetRepository tweetRepository, UserRepository userRepository, TweetLoadingService tweetLoadingService) {
        this.tweetRepository = tweetRepository;
        this.userRepository = userRepository;
        this.tweetLoadingService = tweetLoadingService;
    }

    /**
     * Erstellt aus der eingegebenen Tweet-Anfrage einen Tweet
     *
     * @param tweetRequest Tweet-Anfrage
     * @return Tweet-Rückgabe
     */
    public TweetResponse createTweet(TweetRequest tweetRequest) {
        UserAccount user = userRepository.findById(tweetRequest.getUser_id())
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        Tweet tweet = new Tweet(
                user.getId(),
                tweetRequest.getContent(),
                tweetRequest.getImageUrl(),
                tweetRequest.getVideoUrl()
        );
        return toTweetResponse(tweetRepository.save(tweet));
    }

    /**
     * Updated den eingegebenen Tweet
     *
     * @param id Tweet-Id
     * @param request Geänderte Tweet-Anfrage
     */
    public void updateTweet(Long id, TweetUpdateRequest request) {
        Tweet tweet = tweetRepository.findById(id)
                .orElseThrow(() -> new TweetNotFoundException("Tweet not found"));
        tweet.setContent(request.getContent());
        tweet.setImageUrl(request.getImageUrl());
        tweet.setVideoUrl(request.getVideoUrl());
        tweetRepository.save(tweet);
    }

    /**
     * Löscht den eingegebenen Tweet
     *
     * @param id Tweet-Id
     */
    public void deleteTweet(Long id) {
        if (tweetRepository.existsById(id)) {
            tweetRepository.deleteById(id);
        } else {
            throw new RuntimeException(STR."Tweet not found with id: \{id}");
        }
    }

    /**
     * Gibt alle Tweets zurück, nachdem diese durch einen Algorithmus sortiert wurden
     *
     * @return Liste mit Tweets
     */
    public List<TweetResponse> getAllTweets() {
        LocalDateTime lastMinutes = LocalDateTime.now(ZoneId.of("Europe/Berlin")).minusMinutes(30);
        List<Tweet> allTweets = tweetRepository.findAll();

        List<Tweet> recentTweets = tweetLoadingService.filterRecentTweets(allTweets, lastMinutes);
        List<Tweet> olderTweets = tweetLoadingService.filterOlderTweets(allTweets, lastMinutes);
        List<Tweet> combinedTweets = tweetLoadingService.combineTweets(recentTweets, olderTweets);

        return combinedTweets.stream()
                .map(this::toTweetResponse)
                .collect(Collectors.toList());
    }

    public String saveImage(MultipartFile file) {
        return saveFile(file, "jpg");
    }

    public String saveVideo(MultipartFile file) {
        return saveFile(file, "mp4");
    }

    /**
     * Speichert die eingegebene Datei im uploads-Ordner und gibt den Dateipfad zurück
     *
     * @param file Datei
     * @param extension Dateiendung
     * @return Dateipfad
     */
    public String saveFile(MultipartFile file, String extension) {
        String fileName = STR."\{LocalDateTime.now(ZoneId.of("Europe/Berlin")).format(dateTimeFormatter)}-\{UUID.randomUUID()}.\{extension}";
        String uploadDir = "uploads/";
        try {
            Path filePath = Paths.get(uploadDir + fileName);
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(STR."Error while saving the file: \{e.getMessage()}", e);
        }
        return STR."/uploads/\{fileName}";
    }

    /**
     * Konvertiert einen Tweet in eine TweetResponse
     *
     * @param tweet Tweet
     * @return TweetResponse
     */
    private TweetResponse toTweetResponse(Tweet tweet) {
        UserAccount user = userRepository.findById(tweet.getUser_id())
                .orElseThrow(() -> new RuntimeException("User not found"));
        UserResponse userResponse = new UserResponse(user.getId(), user.getUsername(), user.getFirstName(), user.getLastName());

        return new TweetResponse(
                tweet.getId(),
                userResponse,
                tweet.getContent(),
                tweet.getImageUrl(),
                tweet.getVideoUrl(),
                tweet.getCreatedAt(),
                tweet.getLastChangedAt(),
                tweet.getNumOfLikes(),
                tweet.getNumOfComments(),
                tweet.getNumOfRetweets(),
                tweet.getNumOfSaves(),
                tweet.getNumOfImpressions()
        );
    }
}