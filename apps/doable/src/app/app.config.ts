import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { StateModule } from '@doable/core-state';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(StateModule)
  ],
};
