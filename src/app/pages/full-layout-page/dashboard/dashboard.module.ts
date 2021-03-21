import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatSidenavModule } from '@angular/material';
import { NgxSelectModule } from 'ngx-select-ex';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        MatSidenavModule,
        NgxSelectModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [],
    declarations: [
        DashboardComponent,
    ],
    providers: [],
})
export class DashboardModule { }
