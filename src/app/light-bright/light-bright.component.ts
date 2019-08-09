import {Component, Inject, OnInit} from '@angular/core';
import { LifxService } from '../shared/services/lifx.service';
import { MatSliderChange, MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import {ILifxLightState} from '../shared/interfaces/payload/lifx-light-state.interface';

@Component({
  selector: 'app-light-bright',
  templateUrl: './light-bright.component.html',
  styleUrls: ['./light-bright.component.css']
})
export class LightBrightComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public state: any,
              private ls: LifxService,
              private snackBar: MatSnackBar) { }

  ngOnInit() { }

  onBrightness(e: MatSliderChange) {

    const payload: ILifxLightState = {
      power: this.state.data.power,
      brightness: e.value
    };

    this.ls.setLightColor(this.state.data.id, payload).catch((err: any) => {
      this.openSnackBar('Something went wrong...', '');
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
