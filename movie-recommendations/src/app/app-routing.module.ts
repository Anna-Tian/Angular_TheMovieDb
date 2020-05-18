import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieInfoComponent } from './movie-info/movie-info.component';


const routes: Routes = [
  {path: '', component: MovieListComponent},
  {path: 'movie-list', component: MovieListComponent},
  {path: 'movie-info/:movieId', component: MovieInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [MovieListComponent, MovieInfoComponent];
