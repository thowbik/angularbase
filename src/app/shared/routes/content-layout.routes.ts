import { Routes, RouterModule } from '@angular/router';

// Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...

export const CONTENT_ROUTES: Routes = [
  {
    path: 'content-layout',
    loadChildren: () => import('../../pages/content-layout-page/content-pages.module').then(m => m.ContentPagesModule)
  },
  {
    path: 'login',
    loadChildren: () => import('../../pages/content-layout-page/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('../../pages/content-layout-page/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'question',
    loadChildren: () => import('../../pages/content-layout-page/question/question.module').then(m => m.QuestionModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('../../pages/content-layout-page/welcome/welcome.module').then(m => m.WelcomeModule)
  },
  {
    path: 'department',
    loadChildren: () => import('../../pages/content-layout-page/department/department.module').then(m => m.DepartmentModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('../../pages/content-layout-page/reports/reports.module').then(m => m.ReportsModule)
  }
];
