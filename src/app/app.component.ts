import * as chroma from 'chroma-js';
import * as moment from 'moment';
import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { LifxService } from './shared/services/lifx.service';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { ILifxLightPower } from './shared/interfaces/lifx-light-power.interface';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { LightBrightComponent } from './light-bright/light-bright.component';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/timer';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { trigger, style, transition, animate } from '@angular/animations';

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

  time = moment().format('HH:mm:ss');
  day = moment().format('dddd D MMMM YYYY');

  lsConnection: any;
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
    this.lsConnection.unsubscribe();
    this.showClockConnection.unsubscribe();
  }

  getLightStatus() {

    this.lsConnection = this.ls.getLights().subscribe((data: any[]) => {
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

  onPower(currentStatus: string, label: string) {

    const state: ILifxLightPower = {
      label: label,
      power: currentStatus === 'off' ? 'on' : 'off'
    };

    // Looks for the light.
    const index = this.lsDataset.findIndex((obj) => obj['label'] === label);

    if (index > -1) {
      this.lsDataset[index]['power'] = state.power;
    }

    this.ls.setLightPower(state).subscribe((data: any) => {
      this.checkResult(data);
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  checkResult(data: any) {
    if (data.status !== 'ok') {
      this.openSnackBar('Something went wrong...', data.status);
    }
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
          }
        });
    }
  }
}
