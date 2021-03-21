import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ChangepasswordComponent } from './changepassword.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: ChangepasswordComponent,
        data: {
            title: 'Change Password'
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
        ChangepasswordComponent
    ],
    providers: [],
    exports: [RouterModule, ChangepasswordComponent],
})
export class ChangepasswordModule { }
