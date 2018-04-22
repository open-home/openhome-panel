import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IGarbageDisposalPayload } from '../interfaces/garbage-disposal-payload.interface';

@Injectable()
export class HomeCloudServicesService {

  constructor(private http: HttpClient) {

  }

  private url = environment.remoteEndpoints.homeCloudServices.service;

  getLocalGarbageDisposal(payload: IGarbageDisposalPayload) {

    const garbageDisposalUrl = this.url + environment.remoteEndpoints.homeCloudServices.garbageDisposal;
    return this.http.post(garbageDisposalUrl, payload);
  }
}
