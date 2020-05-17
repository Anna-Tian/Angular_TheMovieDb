import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';


import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MovieList } from './movie-list';


@Injectable({
  providedIn: 'root'
})
export class MovieListService {
  movieListUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=f68c64ab26f5bb2a81e09f4af4dff582&language=en-US&sort_by=popularity.desc&include_adult=false&with_genres=878';

  constructor(private http: HttpClient) { }

  getMovieList (): Observable<MovieList> {
    return this.http.get<MovieList>(this.movieListUrl)
      .pipe(
        catchError(this.handleError) // handle the error
      );
  }






  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  makeIntentionalError() {
    return this.http.get('not/a/real/url')
      .pipe(
        catchError(this.handleError)
      );
  }

}
