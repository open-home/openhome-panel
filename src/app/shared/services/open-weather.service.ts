import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class OpenWeatherService {

  constructor(private http: HttpClient) {

  }

  private url = environment.remoteEndpoints.openWeatherMap.service;

  getLocalWeather() {

    const apiUrl = environment.remoteEndpoints.openWeatherMap.dailyWeather
      .replace('@city', environment.remoteEndpoints.openWeatherMap.city)
      .replace('@appId', environment.remoteEndpoints.openWeatherMap.appId);

    const weatherUrl = this.url + apiUrl;

    return this.http.get(weatherUrl);
  }
}
