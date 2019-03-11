import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedStateService } from './shared-state.service';

import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { ContentCvComponent }    from './content-cv/content-cv.component';
import { ContentBlogComponent }  from './content-blog/content-blog.component';
import { ContentComicComponent } from './content-comic/content-comic.component';
import { ContentForumComponent } from './content-forum/content-forum.component';
import { ContentCodeComponent }  from './content-code/content-code.component';

import { SafeHtmlPipe } from './safe-html.pipe';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SvgControlComponent } from './svg-control/svg-control.component';
import { CircleGridComponent } from './circle-grid/circle-grid.component';
import { CommunicationsComponent } from './communications/communications.component';
import { HttpClientModule } from '@angular/common/http';

// FAKE DB
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { StateStoreService }  from './state-store.service';

HttpClientModule
// The HttpClientInMemoryWebApiModule module intercepts HTTP requests
// and returns simulated server responses.
// Remove it when a real server is ready to receive requests.
HttpClientInMemoryWebApiModule.forRoot(
  StateStoreService, { dataEncapsulation: false }
)
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    ContentComponent,
    ContentCvComponent,
    ContentBlogComponent,
    ContentComicComponent,
    ContentForumComponent,
    ContentCodeComponent,
    SafeHtmlPipe,
    LandingPageComponent,
    SvgControlComponent,
    CircleGridComponent,
    CommunicationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(StateStoreService),
    FormsModule
  ],
  providers: [SharedStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
