import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CampaignListComponent } from './campaign/campaign-list/campaign-list.component';
import { CampaignFormComponent } from './campaign/campaign-form/campaign-form.component';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'campaign',
    component: CampaignListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'campaign/new',
    component: CampaignFormComponent,
    canActivate: [authGuard],
  },
  { path: '', redirectTo: 'campaign', pathMatch: 'full' },
];
