/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MovieInfoService } from './movie-info.service';

describe('Service: MovieInfo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieInfoService]
    });
  });

  it('should ...', inject([MovieInfoService], (service: MovieInfoService) => {
    expect(service).toBeTruthy();
  }));
});
