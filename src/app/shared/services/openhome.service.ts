import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IGarbageDisposalPayload } from '../interfaces/payload/garbage-disposal-payload.interface';

@Injectable()
export class OpenhomeService {

  constructor(private http: HttpClient) {

  }

  private url = environment.remoteEndpoints.homeCloudServices.service;

  getLocalGarbageDisposal(payload: IGarbageDisposalPayload) {

    const garbageDisposalUrl = this.url + environment.remoteEndpoints.homeCloudServices.garbageDisposal;
    return this.http.post(garbageDisposalUrl, payload);
  }

  getThermostats() {

    const thermostatUrl = this.url + environment.remoteEndpoints.homeCloudServices.thermostat;
    return this.http.post(thermostatUrl, null);
  }
}
