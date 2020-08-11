import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Subject } from 'rxjs';
import { SimilarMovie, SimilarMovieResult } from './similar-movie';

@Injectable({
  providedIn: 'root'
})
export class SimilarMovieService {
  constructor(private http: HttpClient) { }

  private getSimilarMoviePage(movieId: number) {
    return this.http.get<SimilarMovie>(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=f68c64ab26f5bb2a81e09f4af4dff582&language=en-US&page=1`);
  }

  getSimilarMovie(movieId: number){
    const calls = [];
    let totalPage = 0;
    const subject = new Subject<Array<SimilarMovieResult>>();
    this.getSimilarMoviePage(movieId).subscribe ((movies) => {
      totalPage = movies.total_pages;
      for (let page = 1; page < totalPage + 1; page++) {
        calls.push(this.getData(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=f68c64ab26f5bb2a81e09f4af4dff582&language=en-US&page=${page}`));
      }
      // tslint:disable-next-line: deprecation
      forkJoin(...calls).subscribe((similarMovies) => {
        let movieList = Array<SimilarMovieResult>();
        // Get movie result list
        movieList = similarMovies.reduce((r, e) => r.concat(e.results), []);
        subject.next(movieList);
      });

    });
    return subject.asObservable();
  }

  private getData(url){
    return this.http.get<SimilarMovie>(url);
  }

}
