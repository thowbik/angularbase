import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable()
export class ShortCodeService {

    getShortCodeRoute = '/api/shortcode';

    constructor(private dataService: DataService) {
    }

    getTopUpRequests(refresh: Boolean) {
        return this.dataService.getData('/api/topuprequests', refresh);
    }

    getTopUpRequestsById(id: number) {
        return this.dataService.getRecord(('/api/topuprequests/' + id));
    }

    addShortCode(refresh: any) {
        return this.dataService.post('/api/sms/shortcodeAPI', refresh).map(response => {
            return response;
        });
    }

    getShortCodes(refresh: any) {
        return this.dataService.getData('/api/shortcode', refresh);
    }

    getSingleShortCode(id: number) {
        return this.dataService.getRecord(('/api/shortcodeById/' + id));
    }


    activateShortCode (shortcode: any) {
        return this.dataService.post('/api/shortcode/activate', shortcode).map(response => {
            this.dataService.clearRouteCache(this.getShortCodeRoute);
            return response;
        });
    }
}
