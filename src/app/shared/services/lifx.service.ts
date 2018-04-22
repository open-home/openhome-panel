import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ILifxLightColor } from '../interfaces/lifx-light-state.interface';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { ILightPayload } from '../interfaces/light-payload.interface';
import { ILifxLightPower } from '../interfaces/lifx-light-power.interface';

@Injectable()
export class LifxService {

  constructor(private http: HttpClient) {

  }

  private url = environment.localEndpoints.lightList;
  private socket;

  getLights() {

    return new Observable(observer => {

      this.socket = io(this.url);
      this.socket.on('message', (data: ILightPayload[]) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }

  setLightPower(payload: ILifxLightPower) {

    return this.http.post(
      environment.localEndpoints.service + environment.localEndpoints.apis.setLightPower,
      payload
    );
  }

  setLightColor(payload: ILifxLightColor) {

    return this.http.post(
      environment.localEndpoints.service + environment.localEndpoints.apis.setLightColor,
      payload
    );
  }
}
