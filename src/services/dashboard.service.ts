import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { environment } from '../environments/environment';

@Injectable()
export class DashboardService {

    geoserverStoreName = environment.geoserverStoreName;

    constructor(private dataService: DataService) {
    };

    getDashboardData(departmentId: number) {
        return this.dataService.getRecord(('/api/dashboard/' + departmentId));
    }

    getGeoServerData(data: any) {
        // tslint:disable-next-line: max-line-length
        // let url = '/geoserver/' + this.geoserverStoreName + '/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=' + this.geoserverStoreName + ':DOF&outputFormat=application%2Fjson&srsName=EPSG:4326';
        // tslint:disable-next-line: max-line-length
        const url = '/geoserver/' + this.geoserverStoreName + '/ows?service=WFS&version=1.0.0&request=GetFeature';
        // if (cqlfilter) {
        //     url += '&cql_filter=' + cqlfilter;
        // }
        return this.dataService.getGeoServerData(url, data, true);
    }

}
