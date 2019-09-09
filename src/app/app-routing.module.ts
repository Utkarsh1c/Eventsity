import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';


const routes: Routes = [
   { path:'', component: HomeComponent },
  //   { path:'discover', component: DiscoverComponent, children: [
  //       { path:'', component: RecipeStartComponent },
  //       { path:'new', component: RecipeEditComponent },
  //       { path:':id', component: RecipesDetailComponent },
  //       { path:':id/edit', component: RecipeEditComponent },
  //   ] },
  //   { path:'shopping-list', component: ShoppingListComponent },
  //   { path:'', component: RecipeStartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
