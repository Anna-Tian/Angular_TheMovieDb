import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { forkJoin, Subject } from 'rxjs';
import { MovieList, ScienceFictionMovie } from './movie-list';


@Injectable({
  providedIn: 'root'
})
export class MovieListService {
  movieListUrls: Array<string> = [];
  constructor(private http: HttpClient) { }

  private getMovieListPage () {
    return this.http.get<MovieList>(`https://api.themoviedb.org/3/discover/movie?api_key=f68c64ab26f5bb2a81e09f4af4dff582&language=en-US&sort_by=popularity.desc&include_adult=false&page=1&with_genres=878`);
  }

  getMovieList (){
    let calls = [];
    let totalPage = 0;
    var subject = new Subject<Array<ScienceFictionMovie>>();
    this.getMovieListPage().subscribe ((movies) => {
      totalPage = movies.total_pages;
      for (let page = 1; page < totalPage + 1; page++) {
        calls.push(this.getData(`https://api.themoviedb.org/3/discover/movie?api_key=f68c64ab26f5bb2a81e09f4af4dff582&language=en-US&sort_by=popularity.desc&include_adult=false&page=${page}&with_genres=878`));
      }
      forkJoin(...calls).subscribe((movies) => {
        let movieList = Array<ScienceFictionMovie>();
        // Get movie result list
        movieList = movies.reduce((r, e) => r.concat(e.results), []);
        subject.next(movieList);
      });

    })
    return subject.asObservable();
  }

  getData(url){
    return this.http.get<MovieList>(url);
  }
}
