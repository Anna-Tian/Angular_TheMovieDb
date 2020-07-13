import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SimilarMovieService } from './similar-movie.service';
import { SimilarMovieResult } from './similar-movie';

@Component({
  selector: 'app-similar-movie',
  templateUrl: './similar-movie.component.html',
  styleUrls: ['./similar-movie.component.css']
})
export class SimilarMovieComponent implements OnInit {
  movieId: number;
  similarMovies: SimilarMovieResult[];
  movieFormatted = [];

  constructor(
    private route: ActivatedRoute,
    private similarMovieService: SimilarMovieService
  ) { }

  ngOnInit() {
    this.movieId = parseInt(this.route.snapshot.paramMap.get('movieId'));
    this.getSimilarMovie(this.movieId);
  }
  getSimilarMovie(id: number) {
    this.similarMovieService.getSimilarMovie(id).subscribe((movies) => {
      this.similarMovies = movies;

      this.movieFormatted = [];
      var j = -1;

      for (var i = 0; i < this.similarMovies.length; i++) {
          if (i % 5 == 0) {
              j++;
              this.movieFormatted[j] = [];
              this.movieFormatted[j].push(this.similarMovies[i]);
          }
          else {
              this.movieFormatted[j].push(this.similarMovies[i]);
          }
      }
    })
  }

}
