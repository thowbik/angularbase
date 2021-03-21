import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material';
import { NgxSelectModule } from 'ngx-select-ex';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicformComponent } from './dynamicform.component';
import { DynamicformRoutingModule } from './dynamic-routing.module';
import { DynamicFormBuilderModule } from 'app/shared/dynamic-form-builder/dynamic-form-builder.module';

@NgModule({
    imports: [
        CommonModule,
        DynamicformRoutingModule,
        MatSidenavModule,
        NgxSelectModule,
        FormsModule,
        ReactiveFormsModule,
        DynamicFormBuilderModule
    ],
    exports: [],
    declarations: [
        DynamicformComponent,
    ],
    providers: [],
})
export class DynamicformModule { }
