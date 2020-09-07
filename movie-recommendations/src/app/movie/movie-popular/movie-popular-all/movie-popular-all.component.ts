import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../movie.service';
import { Router } from '@angular/router';
import { MovieResult, MovieDiscover } from '../../movie';
import { DropdownOption, FilterOption as TagOption } from 'src/app/utilities';
import { UtilitiesService } from 'src/app/utilities.service';
// tslint:disable: max-line-length

export interface FilterOptions {
  genre?: TagOption[];
}

@Component({
  selector: 'app-movie-popular-all',
  templateUrl: './movie-popular-all.component.html',
  styleUrls: ['./movie-popular-all.component.less']
})
export class MoviePopularAllComponent implements OnInit {

  constructor(
    private movieService: MovieService,
    private utilitiesService: UtilitiesService,
    private router: Router
    ) { }
  movies: MovieResult[];
  paginationConfig = {
    pageSize: 5,
    pageIndex: 1,
    totalItems: 0
  };

  // Sort
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

  // Filter
  filterOptions: FilterOptions = {
    genre: [],
  };

  movieDiscover: MovieDiscover = {
    page: `&page=1`,
    sort_by: `&sort_by=popularity.desc`,
  };
  voteRateFormat = (percent: number) => percent / 10;

  ngOnInit() {
    this.getMovieList();
    this.getFilterGenreTag();
  }

  private getFilterGenreTag() {
    this.utilitiesService.getMovieGenres().subscribe((results) => {
      for (const result of results) {
        const tags: TagOption = {
          value: result.name,
          id: result.id,
          checked: false
        };
        this.filterOptions.genre.push(tags);
      }
    });
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

  handleChangeGenre(itemChecked: boolean, tag: TagOption): void {
    this.filterOptions.genre = this.filterOptions.genre.map(option => (option.value === tag.value) ? Object.assign({}, option, {checked: itemChecked}) : option);
    this.movieDiscover.with_genres = `&with_genres=${this.filterOptions.genre.filter(option => option.checked).map(option => option.id)}`;
    this.getMovieList();
  }

  onChangesSort(event) {
    this.movieDiscover.sort_by = `${event}`;
    this.getMovieList();
  }

  // Pagination
  onPageIndexChange(event) {
    this.movieDiscover.page = `&page=${event}`;
    this.getMovieList();
  }

  NavigateToInfo(movie) {
    this.router.navigate(['/movie-info', movie.id]);
  }

}
