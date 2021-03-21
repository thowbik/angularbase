import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable()
export class UserService {
    getUserRoute = '/api/user';

    constructor(private dataService: DataService) {
    }

    changepasswordUser(user: any) {
        return this.dataService.post('/api/user/changePassword', user).map(response => {
            this.dataService.clearRouteCache(this.getUserRoute);
            return response;
        });
    }
    forgotpasswordUser(user: any) {
        return this.dataService.post('/api/user/forgetpassword', user).map(response => {
            this.dataService.clearRouteCache(this.getUserRoute);
            return response;
        });
    }
    getUser(id: number) {
        return this.dataService.getRecord(('/api/user/' + id));
    }
}


