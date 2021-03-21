import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicformComponent } from './dynamicform.component';

const routes: Routes = [
    {
        path: '',
        component: DynamicformComponent,
        data: {
            title: 'DynamicForm'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DynamicformRoutingModule { }
