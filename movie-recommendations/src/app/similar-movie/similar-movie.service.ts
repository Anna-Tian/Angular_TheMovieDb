import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Subject, Observable } from 'rxjs';
import { SimilarMovie, SimilarMovieResult } from './similar-movie';

@Injectable({
  providedIn: 'root'
})
export class SimilarMovieService {
  constructor(private http: HttpClient) { }

  private getSimilarMoviePage (movie_id: number) {
    return this.http.get<SimilarMovie>(`https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=f68c64ab26f5bb2a81e09f4af4dff582&language=en-US&page=1`);
  }

  getSimilarMovie (movie_id: number){
    let calls = [];
    let totalPage = 0;
    var subject = new Subject<Array<SimilarMovieResult>>();
    this.getSimilarMoviePage(movie_id).subscribe ((movies) => {
      totalPage = movies.total_pages;
      for (let page = 1; page < totalPage + 1; page++) {
        calls.push(this.getData(`https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=f68c64ab26f5bb2a81e09f4af4dff582&language=en-US&page=${page}`));
      }
      forkJoin(...calls).subscribe((movies) => {
        let movieList = Array<SimilarMovieResult>();
        // Get movie result list
        movieList = movies.reduce((r, e) => r.concat(e.results), []);
        subject.next(movieList);
      });

    })
    return subject.asObservable();
  }

  private getData(url){
    return this.http.get<SimilarMovie>(url);
  }

}
