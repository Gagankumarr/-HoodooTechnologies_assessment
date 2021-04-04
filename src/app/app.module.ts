import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { DineoutComponent } from './components/dineout/dineout.component';
import { NightlifeComponent } from './components/nightlife/nightlife.component';
import { GeoServiceService } from './services/geo-service.service';
import { ApiService } from './services/api.service';
import { HttpClientModule} from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    DeliveryComponent,
    DineoutComponent,
    NightlifeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [GeoServiceService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
