import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu/menu.component';
import { DetailsComponentComponent } from './details/details-component/details-component.component';

const routes: Routes = [
  {path: 'menu', component: MenuComponent},
  {path: 'details', component: DetailsComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
