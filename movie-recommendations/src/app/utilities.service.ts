import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Genres } from './utilities';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  private apiKey = 'f68c64ab26f5bb2a81e09f4af4dff582';
  constructor(private http: HttpClient) { }

  getMovieGenres() {
    const subject = new Subject<Array<Genres>>();
    const api = this.http.get<any>(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}`);
    api.subscribe((item) => {
      subject.next(item.genres);
    });
    return subject.asObservable();
  }
}
