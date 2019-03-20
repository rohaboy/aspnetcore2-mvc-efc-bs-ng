import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';
import { ProductList } from './shop/productList.component';
import { DataService } from './shared/dataService';

@NgModule({
  declarations: [
      AppComponent,
      ProductList
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
    providers: [
        { provide: APP_BASE_HREF, useValue: '/App/Shop' },
        DataService
        ],
  bootstrap: [AppComponent]
})
export class AppModule { }
