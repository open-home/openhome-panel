import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { OpenWeatherService } from '../shared/services/open-weather.service';

@Component({
  selector: 'app-open-weather',
  templateUrl: './open-weather.component.html',
  styleUrls: ['./open-weather.component.css']
})
export class OpenWeatherComponent implements OnInit, OnDestroy, AfterViewInit {

  owsConnection: any;
  interval: any;

  weatherData: any;

  constructor(private ows: OpenWeatherService) { }

  ngOnInit() {

  }

  ngAfterViewInit() {

    this.getWeather();

    this.interval = setInterval(() => {
      this.getWeather();
    }, 300000);
  }

  ngOnDestroy() {
    this.owsConnection.unsubscribe();
    clearInterval(this.interval);
  }

  getWeather() {

    this.owsConnection = this.ows.getLocalWeather().subscribe((data) => {
      this.weatherData = data;
    });
  }
}
