import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class SMSService {

  controllerRoute = '/api/sms';

  constructor(
    private dataService: DataService) {
  }

  sendTrialSMS(request: any) {
    return this.dataService.post(this.controllerRoute + '/sendtrial', request).map(response => {
      this.dataService.clearRouteCache(this.controllerRoute);
      return response;
    });
  }

}
