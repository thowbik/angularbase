import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from 'app/shared/directives/match-height.directive';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';


@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        MatchHeightModule,
        LoginRoutingModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatDialogModule
    ],
    exports: [],
    declarations: [
        LoginComponent
    ],
    providers: [],
})
export class LoginModule { }
