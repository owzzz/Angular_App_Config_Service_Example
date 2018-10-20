import { Component, OnInit } from '@angular/core';
import { AppConfigurationService } from './_services/app-config/app-config.service';
import { AppConfig } from './_services/app-config/app-config.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public appConfigService: AppConfigurationService) {}

  public config: AppConfig = null;

  public title = 'Angular Config Service Demo';

  ngOnInit() {
    this.appConfigService.getConfig().subscribe(config => {
      this.config = config;
    });
  }
}
