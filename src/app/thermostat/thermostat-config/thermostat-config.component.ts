import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThermostatService } from '../../shared/services/thermostat.service';

@Component({
  selector: 'app-thermostat-config',
  templateUrl: './thermostat-config.component.html',
  styleUrls: ['./thermostat-config.component.scss']
})
export class ThermostatConfigComponent implements OnInit, OnDestroy {

  ohsConnection: any;

  thermostats: any;


  constructor(private ts: ThermostatService) { }

  ngOnInit() {

    this.ohsConnection = this.ts.getThermostats().subscribe((data) => {
      this.thermostats = data;
    });
  }

  setThreshold(key: string, temperature: number) {
    this.thermostats[key].save = true;
    this.thermostats[key].threshold += temperature;
  }

  saveThreshold() {

  }

  ngOnDestroy() {
    console.log('ciao');
    this.ohsConnection.unsubscribe();
  }
}
