import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Actions } from '../actions/actions';
import { Utils } from '../utils/utils';
import { IThermostatZoneThresholdPayload } from '../interfaces/payload/thermostat-zone-threshold-payload.interface';
import {IDeviceIsAlivePayload} from '../interfaces/payload/device-is-alive-payload.interface';

@Injectable()
export class ThermostatService {

  private url = environment.localEndpoints.thermostatList;
  private socket;

  constructor(private http: HttpClient) {

  }

  getThermostats() {

    return new Observable(observer => {

      this.socket = io(this.url);
      this.socket.on('message', (data: any) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }

  setThermostat(payload: IThermostatZoneThresholdPayload) {

    return this.http.post(
      environment.localEndpoints.service + environment.localEndpoints.apis.httpListener,
      Utils.prepareOpenhomePayload(Actions.LOCAL.THERMOSTAT_ZONE_THRESHOLD, payload)
    );
  }

  isDeviceAlive(payload: IDeviceIsAlivePayload) {

    return this.http.post(
      environment.localEndpoints.service + environment.localEndpoints.apis.httpListener,
      Utils.prepareOpenhomePayload(Actions.LOCAL.DEVICE_IS_ALIVE, payload)
    );
  }
}
