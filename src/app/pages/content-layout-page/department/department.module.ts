import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule, MatSelectModule } from '@angular/material';
import { NgxSelectModule } from 'ngx-select-ex';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentComponent } from './department.component';
import { DepartmentRoutingModule } from './department-routing.module';

@NgModule({
    imports: [
        CommonModule,
        DepartmentRoutingModule,
        MatSidenavModule,
        NgxSelectModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule
    ],
    exports: [],
    declarations: [
        DepartmentComponent,
    ],
    providers: [],
})
export class DepartmentModule { }
