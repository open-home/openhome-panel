import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ThermostatService } from '../../shared/services/thermostat.service';

@Component({
  selector: 'app-thermostat-value',
  templateUrl: './thermostat-value.component.html',
  styleUrls: ['./thermostat-value.component.scss']
})
export class ThermostatValueComponent implements OnInit, OnDestroy {

  @Input()
  thermostatGuid;

  ohsConnection: any;

  temperature: any;

  constructor(private ts: ThermostatService) { }

  ngOnInit() {

    this.ohsConnection = this.ts.getThermostats().subscribe((data) => {
      this.temperature = data[this.thermostatGuid];
    });
  }

  ngOnDestroy() {
    this.ohsConnection.unsubscribe();
  }
}
