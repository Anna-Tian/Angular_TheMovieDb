import { Component, OnInit } from '@angular/core';
import { MovieListService } from './movie-list.service';
import { ScienceFictionMovie } from './movie-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  providers: [MovieListService],
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: ScienceFictionMovie[];
  totalMovies: number;
  paginationConfig = {
    itemsPerPage: 16, 
    currentPage: 1, 
    totalItems: this.totalMovies}

  constructor(
    private movieListService: MovieListService,
    private router: Router
    ) { }

  ngOnInit() {
    this.getMovieList();
  }

  getMovieList(): void {
    this.movieListService.getMovieList().subscribe(allResult => {
      this.movies = allResult;
      this.totalMovies = this.movies.length;
    });
  }

  onPageChange(event){
    console.log(event);
    this.paginationConfig.currentPage = event;
  }

  NavigateToInfo(movie) {
    this.router.navigate(['/movie-info', movie.id])
  }

}
