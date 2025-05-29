import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { GlobalErrorStateMatcherService } from './shared/services/global-error-state-matcher.service';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: ErrorStateMatcher,
      useClass: GlobalErrorStateMatcherService,
    },
  ],
};
