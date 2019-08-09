import { Component, OnInit } from '@angular/core';
import {PiSwitchService} from '../shared/services/pi-switch.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-pi-switch',
  templateUrl: './pi-switch.component.html',
  styleUrls: ['./pi-switch.component.css']
})
export class PiSwitchComponent implements OnInit {

  constructor(private pss: PiSwitchService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  piSwitch(device: string) {

    this.pss.piSwitch(device).toPromise().catch((error) => {
      this.openSnackBar('Something went wrong...', '');
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
