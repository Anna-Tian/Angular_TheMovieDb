import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviePopularAllComponent } from './movie-popular-all.component';

describe('MoviePopularAllComponent', () => {
  let component: MoviePopularAllComponent;
  let fixture: ComponentFixture<MoviePopularAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviePopularAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviePopularAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
