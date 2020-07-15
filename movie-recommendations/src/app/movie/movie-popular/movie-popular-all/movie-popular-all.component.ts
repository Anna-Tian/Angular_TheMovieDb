import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../movie.service';
import { Router } from '@angular/router';
import { MovieResult, MovieDiscover } from '../../movie';
import { DropdownOption } from 'src/app/utilities';

@Component({
  selector: 'app-movie-popular-all',
  templateUrl: './movie-popular-all.component.html',
  styleUrls: ['./movie-popular-all.component.less']
})
export class MoviePopularAllComponent implements OnInit {
  movies: MovieResult[];
  paginationConfig = {
    pageSize: 5, 
    pageIndex: 1, 
    totalItems: 0
  }
  voteRateFormat = (percent: number) => percent/10;

  //sort
  sortOption: DropdownOption[] = [
    {
      value: '&sort_by=popularity.desc',
      label: 'Popularity Descending',
      isLeaf: true
    },
    {
      value: '&sort_by=popularity.asc',
      label: 'Popularity Ascending',
      isLeaf: true
    },
    {
      value: '&sort_by=vote_average.desc',
      label: 'Rating Descending',
      isLeaf: true
    },
    {
      value: '&sort_by=vote_average.asc',
      label: 'Rating Ascending',
      isLeaf: true
    },
    {
      value: '&sort_by=release_date.desc',
      label: 'Release Date Descending',
      isLeaf: true
    },
    {
      value: '&sort_by=release_date.asc',
      label: 'Release Date Ascending',
      isLeaf: true
    },
    {
      value: '&sort_by=original_title.desc',
      label: 'Title (A-Z)',
      isLeaf: true
    },
    {
      value: '&sort_by=original_title.asc',
      label: 'Title (Z-A)',
      isLeaf: true
    }
  ];
  movieDiscover: MovieDiscover = {
    page: `&page=1`,
    sort_by: `&sort_by=popularity.desc`
  };
  
  constructor(
    private movieService: MovieService,
    private router: Router
    ) { }

  ngOnInit() {
    this.getMovieList();
  }

  getMovieList(): void {
    console.log('*** movieDiscover: ', this.movieDiscover);
    this.movieService.getPopularMoviePage(this.movieDiscover).subscribe((resultsPage) => {
      this.paginationConfig.totalItems = resultsPage.total_results;
    });
    this.movieService.getPopularMovieList(this.movieDiscover).subscribe((results) => {
      this.movies = results;
    });
    this.movieService.getMovieDiscoverString();
  }


  onChangesSort(event) {
    console.log('*** event: ', event);
    this.movieDiscover.sort_by = `&sort_by=${event}`;
    this.getMovieList();
  }

  // Pagination
  onPageIndexChange(event) {
    console.log('*** event: ', event);
    this.movieDiscover.page = `&page=${event}`;
    this.getMovieList();
  }

  NavigateToInfo(movie) {
    this.router.navigate(['/movie-info', movie.id])
  }

}
