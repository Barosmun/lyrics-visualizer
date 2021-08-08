import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LyricsUploadComponent } from './lyrics-upload/lyrics-upload.component';
import { LyricsSearchComponent } from './lyrics-search/lyrics-search.component';
import { SpotifyService } from './spotify-service.service';
import { HttpClientModule } from '@angular/common/http';
import { TextylService } from './textyl-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LyricsUploadComponent,
    LyricsSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [
    SpotifyService,
    TextylService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
