import * as moment from 'moment';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { OpenhomeService } from '../shared/services/openhome.service';
import { IGarbageDisposalPayload } from '../shared/interfaces/payload/garbage-disposal-payload.interface';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-garbage-disposal',
  templateUrl: './garbage-disposal.component.html',
  styleUrls: ['./garbage-disposal.component.css']
})
export class GarbageDisposalComponent implements OnInit, AfterViewInit, OnDestroy {

  hcssConnectionTomorrow: any;
  hcssConnectionToday: any;

  garbagePayloadTomorrow: any;
  garbagePayloadToday: any;

  constructor(private hcss: OpenhomeService) { }

  ngOnInit() {

  }

  ngAfterViewInit() {

    const today = moment();
    const tomorrow = moment().add(1, 'day');

    const payloadToday: IGarbageDisposalPayload = {
      year: parseInt(today.format('YYYY')),
      month: parseInt(today.format('M')),
      day: parseInt(today.format('D')),
      city: environment.remoteEndpoints.homeCloudServices.city
    };

    const payloadTomorrow: IGarbageDisposalPayload = {
      year: parseInt(tomorrow.format('YYYY')),
      month: parseInt(tomorrow.format('M')),
      day: parseInt(tomorrow.format('D')),
      city: environment.remoteEndpoints.homeCloudServices.city
    };

    this.hcssConnectionToday = this.hcss.getLocalGarbageDisposal(payloadToday).subscribe((data) => {
      this.garbagePayloadToday = data;
    });

    this.hcssConnectionTomorrow = this.hcss.getLocalGarbageDisposal(payloadTomorrow).subscribe((data) => {
      this.garbagePayloadTomorrow = data;
    });
  }

  ngOnDestroy() {
    this.hcssConnectionTomorrow.unsubscribe();
    this.hcssConnectionToday.unsubscribe();
  }
}
