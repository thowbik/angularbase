import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from 'environments/environment';

@Injectable()
export class DataService {

  private baseUrl = environment.apiBaseUrl;
  private geoserverUrl = environment.geoserverBaseUrl;
  private cache: any = {};

  constructor(private http: HttpClient) {
  }

  getData(route, refresh) {
    if (this.dataForRouteIsCached(route, refresh)) {
      return Observable.of(this.cache[route]);
    } else { // no cached data or refresh requested
      return this.http.get<any>(this.baseUrl + route).map(response => {
        this.cache[route] = response;
        return response;
      });
    }
  }

  getWeatherData(route, refresh) {
    if (this.dataForRouteIsCached(route, refresh)) {
      return Observable.of(this.cache[route]);
    } else { // no cached data or refresh requested
      return this.http.get<any>(route).map(response => {
        this.cache[route] = response;
        return response;
      });
    }
  }

  getDataWithParams(route, params, refresh) {
    if (this.dataForRouteIsCached(route, refresh)) {
      return Observable.of(this.cache[route]);
    } else { // no cached data or refresh requested
      return this.http.get<any>(this.baseUrl + route, { params: params }).map(response => {
        this.cache[route] = response;
        return response;
      });
    }
  }

  getRecord(route) {
    return this.http.get<any>(this.baseUrl + route);
  }

  getRecordWithParams(route, params) {
    return this.http.get<any>(this.baseUrl + route, { params: params });
  }

  post(route, data) {
    return this.http.post<any>(this.baseUrl + route, data);
  }

  delete(route) {
    return this.http.delete(this.baseUrl + route).map(response => {
      return response;
    });
  }

  getReport(route) {
    return this.http.get(this.baseUrl + route, { responseType: 'blob' });
  }

  getGeoServerData(route, params, refresh) {
    if (this.dataForRouteIsCached(route, refresh)) {
      return Observable.of(this.cache[route]);
    } else { // no cached data or refresh requested
      return this.http.get<any>(this.geoserverUrl + route, { params: params }).map(response => {
        this.cache[route] = response;
        return response;
      });
    }
  }

  getExternalData(route) {
    return this.http.get<any>(route).map(response => {
      return response;
    });
  }

  dataForRouteIsCached(route, refresh) {
    return this.cache[route] && (refresh === false || refresh === undefined);
  }

  clearCache() {
    this.cache = {};
  }

  clearRouteCache(route) {
    this.cache[route] = null;
  }

  getHttpParams(data: any) {
    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
      httpParams = httpParams.append(key,
        data[key]
      );
    });
    return data;
  }
}
