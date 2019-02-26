import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { ContentComponent } from './content/content.component';

const routes: Routes = [
  { path: '', redirectTo: '/arrivals', pathMatch: 'full'},
  { path: 'arrivals', component: LandingPageComponent },
  { path: 'content', redirectTo: '/content/blog', pathMatch: 'full'},
  { path: 'content/:slug', component: ContentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
