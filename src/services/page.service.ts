import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable()
export class PageService {

    constructor(private dataService: DataService) {
    };

    getGroupListByDeptId(deptId, refresh: boolean) {
        return this.dataService.getData('/api/groups/' + deptId, refresh);
    }
    getGroupListReportByDeptId(deptId, refresh: boolean) {
        return this.dataService.getData('/api/assessment/' + deptId, refresh);
    }

    getPages(refresh: boolean) {
        return this.dataService.getData('/api/page', refresh);
    }

    saveAssessment(data) {
        return this.dataService.post('/api/assessment', data);
    }

    getDepartment(refresh: boolean) {
        return this.dataService.getData('/api/departmentslookup', refresh);
    }

    getAssessment(refresh: boolean) {
        return this.dataService.getData('/api/departmentslastupdate', refresh);
    }
}
