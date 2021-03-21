import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from 'app/shared/directives/match-height.directive';
import { MatTableModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatTooltipModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { HelpComponent } from './help.component';
import { HelpRoutingModule } from './help-routing.module';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        MatchHeightModule,
        HelpRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatTooltipModule
    ],
    exports: [],
    declarations: [
        HelpComponent
    ],
    providers: [],
})
export class HelpModule { }
