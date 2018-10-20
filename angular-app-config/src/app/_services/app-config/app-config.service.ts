import { Injectable, isDevMode } from '@angular/core';
import { take, tap } from 'rxjs/operators';
import { pipe, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Environments, AppConfig, AppConfigFeatureFlags, AppConfigEndPoints, AppConfigFeatureFlag, AppConfigEndPoint } from './app-config.interface';

@Injectable()
export class AppConfigurationService {
  private appConfig: AppConfig = null;

  private env: Environments = isDevMode() ? Environments.DEV : Environments.PROD;

  constructor(private http: HttpClient) {
    // Retrieve and Set Configuration
    this.getConfig(this.env)
      .pipe(
        take(1),
        tap(appConfig => console.log(`App Initializing in ${this.env} mode`))
      )
      .subscribe(data => this.setConfig(data));
  }

  /**
   * @description Method for getting app configuration on service,
   * will make async request on first call then will load from memory there after.
   * @param appConfig  App Configuration object to be set on service.
   */
  public getConfig(env: Environments = Environments.DEV, path: string = '/'): Observable<AppConfig> {
    return new Observable(observer => {
      if (!this.appConfig) {
        this.http.get(`${path}app.config.json`).subscribe(
          data => {
            observer.next(data[env]);
            observer.complete();
          },
          err => {
            observer.error(err);
          }
        );
      } else {
        observer.next(this.appConfig);
        observer.complete();
      }
    });
  }

  /**
   * @description Method for setting app configuration on service
   * @param appConfig  App Configuration object to be set on service.
   */

  public setConfig(appConfig: AppConfig): void {
    this.appConfig = appConfig;
  }

  /**
   * @description Method for retrieving featureFlags for a given environment and/or feature within that environment,
   * falls back to all featureFlags if feature is not recognized or was not present.
   * @param env Environment string to use to look up configuration, defaults to dev.
   * @param feature The Feature string/key to use to lookup featre specific flags (Optional)
   */
  public getFeatureFlags(env: Environments = this.env, feature?: string) {
    if (feature) {
      try {
        return <AppConfigFeatureFlag>this.appConfig[env].featureFlags[feature];
      } catch (error) {
        return <AppConfigFeatureFlags>this.appConfig[env].featureFlags;
      }
    }
  }

  /**
   * @description Method for retrieving end points for a given environment and/or feature within that environment,
   * falls back to all end points if feature is not recognized or was not present.
   * @param env Environment string to use to look up configuration, defaults to dev.
   * @param feature The Feature string/key to use to lookup featre specific flags (Optional)
   */
  public getEndPoints(env: Environments = this.env, feature?: string) {
    if (feature) {
      try {
        return <AppConfigEndPoint>this.appConfig[env].endPoints[feature];
      } catch (error) {
        return <AppConfigEndPoints>this.appConfig[env].endPoints;
      }
    }
  }
}
