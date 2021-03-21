import { Routes, RouterModule } from '@angular/router';

// Route for content layout with sidebar, navbar and footer
export const Full_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../pages/full-layout-page/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'dynamicform',
    loadChildren: () => import('../../pages/full-layout-page/dynamicform/dynamicform.module').then(m => m.DynamicformModule)
  },
  {
    path: 'assessment',
    loadChildren: () => import('../../pages/full-layout-page/assessment/assessment.module').then(m => m.AssessmentModule)
  }
];
