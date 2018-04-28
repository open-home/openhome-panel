import {Component, OnDestroy, OnInit} from '@angular/core';
import {DvrService} from '../shared/services/dvr.service';

@Component({
  selector: 'app-dvr-board',
  templateUrl: './dvr-board.component.html',
  styleUrls: ['./dvr-board.component.css']
})
export class DvrBoardComponent implements OnInit, OnDestroy {

  dvrsConnection: any;
  dvrsDataset: any;

  dvrImage: string = 'data:image/jpeg;base64,';

  constructor(private dvrs: DvrService) { }

  ngOnInit() {

    this.dvrsConnection = this.dvrs.getDvr().subscribe((data) => {
      this.dvrsDataset = data;
    });
  }

  ngOnDestroy() {
    this.dvrsConnection.unsubscribe();
  }
}
