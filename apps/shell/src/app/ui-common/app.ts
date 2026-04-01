import { Component } from "@angular/core";
import { PassengerEditComponent } from "../passenger/passenger-edit.component";
import { Passenger } from "../passenger/passenger";


@Component({
  selector: 'app-root',
  imports: [PassengerEditComponent],
  template: `
    <app-passenger-edit (passengerChange)="log($event)" />
  `
})
export class App {
  protected log(passenger: Passenger): void {
    console.log(passenger);
  }
}