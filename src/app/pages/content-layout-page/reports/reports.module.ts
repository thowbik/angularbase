import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from 'app/shared/directives/match-height.directive';
import { MatTableModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatProgressBarModule, MatSidenavModule, MatRadioModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReportsComponent } from './reports.component';
import { ReportsRoutingModule } from './reports-routing.module';
import { NgxSelectModule } from 'ngx-select-ex';

@NgModule({
    imports: [
        NgbModule,
        MatchHeightModule,
        ReportsRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatProgressBarModule,
        CommonModule,
        MatSidenavModule,
        NgxSelectModule,
        FormsModule,
        MatRadioModule,
       
    ],
    exports: [],
    declarations: [
        ReportsComponent
    ],
    providers: [],
})
export class ReportsModule { }
