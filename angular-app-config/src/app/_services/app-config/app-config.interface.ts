export interface AppConfig {
  dev?: AppConfigEnv;
  test?: AppConfigEnv;
  prod?: AppConfigEnv;
}

export interface AppConfigEnv {
  featureFlags?: AppConfigFeatureFlags;
  endPoints?: AppConfigEndPoints;
}

export interface AppConfigEndPoints {
  [key: string]: AppConfigEndPoint;
}

export interface AppConfigEndPoint {
  [key: string]: string;
}

export interface AppConfigFeatureFlags {
  [key: string]: AppConfigFeatureFlag;
}

export interface AppConfigFeatureFlag {
  [key: string]: string;
}

export enum Environments {
  DEV = 'dev',
  TEST = 'test',
  PROD = 'prod'
}
