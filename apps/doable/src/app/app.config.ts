import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { StateModule } from '@doable/core-state';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(StateModule),
    provideAnimations()
  ],
};
