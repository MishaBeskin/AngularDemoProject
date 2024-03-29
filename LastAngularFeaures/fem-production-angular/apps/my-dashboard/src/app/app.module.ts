import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  CoreDataModule
} from '@fem-production-angular/core-data';
import {
  CoreStateModule
} from '@fem-production-angular/core-state';
import {
  MaterialModule
} from '@fem-production-angular/material';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RoutingModule } from './routing.module';
import { WidgetsDetailsComponent } from './widgets/widgets-details/widgets-details.component';
import { WidgetsListComponent } from './widgets/widgets-list/widgets-list.component';
import { WidgetsComponent } from './widgets/widgets.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WidgetsComponent,
    WidgetsDetailsComponent,
    WidgetsListComponent],
  imports: [
    BrowserModule,
    CoreDataModule,
    CoreStateModule,
    HttpClientModule,
    MaterialModule,
    RoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
