import { Injectable } from '@angular/core';
import { DataService } from './data.service';


@Injectable()
export class UtilityService {

    utilityRoute = '/api/utility/';

    constructor(
        private dataService: DataService) { }

    getPaymentModeType(refresh: Boolean) {
        return this.dataService.getData(this.utilityRoute + 'paymentModetype', refresh);
    }
}
