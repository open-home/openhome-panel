import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ILifxLightState } from '../interfaces/payload/lifx-light-state.interface';
import { ILifxLightPayload } from '../interfaces/payload/lifx-light-payload.interface';
import { ILifxLightPower } from '../interfaces/payload/lifx-light-power.interface';

@Injectable()
export class LifxService {

  constructor(private http: HttpClient) { }

  private url = environment.remoteEndpoints.lifx.service;

  getLights() {

    const dataset = [];

    return this.http.get(
      this.url + environment.remoteEndpoints.lifx.lights.base + environment.remoteEndpoints.lifx.lights.all,
      { headers: { 'Authorization': `Bearer ${environment.remoteEndpoints.lifx.token}` } }).toPromise().then((data: any) => {

        data.forEach((row) => {

          const light: ILifxLightPayload = {
            label: row.label,
            power: row.power,
            port: 0,
            address: '',
            color: row.color,
            id: row.id,
            brightness: row.brightness
          };

          dataset.push(light);
        });

        return dataset;
    });
  }

  togglePower(light: ILifxLightPower) {

    return this.http.post(
      this.url + environment.remoteEndpoints.lifx.lights.base + light.id + environment.remoteEndpoints.lifx.lights.toggle, {},
      { headers: { 'Authorization': `Bearer ${environment.remoteEndpoints.lifx.token}` } }).toPromise();
  }


  setLightColor(id: string, light: ILifxLightState) {

    return this.http.put(
      this.url + environment.remoteEndpoints.lifx.lights.base + id + environment.remoteEndpoints.lifx.lights.state, light,
      { headers: { 'Authorization': `Bearer ${environment.remoteEndpoints.lifx.token}` } }).toPromise();
  }
}
