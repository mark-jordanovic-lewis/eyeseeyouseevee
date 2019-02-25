import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [SharedStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
