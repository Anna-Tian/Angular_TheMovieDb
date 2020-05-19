import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export interface RatingModel {
  id: string,
  no: number,
  movieId: number,
  rateNo: number,
  emotionName: string,
  message: string
}

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  movieId: number;
  nextId: string;
  maxId: number;
  currentRate = 0;
  emotionName: string;
  message: string;
  ratings: RatingModel[];
  isRating: boolean;
  constructor(
    private route: ActivatedRoute,
  ) { 
    this.movieId = parseInt(this.route.snapshot.paramMap.get('movieId'));

    let ratings = this.getRating(this.movieId);
    console.log('ratings', ratings);
    if (ratings.length != 0) {
      this.isRating = true;
      this.maxId = ratings[ratings.length-1].no;
      this.nextId = `${this.movieId}_${this.maxId}`
    } else {
      this.isRating = false;
      this.maxId = 0;
      this.nextId = `${this.movieId}_${this.maxId}`;
    }
  }

  ngOnInit() {
    
    this.ratings = this.getRating(this.movieId);

  }

  addRating() {
    let ratings = this.getAllRating();
    this.maxId++;
    this.nextId = `${this.movieId}_${this.maxId}`
    ratings.push({
      id: this.nextId,
      no: this.maxId,
      movieId: this.movieId,
      rateNo: this.currentRate,
      emotionName: this.emotionName,
      message: this.message
    });
    this.setLocalStorageRatings(ratings);
    this.ratings = this.getRating(this.movieId);

    console.log('ratings', ratings);
    console.log('this.ratings', this.ratings);
    this.isRating = true;
    console.log('addingRating - isRating', this.isRating);
  }

  removeRating(id: string): void {
    let ratings = this.getAllRating();
    ratings = ratings.filter((rating) => rating.id != id);
    this.setLocalStorageRatings(ratings);
    this.ratings = this.getRating(this.movieId);
    if(this.ratings.length ==0){
      this.isRating = false;
    }
    this.maxId--;
    console.log('removeRating function', ratings);
    console.log('removeRating - isRating', this.isRating);
  }

  getRating(movieId: number): RatingModel[] {
    let localStorageItem = JSON.parse(localStorage.getItem('ratings'));
    console.log('localStorageItem1111111', localStorageItem);

    localStorageItem = localStorageItem.ratings.filter((rating) => rating.movieId == movieId);
    console.log('localStorageItem2222222', localStorageItem);
    return localStorageItem == null ? [] : localStorageItem;
  }
  getAllRating(): RatingModel[] {
    let localStorageItem = JSON.parse(localStorage.getItem('ratings'));
    console.log('getAllRating', localStorageItem);
    return localStorageItem == null ? [] : localStorageItem.ratings;
  }

  private setLocalStorageRatings(ratings: RatingModel[]): void {
    localStorage.setItem('ratings', JSON.stringify({ratings: ratings}));
  }
}
