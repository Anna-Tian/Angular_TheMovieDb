import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieComponent } from './movie/movie.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieInfoComponent } from './movie-info/movie-info.component';
import { MoviePopularAllComponent } from './movie/movie-popular/movie-popular-all/movie-popular-all.component';


const routes: Routes = [
  {path: '', component: MovieComponent},
  {path: 'movie-popular-all', component: MoviePopularAllComponent},
  {path: 'movie-list', component: MovieListComponent},
  {path: 'movie-info/:movieId', component: MovieInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [MovieListComponent, MovieInfoComponent];
