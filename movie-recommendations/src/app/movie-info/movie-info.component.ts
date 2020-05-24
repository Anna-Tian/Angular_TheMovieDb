import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieInfoService } from './movie-info.service';
import { MovieInfo, MovieArray } from './movie-info';


@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit {
  movieId: number;
  movie: MovieInfo;
  movieString: MovieArray;

  constructor(
    private route: ActivatedRoute,
    private movieInfoService: MovieInfoService
  ) { }

  ngOnInit() {
    this.movieId = parseInt(this.route.snapshot.paramMap.get('movieId'));
    this.getMovieInfo(this.movieId);
  }
  getMovieInfo(id: number) {
    this.movieInfoService.getMovieInfo(id).subscribe(movieDetails => {
      this.movie = movieDetails;
      
      let movieArray = [];
      movieArray.push({
        id: movieDetails.id,
        genres: movieDetails.genres.map(x => x.name).join(', '),
        productionCountries: movieDetails.production_countries.map(x => x.name).join(', '),
        spokenLanguages: movieDetails.spoken_languages.map(x => x.name).join(', ')
      })
      this.movieString = movieArray[0];
    })
  }

}
