import {Component, Inject, OnInit} from '@angular/core';
import { LifxService } from '../shared/services/lifx.service';
import { MatSliderChange, MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import {ILifxLightColor} from '../shared/interfaces/payload/lifx-light-state.interface';

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

    const payload: ILifxLightColor = {

      label: this.state.data.label,
      kelvin: this.state.data.color.kelvin,
      brightness: e.value,
      saturation: this.state.data.color.saturation,
      hue: this.state.data.color.hue
    };

    this.ls.setLightColor(payload).subscribe((data: any) => {
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
}
