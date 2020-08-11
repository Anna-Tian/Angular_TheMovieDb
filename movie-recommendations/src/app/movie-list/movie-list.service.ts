import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { forkJoin, Subject } from 'rxjs';
import { MovieListPage, MovieResult } from '../movie/movie';


@Injectable({
  providedIn: 'root'
})
export class MovieListService {
  constructor(private http: HttpClient) { }

  private getMovieListPage() {
    return this.http.get<MovieListPage>(`https://api.themoviedb.org/3/discover/movie?api_key=f68c64ab26f5bb2a81e09f4af4dff582&language=en-US&sort_by=popularity.desc&include_adult=false&page=1&with_genres=878`);
  }

  getMovieList(){
    const calls = [];
    let totalPage = 0;
    const subject = new Subject<Array<MovieResult>>();
    this.getMovieListPage().subscribe ((movies) => {
      totalPage = movies.total_pages;
      for (let page = 1; page < totalPage + 1; page++) {
        calls.push(this.getData(`https://api.themoviedb.org/3/discover/movie?api_key=f68c64ab26f5bb2a81e09f4af4dff582&language=en-US&sort_by=popularity.desc&include_adult=false&page=${page}&with_genres=878`));
      }
      // tslint:disable-next-line: deprecation
      forkJoin(...calls).subscribe((similarMovies) => {
        let movieList = Array<MovieResult>();
        // Get movie result list
        movieList = similarMovies.reduce((r, e) => r.concat(e.results), []);
        subject.next(movieList);
      });

    });
    return subject.asObservable();
  }

  getData(url){
    return this.http.get<MovieListPage>(url);
  }
}
