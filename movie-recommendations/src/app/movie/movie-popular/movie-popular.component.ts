import { Component, OnInit } from '@angular/core';
import { MovieResult, MovieDiscover } from '../movie';
import { MovieListService } from 'src/app/movie-list/movie-list.service';
import { Router } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-popular',
  templateUrl: './movie-popular.component.html',
  styleUrls: ['./movie-popular.component.less']
})

export class MoviePopularComponent implements OnInit {

  constructor(
    private movieService: MovieService,
    private router: Router
    ) { }
  movies: MovieResult[];
  paginationConfig = {
    pageSize: 5,
    pageIndex: 1,
    totalItems: 0
  };
  movieDiscover: MovieDiscover = {
    page: `&page=${this.paginationConfig.pageIndex}`
  };
  voteRateFormat = (percent: number) => percent / 10;

  ngOnInit() {
    this.getMovieList();
  }

  getMovieList(): void {
    this.movieService.getPopularMoviePage(this.movieDiscover).subscribe((resultsPage) => {
      this.paginationConfig.totalItems = resultsPage.total_results;
    });
    this.movieService.getPopularMovieList(this.movieDiscover).subscribe((results) => {
      this.movies = results;
    });

  }
  // onPageIndexChange(event) {
  //   console.log('*** event: ', event);
  //   this.paginationConfig.pageIndex = event;
  //   this.getMovieList();
  // }

  NavigateToInfo(movie) {
    this.router.navigate(['/movie-info', movie.id]);
  }
}
