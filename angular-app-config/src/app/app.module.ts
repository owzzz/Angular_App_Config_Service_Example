import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { AppConfigurationService } from './_services/app-config/app-config.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [HttpClientModule, BrowserModule],
  providers: [
    AppConfigurationService,
    {
      provide: APP_INITIALIZER,
      useFactory: (appConfigService: AppConfigurationService) => () => appConfigService.getConfig(),
      deps: [AppConfigurationService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
