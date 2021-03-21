import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';
import { UserSession } from '../models/usersession';

@Injectable()

export class UserSessionService {

  session = new UserSession();
  localStorageSessionKey: string;

  constructor() {
    this.localStorageSessionKey = 'DOF-' + environment.apiBaseUrl + '-AuthData';
  }

  create(session: any) {// jshint ignore:line
    this.setLocalStorageProperties(session);
  }

  destroy() {// jshint ignore:line
    this.setLocalStorageProperties(new UserSession());
  }

  load() { // jshint ignore:line
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData;
  }

  authToken() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).authToken;
  }

  userId(): number {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? 0 : +JSON.parse(jsonData).userId;
  }

  getUserName() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).userFullName;
  }

  roleId(): number {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? 0 : +JSON.parse(jsonData).roleId;
  }

  getdepartmentId(): number {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? 0 : +JSON.parse(jsonData).departmentId;
  }

  roleName() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).roleName;
  }

  setLocalStorageProperties(session: any) {// jshint ignore:line
    localStorage.setItem(this.localStorageSessionKey, JSON.stringify(session));
  }

  getLocalStorageWithKey(key: any) {// jshint ignore:line
    return localStorage.getItem(key);
  }

  setLocalStorageWithKey(key: any, session: any) {// jshint ignore:line
    localStorage.setItem(key, JSON.stringify(session));
  }
}

