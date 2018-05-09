import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BookDetailsComponent } from './bookDetails.component';
import { BookComponent } from './book.component';


const routes: Routes = [
    {
      path: '',
      redirectTo: 'BookComponent',
      pathMatch: 'full'
    },
    {
        path: '',
        component: BookComponent
    },
    {
        path: ':id/issue-history',
        component: BookDetailsComponent
    }    
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class RoutingModule {}
  