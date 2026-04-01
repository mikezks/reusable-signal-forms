import { httpResource } from '@angular/common/http';
import { Component, computed, input, linkedSignal, numberAttribute, Signal } from '@angular/core';
import { apply, createManagedMetadataKey, form, FormField, metadata, required, schema, validate } from '@angular/forms/signals';
import { AddressControl } from '../ui-common/address-control';
import { Address, addressSchema, initialAddress } from '../ui-common/address.model';
import { initialPassenger, Passenger } from './passenger';

// Custom Field Property
// const ALLOWED_FIRSTNAMES = createMetadataKey<string[]>();
const ALLOWED_FIRSTNAMES = createManagedMetadataKey<Signal<string[]>, string[]>(
  signal => computed(() => signal() || [])
);

// Step 3: Field Logic: Validators, Readonly, Disabled, Field Metadata
export const passengerSchema = schema<Passenger & {
  address: Address
}>(passengerPath => {
  metadata(passengerPath.firstName, ALLOWED_FIRSTNAMES, () => ['Emma', 'Mary', 'Hanna', 'Sarah']);
  required(passengerPath.firstName, {
    message: 'Either Firstname or Lastname needs to have a value.',
    when: ctx => !ctx.valueOf(passengerPath.name)
  });
  required(passengerPath.name, {
    message: 'Either Firstname or Lastname needs to have a value.',
    when: ctx => !ctx.valueOf(passengerPath.firstName)
  });
  validate(passengerPath.firstName, ({ value, fieldTree }) => {
    const allowedFirsttnames = fieldTree().metadata(ALLOWED_FIRSTNAMES)?.() || [];
    return allowedFirsttnames.includes(value())
      ? null
      : {
        kind: 'forbiddenFirstname',
        message: 'This Firstname is not allowed. Enter one of the following: ' + allowedFirsttnames.join(', ')
      };
  });
  apply(passengerPath.address, addressSchema);
});


@Component({
  selector: 'app-passenger-edit',
  imports: [
    // Step 4: UI Control -> Directive for Template Binding
    FormField,
    AddressControl,
],
  templateUrl: './passenger-edit.component.html'
})
export class PassengerEditComponent {
  readonly id = input(610, { transform: numberAttribute });

  // Step 1: Data Model -> Writable Signal, Resource Value
  protected readonly passengerResource = httpResource<Passenger>(
    () => 'https://demo.angulararchitects.io/api/passenger/' + this.id()
  , { defaultValue: initialPassenger });
  protected readonly passengerWithAddress = linkedSignal(() => ({
    ...this.passengerResource.value(),
    address: {
      ...initialAddress,
      street: 'Main Street'
    }
  }));

  // Step 2: Field State -> valid, dirty, touched, value, etc. 
  protected readonly editForm = form(this.passengerWithAddress, passengerSchema);

  protected save(): void {
    console.log({
      form: this.editForm().value(),
      resource: this.passengerResource.value()
    });
  }
}
