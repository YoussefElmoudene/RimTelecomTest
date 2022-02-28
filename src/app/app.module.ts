import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import {ArchiveComponent} from "./view/archive/archive.component";
import {NglCoreModule} from "angular-leaflet";
import {HttpClientModule} from "@angular/common/http";
import {LeafletModule, LeafletUtil} from "@asymmetrik/ngx-leaflet";

@NgModule({
  declarations: [
    AppComponent,
    ArchiveComponent
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    FormsModule,
    NglCoreModule,
    AppRoutingModule,
    LeafletModule,
    HttpClientModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
