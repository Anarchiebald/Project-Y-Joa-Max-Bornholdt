import {Injectable} from '@angular/core';
import {catchError, map, Observable, tap} from 'rxjs';
import {UserAccount} from '../model/userAccount.model';
import {AuthService} from './auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Tweet} from '../model/tweet.model';

@Injectable({
  providedIn: 'root'
})

export class TweetService {
  user$: Observable<UserAccount | null>;

  constructor(private authService: AuthService, private http: HttpClient) {
    this.user$ = this.authService.user$;
  }

  /**
   * Sendet eine Tweeterstellungs-Anfrage an das Backend
   *
   * @param user_id User-Id
   * @param content Tweetinhalt
   * @param imageUrl Bild-Url
   * @param videoUrl Video-url
   * @returns Tweet
   */
  tweet(user_id: number, content: string, imageUrl: string, videoUrl: string) : Observable<Tweet>{
    const headers = new HttpHeaders({ 'Content-Type' : 'application/json' })
    return this.http.post<Tweet>('http://localhost:8080/api/tweet', {user_id, content, imageUrl, videoUrl}, { headers, withCredentials: true })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  /**
   * Sendet eine Tweetupdate-Anfrage an das Backend
   *
   * @param tweetId Tweet-Id
   * @param content Inhalt
   * @param imageUrl Bild-Url
   * @param videoUrl video-Url
   * @returns Tweet
   */
  updateTweet(tweetId: number, content: string, imageUrl: string | null, videoUrl: string | null): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type' : 'application/json' });
    const body = { content, imageUrl, videoUrl };
    return this.http.put<void>(`http://localhost:8080/api/tweet/${tweetId}`, body, { headers, withCredentials: true })
  }

  /**
   * Sendet eine Anfrage an das Backend, alle Tweets nach einem Algorithmus sortiert zu bekommen.
   *
   * @returns Sortierte Tweet-Liste
   */
  getAllTweets(): Observable<Tweet[]> {
    return this.http.get<any[]>('http://localhost:8080/api/tweet', { withCredentials: true }).pipe(
      map(tweets => tweets.map(tweet => new Tweet(tweet)))
    );
  }

  /**
   * Sendet eine Anfrage an das Backend, einen Tweet zu löschen
   *
   * @param tweetId Tweet-Id
   * @returns void
   */
  deleteTweet(tweetId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/tweet/${tweetId}`, { withCredentials: true }).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  /**
   * Sendet eine Anfrage an das Backend, ein Bild hochzuladen
   *
   * @param file Bild
   * @returns Bild-Url
   */
  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`http://localhost:8080/api/tweet/upload-image`, formData, { responseType: 'text', withCredentials: true }
    ).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  /**
   * Sendet eine Anfrage an das Backend, ein Video hochzuladen
   *
   * @param file Video
   * @returns Video-Url
   */
  uploadVideo(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`http://localhost:8080/api/tweet/upload-video`, formData, { responseType: 'text', withCredentials: true }
    ).pipe(
      catchError(error => {
        throw error;
      })
    );
  }
}
