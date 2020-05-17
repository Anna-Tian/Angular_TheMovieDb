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
  totalMovies: number;
  paginationConfig = {
    itemsPerPage: 16, 
    currentPage: 1, 
    totalItems: this.totalMovies}

  constructor(private movieListService: MovieListService) { }

  ngOnInit() {
    this.getMovieList();
  }

  getMovieList(): void {
    this.movieListService.getMovieList().subscribe(allResult => {
      this.movies = allResult.reduce((r, e) => r.concat(e.results), []);
      this.totalMovies = this.movies.length;
      console.log('movies', this.movies);
    });
  }

  onPageChange(event){
    console.log(event);
    this.paginationConfig.currentPage = event;
  }

}
