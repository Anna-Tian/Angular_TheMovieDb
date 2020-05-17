import { Component, OnInit } from '@angular/core';
import { MovieListService } from './movie-list.service';
import { MovieList } from './movie-list';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  providers: [MovieListService],
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movieList: MovieList;

  constructor(private movieListService: MovieListService) { }

  ngOnInit() {
    this.getMovieList();
  }

  getMovieList(): void {
    this.movieListService.getMovieList()
      .subscribe(movieLists => this.movieList = movieLists)
  }

}
