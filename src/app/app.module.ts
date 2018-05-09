import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BookComponent } from './book.component';
import { BookDetailsComponent } from './bookDetails.component';
import { BookService } from './app.component.service';
import { RoutingModule } from './app.router';


@NgModule({
  declarations: [
    AppComponent,
    BookDetailsComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RoutingModule
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
