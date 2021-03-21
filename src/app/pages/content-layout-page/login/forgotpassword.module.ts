import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ForgotpasswordComponent } from './forgotpassword.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: ForgotpasswordComponent,
        data: {
            title: 'Forgot Password'
        }
    }
];

@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        MatSelectModule,
        CommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ForgotpasswordComponent
    ],
    providers: [],
    exports: [RouterModule, ForgotpasswordComponent],
})
export class ForgotpasswordModule { }
