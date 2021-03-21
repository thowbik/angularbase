import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssessmentComponent } from './assessment.component';

const routes: Routes = [
    {
        path: '',
        component: AssessmentComponent,
        data: {
            title: 'Assessment'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AssessmentRoutingModule { }
