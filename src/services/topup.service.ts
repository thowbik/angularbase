import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable()
export class TopUpService {

    constructor(private dataService: DataService) {
    }

    getTopUpRequests(refresh: Boolean) {
        return this.dataService.getData('/api/topuprequests', refresh);
    }

    getTopUpRequestsById(id: number) {
        return this.dataService.getRecord(('/api/topuprequests/' + id));
    }

    addTopUp(topUp: any) {
        return this.dataService.post('/api/topup', topUp).map(response => {
            return response;
        });
    }
}
