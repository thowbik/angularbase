import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material';
import { NgxSelectModule } from 'ngx-select-ex';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionComponent } from './question.component';
import { QuestionRoutingModule } from './question-routing.module';
import { MatRadioModule } from '@angular/material/radio';
import {MatProgressBarModule} from '@angular/material'
@NgModule({
  imports: [
    CommonModule,
    QuestionRoutingModule,
    MatSidenavModule,
    NgxSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatProgressBarModule
  ],
  exports: [],
  declarations: [
    QuestionComponent,
  ],
  providers: [],
})
export class QuestionModule { }
