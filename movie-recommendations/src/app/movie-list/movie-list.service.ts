import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { forkJoin } from 'rxjs';
import { MovieList } from './movie-list';


@Injectable({
  providedIn: 'root'
})
export class MovieListService {
  movieListUrls: Array<string> = [];
  constructor(private http: HttpClient) { }

  getMovieList (){
    let calls = [];
    for (let page = 1; page < 11; page++) {
      calls.push(this.getData(`https://api.themoviedb.org/3/discover/movie?api_key=f68c64ab26f5bb2a81e09f4af4dff582&language=en-US&sort_by=popularity.desc&include_adult=false&page=${page}&with_genres=878`));
    }

    return forkJoin(...calls);
  }
  getData(url){
    return this.http.get<MovieList>(url);
  }
}
