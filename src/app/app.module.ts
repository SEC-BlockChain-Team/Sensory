import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { DataComponent } from './data/data.component';
import { EthereumComponent } from './ethereum/ethereum.component';
import { VechainComponent } from './vechain/vechain.component';
import { IotaComponent } from './iota/iota.component';
import { SensorsComponent } from './sensors/sensors.component';
import { FooterComponent } from './footer/footer.component';

// Material Imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from "@angular/material/tabs";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    DataComponent,
    EthereumComponent,
    VechainComponent,
    IotaComponent,
    SensorsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
