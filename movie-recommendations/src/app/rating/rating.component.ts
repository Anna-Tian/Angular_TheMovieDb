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
  isRating: boolean;
  
  emotionName: string;
  message: string;
  ratings: RatingModel[];
  
  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.movieId = parseInt(this.route.snapshot.paramMap.get('movieId'));
    this.ratings = this.getCurrentMovieRating(this.movieId);
    
    // initial different properties
    if (this.ratings.length != 0) {
      this.isRating = true;
      this.maxId = this.ratings[this.ratings.length-1].no + 1;
    } else {
      this.isRating = false;
      this.maxId = 0;
    }
  }

  addRating() {
    // push new rating to the whole rating list
    let allRatings = this.getAllRatings();
    this.nextId = `${this.movieId}_${this.maxId}`
    allRatings.push({
      id: this.nextId,
      no: this.maxId,
      movieId: this.movieId,
      rateNo: this.currentRate,
      emotionName: this.emotionName,
      message: this.message
    });
    this.setLocalStorageRatings(allRatings);
    
    this.ratings = this.getCurrentMovieRating(this.movieId);
    this.maxId = this.ratings[this.ratings.length-1].no + 1;
    this.isRating = true;
  }

  removeRating(id: string): void {
    // remove rating from the whole rating list
    let currentRating = this.getAllRatings();
    currentRating = currentRating.filter((rating) => rating.id != id);
    this.setLocalStorageRatings(currentRating);
    
    // get rating from current movie
    this.ratings = this.getCurrentMovieRating(this.movieId);
    if(this.ratings.length ==0){
      this.isRating = false;
      this.maxId = 0;
    }
  }

  getCurrentMovieRating(movieId: number): RatingModel[] {
    let localStorageItem = this.getAllRatings();
    localStorageItem.filter((rating) => rating.movieId == movieId);
    return localStorageItem == null ? [] : localStorageItem;
  }

  getAllRatings(): RatingModel[] {
    let localStorageItem = JSON.parse(localStorage.getItem('ratings'));
    return localStorageItem == null ? [] : localStorageItem.ratings;
  }

  private setLocalStorageRatings(ratings: RatingModel[]): void {
    localStorage.setItem('ratings', JSON.stringify({ratings: ratings}));
  }
}
