import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LifxService } from './shared/services/lifx.service';
import { HttpClientModule } from '@angular/common/http';
import {
  MatButtonModule,
  MatCardModule, MatChipsModule, MatDialogModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule,
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PowerBooleanPipe } from './shared/pipes/power-boolean.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LongPressDirective } from './shared/directives/long-press/long-press.directive';
import { LightBrightComponent } from './light-bright/light-bright.component';
import { OpenWeatherComponent } from './open-weather/open-weather.component';
import { OpenWeatherService} from './shared/services/open-weather.service';
import { RoundNumberPipe } from './shared/pipes/round-number.pipe';
import { GarbageDisposalComponent } from './garbage-disposal/garbage-disposal.component';
import { OpenhomeService } from './shared/services/openhome.service';
import { GarbageDisposalPipe } from './shared/pipes/garbage-disposal.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoadingComponent } from './shared/containers/loading/loading.component';
import { DvrService } from './shared/services/dvr.service';
import { DvrBoardComponent } from './dvr-board/dvr-board.component';
import { ThermostatValueComponent } from './thermostat/thermostat-value/thermostat-value.component';
import { ThermostatConfigComponent } from './thermostat/thermostat-config/thermostat-config.component';
import { KeysPipe } from './shared/pipes/keys.pipe';
import {ThermostatService} from './shared/services/thermostat.service';
import { PiSwitchComponent } from './pi-switch/pi-switch.component';
import {PiSwitchService} from './shared/services/pi-switch.service';

@NgModule({
  declarations: [
    AppComponent,
    LightBrightComponent,
    OpenWeatherComponent,
    GarbageDisposalComponent,
    LoadingComponent,

    // Pipes.
    PowerBooleanPipe,
    RoundNumberPipe,
    GarbageDisposalPipe,
    RoundNumberPipe,
    KeysPipe,

    // Directives.
    LongPressDirective,

    // Components
    DvrBoardComponent,
    ThermostatValueComponent,
    ThermostatConfigComponent,
    PiSwitchComponent,
  ],
  imports: [
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,

    // Material.
    MatCardModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatChipsModule,

    // Framework modules.
    CommonModule,
    ReactiveFormsModule,

  ],
  providers: [
    LifxService,
    OpenWeatherService,
    OpenhomeService,
    DvrService,
    ThermostatService,
    PiSwitchService,
  ],
  bootstrap: [ AppComponent ],
  entryComponents: [ LightBrightComponent ]
})
export class AppModule { }
