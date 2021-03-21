import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { UserSessionService } from './usersession.service';
import { DataService } from './data.service';
import { UserSession } from '../models/usersession';


import * as jwtDecode from 'jwt-decode';
import * as momenttz from 'moment-timezone';
import * as _ from 'lodash';

import 'rxjs/add/operator/map';
declare var require: any;
const timezone = require('../assets/timezones.json');

@Injectable()
export class AuthenticationService {

  private baseUrl = environment.apiBaseUrl;
  timeZones: any[];
  sessionData = new UserSession();

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private sessionService: UserSessionService) {
    this.getTimeZones();
  }

  login(username: string, password: string) {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      });

    const timeZone = this.getBrowserTimeZone();
    const data = 'username=' + username + '&password=' + password + '&timezone=' + timeZone;
    return this.http.post<any>(this.baseUrl + '/api/token', data, { headers: headers })
      .map(user => {

        if (user && user.access_token) {
          this.clearCachedMenu();
          const decodedToken = jwtDecode(user.access_token);
          this.sessionData.email = decodedToken['user.email'];
          this.sessionData.mobileNumber = decodedToken['user.mobilenumber'];
          this.sessionData.authToken = user.access_token;
          this.sessionData.userId = decodedToken['user.id'];
          this.sessionData.roleId = decodedToken['user.roleid'];
          this.sessionData.roleName = decodedToken['user.rolename'];
          this.sessionData.userFullName = decodedToken['user.fullname'];
          this.sessionData.isDynamicPassword = decodedToken['referrence1'] === 'True';
          this.sessionData.departmentId = decodedToken['referrence2'];
          this.sessionData.departmentName = decodedToken['referrence3'];
          this.sessionService.create(this.sessionData);
        }
        return user;
      });
  }

  isAuthenticated() {
    return !!this.sessionService.userId() && !!this.sessionService.authToken();
  }

  hasRequiredPermission(permission) {
    for (let i = 0; i < permission.length; i++) {
      if (permission[i] === this.sessionService.roleId()) {
        return true;
      }
    }
    return false;
  }

  getTimeZones() {
    this.timeZones = timezone.timeZone;
  }

  getBrowserTimeZone(): string {
    const zoneName = momenttz.tz.guess();
    const temptimezone = momenttz.tz(zoneName).zoneAbbr();
    const filterZone = this.timeZones.find(i => i.abbr === temptimezone);
    if (filterZone) {
      return filterZone.value;
    }
    return '';
  }

  clearCachedMenu() {
    this.dataService.clearCache();
  }

  clearSession() {
    this.sessionService.destroy();
    this.clearCachedMenu();
  }

  logOut() {
    this.clearCachedMenu();
    this.sessionService.destroy();
  }
}
