import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable()
export class DepartmentService {
    getDepartmentRoute = '/api/departments';

    constructor(private dataService: DataService) {
    };

    getDepartments(departmentStatusType: number, refresh: Boolean) {
        return this.dataService.getData('/api/departments/' + departmentStatusType, refresh);
    }

    getDepartmentsLookUp(departmentStatusType: number, refresh: Boolean) {
        return this.dataService.getData('/api/departmentslookup/' + departmentStatusType, refresh);
    }

    getDepartment(id: number) {
        return this.dataService.getRecord(('/api/department/' + id));
    }

    registerDepartment(department: any) {
        return this.dataService.post('/api/department/register', department).map(response => {
            this.dataService.clearRouteCache(this.getDepartmentRoute);
            return response;
        });
    }

    saveDepartment(department: any) {
        return this.dataService.post('/api/department', department).map(response => {
            this.dataService.clearRouteCache(this.getDepartmentRoute);
            return response;
        });
    }
}
