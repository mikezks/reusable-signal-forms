import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/ui-common/app';

bootstrapApplication(App)
  .catch((err) => console.error(err));
