/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MovieListService } from './movie-list.service';

describe('Service: MovieList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieListService]
    });
  });

  it('should ...', inject([MovieListService], (service: MovieListService) => {
    expect(service).toBeTruthy();
  }));
});
