import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ThermostatService {

  constructor(private http: HttpClient) {

  }

  private url = environment.localEndpoints.thermostatList;
  private socket;

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
}
