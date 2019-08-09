import * as chroma from 'chroma-js';
import * as moment from 'moment';
import {Component, OnDestroy, OnInit, AfterViewInit, ElementRef, ViewChild, ViewChildren, QueryList, ContentChildren} from '@angular/core';
import { LifxService } from './shared/services/lifx.service';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { ILifxLightPower } from './shared/interfaces/payload/lifx-light-power.interface';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { LightBrightComponent } from './light-bright/light-bright.component';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/timer';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { trigger, style, transition, animate } from '@angular/animations';
import {PiSwitchComponent} from './pi-switch/pi-switch.component';

@Component({
  selector: 'app-root',
  animations: [
    trigger('fadeInOut',
      [
        transition(
          ':enter', [
            style({ transform: 'translateY(-100%)', opacity: 0 }),
            animate('700ms', style({ transform: 'translateY(0)', opacity: 1 }))
          ]),
        transition(
          ':leave', [
            style({ opacity: 1 }),
            animate('50ms', style({ opacity: 0 }))
          ])
      ])
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {

  lights: boolean = true;
  dvr: boolean = false;
  thermostat: boolean = false;
  piSwitch: boolean = false;

  time = moment().format('HH:mm:ss');
  day = moment().format('dddd D MMMM YYYY');
  weekNumber = moment().week();

  showClockConnection: Subscription;

  dialogOpened: boolean = false;
  showClock: boolean = false;
  maxIdleTime: number = 5000;

  lsDataset: any = [];

  constructor(private ls: LifxService,
              public snackBar: MatSnackBar,
              public ds: MatDialog) {

  }

  ngOnInit() {
    this.getLightStatus();
  }

  ngAfterViewInit() {

    // Clock.
    setInterval(() => {
      this.time = moment().format('HH:mm:ss');
      this.day = moment().format('dddd D MMMM YYYY');
      this.weekNumber = moment().week();
    }, 1000);

    this.showClockConnection = Observable
      .fromEvent(document, 'click')
      .pipe(switchMap((e: MouseEvent) => Observable.timer(0, this.maxIdleTime)))
      .pipe(map((s: number) => s > 0))
      .pipe(distinctUntilChanged())
      .subscribe((isIdle: boolean) => {

        if (!this.dialogOpened) {
          isIdle ? this.showClock = true : this.showClock = false;
        }
      });
  }

  ngOnDestroy() {
    this.showClockConnection.unsubscribe();
  }

  getLightStatus() {

    this.ls.getLights().then((data: any[]) => {
      this.lsDataset = data;

      // Color.
      this.lsDataset.forEach((row) => {

        row.color['hex'] = chroma.hsl(row.color.hue, row.color.saturation, row.brightness).hex();

        if (row.color.saturation === 0) {
          row.color['hex'] = chroma.temperature(row.color.kelvin).hex();
        }
      });
    });
  }

  onPower(currentStatus: string, label: string, id: string) {

    const state: ILifxLightPower = {
      id: id,
      power: currentStatus === 'off' ? 'on' : 'off'
    };

    // Looks for the light.
    const index = this.lsDataset.findIndex((obj) => obj['label'] === label);

    if (index > -1) {
      this.lsDataset[index]['power'] = state.power;
    }

    this.ls.togglePower(state).then(() => {
      this.getLightStatus();
    }).catch((err: any) => {
      this.openSnackBar('Something went wrong...', '');
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  showBrightness(e: any) {

    // Looks for the light.
    const index = this.lsDataset.findIndex((obj) => obj['label'] === e.label);

    if (index > -1) {

      this.dialogOpened = true;

      const data: MatDialogConfig = {
        data: this.lsDataset[index],
        width: '500px'
      };
      let dialog = this.ds.open(LightBrightComponent, { data });

      dialog
        .afterClosed()
        .subscribe((dialogData) => {
          if (!dialogData) {
            this.dialogOpened = false;
            this.getLightStatus();
          }
        });
    }
  }

  selectLights() {

    this.lights = true;
    this.dvr = false;
    this.thermostat = false;
    this.piSwitch = false;

    this.getLightStatus();
  }

  selectDvr() {
    this.lights = false;
    this.dvr = true;
    this.thermostat = false;
    this.piSwitch = false;
  }

  selectThermostat() {
    this.lights = false;
    this.dvr = false;
    this.thermostat = true;
    this.piSwitch = false;
  }

  selectPiSwitch() {
    this.lights = false;
    this.dvr = false;
    this.thermostat = false;
    this.piSwitch = true;
  }
}
