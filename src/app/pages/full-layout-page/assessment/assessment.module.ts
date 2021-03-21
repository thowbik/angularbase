import { AssessmentComponent } from './assessment.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentRoutingModule } from './assessment-routing.module';
import { MatSidenavModule } from '@angular/material';
import { NgxSelectModule } from 'ngx-select-ex';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
@NgModule({
  imports: [
    CommonModule,
    AssessmentRoutingModule,
    MatSidenavModule,
    NgxSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule
  ],
  exports: [],
  declarations: [
    AssessmentComponent,
  ],
  providers: [],
})
export class AssessmentModule { }
