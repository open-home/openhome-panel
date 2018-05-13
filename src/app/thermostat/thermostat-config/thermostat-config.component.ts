import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThermostatService } from '../../shared/services/thermostat.service';
import {IThermostatZoneThresholdPayload} from '../../shared/interfaces/payload/thermostat-zone-threshold-payload.interface';

@Component({
  selector: 'app-thermostat-config',
  templateUrl: './thermostat-config.component.html',
  styleUrls: ['./thermostat-config.component.scss']
})
export class ThermostatConfigComponent implements OnInit, OnDestroy {

  ohsConnection: any;

  thermostats: any;
  savingLabel = 'Save';

  constructor(private ts: ThermostatService) { }

  ngOnInit() {

    this.ohsConnection = this.ts.getThermostats().subscribe((data) => {
      this.thermostats = data;
    });
  }

  setThreshold(key: string, temperature: number) {
    this.thermostats[key].save = true;
    this.thermostats[key].meta.threshold += temperature;
  }

  saveThreshold(key: string) {

    this.savingLabel = 'Saving...';
    const payload: IThermostatZoneThresholdPayload = {
      guid: key,
      threshold: this.thermostats[key].meta.threshold
    };

    this.ts.setThermostat(payload).subscribe((data) => {
      this.savingLabel = 'Save';
    });
  }

  ngOnDestroy() {
    this.ohsConnection.unsubscribe();
  }
}
