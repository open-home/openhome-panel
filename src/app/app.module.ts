import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LifxService } from './shared/services/lifx.service';
import { HttpClientModule } from '@angular/common/http';
import {
  MatCardModule, MatDialogModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule,
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PowerBooleanPipe } from './shared/pipes/power-boolean.pipe';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LongPressDirective } from './shared/directives/long-press/long-press.directive';
import { LightBrightComponent } from './light-bright/light-bright.component';
import { OpenWeatherComponent } from './open-weather/open-weather.component';
import { OpenWeatherService} from './shared/services/open-weather.service';
import { RoundNumberPipe } from './shared/pipes/round-number.pipe';
import { GarbageDisposalComponent } from './garbage-disposal/garbage-disposal.component';
import { HomeCloudServicesService } from './shared/services/home-cloud-services.service';
import { GarbageDisposalPipe } from './shared/pipes/garbage-disposal.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LightBrightComponent,
    OpenWeatherComponent,
    GarbageDisposalComponent,

    // Pipes.
    PowerBooleanPipe,
    RoundNumberPipe,
    GarbageDisposalPipe,
    RoundNumberPipe,

    // Directives.
    LongPressDirective,
  ],
  imports: [
    environment.production ? ServiceWorkerModule.register('ngsw-worker.js') : [],
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // NoopAnimationsModule,

    // Material.
    MatCardModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatDialogModule,

    // Framework modules.
    CommonModule,
    ReactiveFormsModule,

  ],
  providers: [
    LifxService,
    OpenWeatherService,
    HomeCloudServicesService
  ],
  bootstrap: [ AppComponent ],
  entryComponents: [ LightBrightComponent ]
})
export class AppModule { }
