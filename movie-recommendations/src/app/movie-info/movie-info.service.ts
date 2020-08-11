import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MovieInfo } from './movie-info';

@Injectable({
  providedIn: 'root'
})
export class MovieInfoService {
  apiKey = 'f68c64ab26f5bb2a81e09f4af4dff582';
  constructor(private http: HttpClient) { }

  getMovieInfo(movieId: number){
    return this.http.get<MovieInfo>(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.apiKey}&language=en-US`);
  }
}
