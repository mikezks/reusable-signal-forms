import { bootstrapApplication } from '@angular/platform-browser';
import { PassengerEditComponent } from './app/passenger/passenger-edit.component';

bootstrapApplication(PassengerEditComponent)
  .catch((err) => console.error(err));
