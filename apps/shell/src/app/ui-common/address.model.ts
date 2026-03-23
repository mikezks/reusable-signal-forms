import { required, schema } from "@angular/forms/signals";

export interface Address {
  street: string;
  number: string;
  zipCode: string;
  city: string;
  country: string;
}

export const initialAddress: Address = {
  street: '',
  number: '',
  zipCode: '',
  city: '',
  country: ''
};

export const addressSchema = schema<Address>(addressPath => {
  required(addressPath.street, {
    message: 'Please enter a street name.'
  });
});
