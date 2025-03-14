package jmb.projectY.service;

import jmb.projectY.model.Tweet;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class TweetLoadingService {

    /**
     * Filtert und sortiert die Tweets im angegebenen Zeitraum
     */
    public List<Tweet> filterRecentTweets(List<Tweet> tweets, LocalDateTime threshold) {
        return tweets.stream()
                .filter(tweet -> tweet.getCreatedAt().isAfter(threshold))
                .sorted(Comparator.comparing(Tweet::getCreatedAt).reversed())
                .collect(Collectors.toList());
    }

    /**
     * Sortiert die Tweets, die älter sind als der angegebene Zeitraum
     */
    public List<Tweet> filterOlderTweets(List<Tweet> tweets, LocalDateTime threshold) {
        return tweets.stream()
                .filter(tweet -> tweet.getCreatedAt().isBefore(threshold) || tweet.getCreatedAt().isEqual(threshold))
                .sorted(Comparator.comparingInt(this::calculateRankingScore).reversed())
                .collect(Collectors.toList());
    }

    /**
     * Kombiniert die neueren und älteren Tweets
     */
    public List<Tweet> combineTweets(List<Tweet> recentTweets, List<Tweet> olderTweets) {
        List<Tweet> combinedTweets = new ArrayList<>();
        combinedTweets.addAll(recentTweets);
        combinedTweets.addAll(olderTweets);
        return combinedTweets;
    }

    /**
     * Berechnet einen Wert für die Tweets, nach dieser Reihenfolge werden sie sortiert
     */
    private int calculateRankingScore(Tweet tweet) {
        return tweet.getNumOfImpressions() +
                (tweet.getNumOfLikes() * 4) +
                (tweet.getNumOfComments() * 12) +
                (tweet.getNumOfRetweets() * 24);
    }
}