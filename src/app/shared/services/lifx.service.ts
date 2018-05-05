import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ILifxLightColor } from '../interfaces/payload/lifx-light-state.interface';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { ILifxLightPayload } from '../interfaces/payload/lifx-light-payload.interface';
import { ILifxLightPower } from '../interfaces/payload/lifx-light-power.interface';
import { Utils } from '../utils/utils';
import { Actions } from '../actions/actions';

@Injectable()
export class LifxService {

  constructor(private http: HttpClient) {

  }

  private url = environment.localEndpoints.lightList;
  private socket;

  getLights() {

    return new Observable(observer => {

      this.socket = io(this.url);
      this.socket.on('message', (data: ILifxLightPayload[]) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }

  setLightPower(payload: ILifxLightPower) {

    return this.http.post(
      environment.localEndpoints.service + environment.localEndpoints.apis.httpListener,
      Utils.prepareOpenhomePayload(Actions.LOCAL.LIGHT_POWER, payload)
    );
  }

  setLightColor(payload: ILifxLightColor) {

    return this.http.post(
      environment.localEndpoints.service + environment.localEndpoints.apis.httpListener,
      Utils.prepareOpenhomePayload(Actions.LOCAL.LIGHT_COLOR, payload)
    );
  }
}
