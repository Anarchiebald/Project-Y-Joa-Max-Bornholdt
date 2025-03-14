import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {map, Observable, Subscription, take} from 'rxjs';
import {UserAccount} from '../model/userAccount.model';
import {TweetService} from '../service/tweet.service';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {Tweet} from '../model/tweet.model';

@Component({
  selector: 'app-content',
  standalone: true,
  templateUrl: './content.component.html',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    NgOptimizedImage,
  ],
  styleUrl: './content.component.scss'
})
export class ContentComponent implements OnInit, OnDestroy {

  user$: Observable<UserAccount | null>;
  userSubscription?: Subscription;
  content: string = '';
  imageUrl: string = '';
  videoUrl: string = '';
  tweets: Tweet[] = [];
  showOptions: number | null = null;

  editMode: boolean = false;
  editTweetId: number | null = null;
  editContent: string = '';
  editImageUrl: string | null = null;
  editVideoUrl: string | null = null;

  uploadError: string = '';
  tweetError: string = '';
  deleteError: string = '';
  editError: string = '';

  constructor(private authService: AuthService, private tweetService: TweetService, private router: Router, private cdr: ChangeDetectorRef) {
    this.user$ = this.authService.user$;
  }


  /**
   * init-Methode
   * (+Route Guard auf Wish bestellt)
   */
  ngOnInit(): void {
    this.userSubscription = this.user$.subscribe({
      next: user => {
        if (user) {
          this.loadTweets();
        } else {
          this.router.navigate(['/login']).then();
        }
      }
    })
    this.authService.loadUserFromStorage();
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe()
  }

  isCurrentUser(userId: number): boolean {
    let isCurrentUser = false;
    this.user$.subscribe(user => {
      if (user && user.id === userId) {
        isCurrentUser = true;
      }
    });
    return isCurrentUser;
  }

  /**
   * Startet Tweet-Erstellung, aus html aufgerufen
   */
  tweet(): void {
    this.user$.pipe(take(1)).subscribe(user => {
      if (user) {
        this.createTweet(user.id);
      }
    });
  }

  /**
   * Sendet die Anfrage zur Tweet-Erstellung an den Tweet-Service und resettet die Oberfläche der Tweeterstellung
   *
   * @param userId user
   */
  createTweet(userId: number) {
    if (this.content.trim() != '') {
      this.tweetService.tweet(userId, this.content.trim(), this.imageUrl, this.videoUrl)
        .subscribe({
          next: (tweet) => {
            this.content = '';
            this.videoUrl = '';
            this.imageUrl = '';
            this.loadTweets();
          },
          error: (error) => {
            this.tweetError = 'Error while tweeting. Please try again.';
          }
        });
    }
  }

  /**
   * Sendet eine Update Anfrage an den Tweet-Service
   */
  updateTweet() {
    if (this.editTweetId !== null) {
      this.tweetService.updateTweet(this.editTweetId, this.editContent.trim(), this.editImageUrl, this.editVideoUrl).subscribe({
        next: () => {
          this.loadTweets();
          this.cancelEditMode();
        },
        error: (error) => {
          this.editError = 'Error updating the tweet. Please try again.';
        }
      })
    }
  }

  /**
   * Sendet eine Lösch-Anfrage an den Tweet-Service
   *
   * @param tweetId Tweet-Id
   */
  deleteTweet(tweetId: number) {
    const isConfirmed = confirm('Do you really want to delete the tweet? This cannot be undone.');
    if (isConfirmed) {
      this.tweetService.deleteTweet(tweetId).subscribe({
        next: () => {
          this.loadTweets();
        },
        error: (error) => {
          this.tweetError = 'Error deleting the tweet. Please tra again.';
        }
      });
    }
  }

  /**
   *Startet den Bearbeitungsmodus für einen Tweet
   *
   * @param tweet Tweet-Id
   */
  enterEditMode(tweet: Tweet) {
    this.showOptions = this.showOptions === tweet.id ? null : tweet.id;
    this.editMode = true;
    this.editTweetId = tweet.id;
    this.editContent = tweet.content;
    this.editImageUrl = tweet.imageUrl || null;
    this.editVideoUrl = tweet.videoUrl || null;
    this.scrollToTop();
  }

  /**
   * beendet den Bearbeitungsmodus für einen Tweet
   */
  cancelEditMode() {
    this.editMode = false;
    this.editTweetId = null;
    this.editContent = '';
    this.editImageUrl = null;
    this.editVideoUrl = null;
  }

  openImageFileInput() {
    const fileInput = document.getElementById('image-input') as HTMLInputElement;
    fileInput.click();
  }

  openVideoFileInput() {
    const fileInput = document.getElementById('video-input') as HTMLInputElement;
    fileInput.click();
  }

  openEditImageFileInput() {
    const fileInput = document.getElementById('image-input-edit') as HTMLInputElement;
    fileInput.click();
  }

  openEditVideoFileInput() {
    const fileInput = document.getElementById('video-input-edit') as HTMLInputElement;
    fileInput.click();
  }

  onImageFileSelected(event: Event): void {
    this.handleFileUpload(event, 'image');
  }

  onVideoFileSelected(event: Event): void {
    this.handleFileUpload(event, 'video');
  }

  onEditImageFileSelected(event: Event): void {
    this.handleEditFileUpload(event, 'image');
  }

  onEditVideoFileSelected(event: Event): void {
    this.handleEditFileUpload(event, 'video');
  }

  deleteImage() {
    this.imageUrl = '';
  }

  deleteVideo() {
    this.videoUrl = '';
  }

  deleteEditImage() {
    this.editImageUrl = null;
  }

  deleteEditVideo() {
    this.editVideoUrl = null;
  }

  /**
   * Sendet eine Anfrage zum Datei-Upload an den Tweet-Service
   *
   * @param event Event
   * @param fileType Dateityp
   */
  private handleFileUpload(event: Event, fileType: 'image' | 'video'): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const uploadObservable = fileType === 'image'
        ? this.tweetService.uploadImage(file)
        : this.tweetService.uploadVideo(file);

      uploadObservable.subscribe({
        next: (url) => {
          if (fileType === 'image') {
            this.imageUrl = `http://localhost:8080${url}`;
          } else {
            this.videoUrl = `http://localhost:8080${url}`;
          }
        },
        error: (error) => {
          this.uploadError = `Error uploading the ${fileType}. Please try again.`;
        },
      });
    }
  }

  /**
   * Sendet im Bearbeitungsmodus eine Anfrage zum Datei-Upload an den Tweet-Service
   *
   * @param event Event
   * @param fileType Dateityp
   */
  private handleEditFileUpload(event: Event, fileType: 'image' | 'video'): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const uploadObservable = fileType === 'image'
        ? this.tweetService.uploadImage(file)
        : this.tweetService.uploadVideo(file);

      uploadObservable.subscribe({
        next: (url) => {
          if (fileType === 'image') {
            this.editImageUrl = `http://localhost:8080${url}`;
          } else {
            this.editVideoUrl = `http://localhost:8080${url}`;
          }
        }
      });
    }
  }

  /**
   * Sendet eine Anfrage zum Laden der Tweets an den Tweet-Service
   */
  loadTweets() {
    this.tweetService.getAllTweets().subscribe({
      next: (tweets) => {
        this.tweets = tweets;
      }
    });
  }

  /**
   * Berechnet die Zeit von einem Zeitpunkt bis jetzt
   *
   * @param createdAt Zeit
   * @returns Die Zeit seid der Tweeterstellung
   */
  calculateTimeAgo(createdAt: Date): string {
    const tweetDate = new Date(createdAt);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - tweetDate.getTime()) / 1000);

    if (seconds < 60) {
      return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
    }
    const minutes = Math.floor(seconds/60);
    if (minutes < 60){
      return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    }

    const hours = Math.floor(minutes/60);
    if (hours < 24){
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    }

    const days = Math.floor(hours/24);
    if (days == 1){
      return 'yesterday';
    }
    if (days < 3) {
      return `${days} day${days === 1 ? '' : 's'} ago`;
    }
    return tweetDate.toLocaleDateString();
  }

  /**
   * Nimmt eine Anfrage entgegen, wann ein Tweet erstellt wurde
   *
   * @param tweet Tweet
   * @returns String für die Oberfläche
   */
  getTimeAgo(tweet: Tweet): string {
    if (tweet.lastChangedAt != tweet.createdAt) {
      return `Edited ${this.calculateTimeAgo(tweet.lastChangedAt)}`;
    } else {
      return this.calculateTimeAgo(tweet.createdAt);
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getRemainingCharacters(): number {
    const maxLength = 255;
    return maxLength - this.content.length;
  }
  getRemainingCharactersEdit(): number {
    const maxLength = 255;
    return maxLength - this.editContent.length;
  }

  toggleOptions(tweetId: number) {
    this.showOptions = this.showOptions === tweetId ? null : tweetId;
  }
}
