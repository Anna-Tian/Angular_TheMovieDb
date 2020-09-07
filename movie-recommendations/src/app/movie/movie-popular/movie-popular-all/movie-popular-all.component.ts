import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../movie.service';
import { Router } from '@angular/router';
import { MovieResult, MovieDiscover } from '../../movie';
import { DropdownOption, FilterOption as TagOption } from 'src/app/utilities';
import { UtilitiesService } from 'src/app/utilities.service';
// tslint:disable: max-line-length

export interface FilterOptions {
  genre?: TagOption[];
  language?: DropdownOption[];
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
    language: [
      {
        label: 'None Selected',
        value: '',
        isLeaf: true
      }
    ],
  };

  movieDiscover: MovieDiscover = {
    page: `&page=1`,
    sort_by: `&sort_by=popularity.desc`,
  };
  voteRateFormat = (percent: number) => percent / 10;

  ngOnInit() {
    this.getMovieList();
    this.getFilterTags();
  }
  getFilterTags() {
    this.getFilterGenreTag();
    this.getFilterLanguageOption();
    console.log('getFilterTags: filterOptions', this.filterOptions);
  }

  private getFilterGenreTag() {
    this.utilitiesService.getMovieGenres().subscribe((results) => {
      for (const result of results) {
        const tags: TagOption = {
          label: result.name,
          valueNumber: result.id,
          checked: false
        };
        this.filterOptions.genre.push(tags);
      }
    });
  }

  getFilterLanguageOption() {
    this.utilitiesService.getMovieLanguages().subscribe((results) => {
      for (const result of results) {
        const option: DropdownOption = {
          label: result.english_name,
          value: result.iso_639_1,
          isLeaf: true
        };
        this.filterOptions.language.push(option);
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
      const languages = this.movies.map(movie => movie.original_language);
      var languageCount = {};
      languages.forEach(x => {languageCount[x] = (languageCount[x] || 0) + 1; });
      console.log('getMovieList: languageCount', languageCount);
    });
    this.movieService.getMovieDiscoverString();
  }

  handleChangesSort(event) {
    this.movieDiscover.sort_by = `${event}`;
    this.getMovieList();
  }

  handleChangeGenre(itemChecked: boolean, tag: TagOption): void {
    this.filterOptions.genre = this.filterOptions.genre.map(option => (option.label === tag.label) ? Object.assign({}, option, {checked: itemChecked}) : option);
    this.movieDiscover.with_genres = `&with_genres=${this.filterOptions.genre.filter(option => option.checked).map(option => option.valueNumber)}`;
    this.getMovieList();
  }

  handleChangesLanguage(event: string[]) {
    this.movieDiscover.with_original_language = `&with_original_language=${event.toString()}`;
    this.getMovieList();
    console.log('handleChangesLanguage: event', event);
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
