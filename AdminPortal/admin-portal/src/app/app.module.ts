import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonnelListComponent } from './personnel-list/personnel-list.component';
import { PersonnelDetailComponent } from './personnel-detail/personnel-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonnelListComponent,
    PersonnelDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
