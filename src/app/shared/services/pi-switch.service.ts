import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class PiSwitchService {

  constructor(private http: HttpClient) {

  }

  piSwitch(device: string) {
    return this.http.post(environment.remoteEndpoints.piSwitch[device], {});
  }
}
