export interface Environment {
  ENVIRONMENT: EnvironmentType;
  API_URL: string;
  APP_NAME: string;
}

export enum EnvironmentType {
  PRODUCTION = 'Production',
  DEVELOPMENT = 'Développement',
  LOCAL = 'Local',
}
