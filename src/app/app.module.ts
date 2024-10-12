import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, PLATFORM_ID, APP_ID, Inject, APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BlogComponent } from './blog/blog.component';
import { BlogService } from './blog.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
@NgModule({
  declarations: [
    AppComponent,
    BlogComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule
    ],
  providers: [
    BlogService
    
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class AppModule {
  constructor( @Inject(PLATFORM_ID) private platformId: Object, @Inject(APP_ID) private appId: string) {
      const platform = isPlatformBrowser(platformId) ? 'on the server' : 'in the browser';
     }
}
