import { Component, OnInit } from '@angular/core';
import { MovieListService } from './movie-list.service';
import { MovieList, ScienceFictionMovie } from './movie-list';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  providers: [MovieListService],
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: ScienceFictionMovie[];

  constructor(private movieListService: MovieListService) { }

  ngOnInit() {
    this.getMovieList();
  }

  getMovieList(): void {
    this.movieListService.getMovieList().subscribe(allResult => {
      this.movies = allResult.reduce((r, e) => r.concat(e.results), []);
      console.log('movies', this.movies);
    });
  }

}
