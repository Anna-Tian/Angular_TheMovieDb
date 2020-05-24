/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SimilarMovieService } from './similar-movie.service';

describe('Service: SimilarMovie', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SimilarMovieService]
    });
  });

  it('should ...', inject([SimilarMovieService], (service: SimilarMovieService) => {
    expect(service).toBeTruthy();
  }));
});
