# Signal Forms

## Metadata

Previous version and Angular docs:

```ts
const ALLOWED_FIRSTNAMES = createMetadataKey<string[]>();
metadata(passengerPath.firstName, ALLOWED_FIRSTNAMES, () => ['Mia', 'Hanna', 'Sofia']);
const allowedFirstnames = computed(() =>
  this.editForm.firstName().metadata(ALLOWED_FIRSTNAMES)().join(',')
);
```

Current and correct typing, because is not guaranteed that the MetadataKey is present and a type-compliant value is already set:

```ts
const ALLOWED_FIRSTNAMES = createMetadataKey<string[]>();
metadata(passengerPath.firstName, ALLOWED_FIRSTNAMES, () => ['Mia', 'Hanna', 'Sofia']);
const allowedFirstnames = computed(() =>
  this.editForm.firstName().metadata(ALLOWED_FIRSTNAMES)?.()?.join(',') || ''
);
```

Possible partial solution, but not easy to implement:

```ts
// Initial value
const ALLOWED_FIRSTNAMES = createManagedMetadataKey<Signal<string[]>, string[]>(
  signal => computed(() => signal() || [])
);
metadata(passengerPath.firstName, ALLOWED_FIRSTNAMES, () => ['Mia', 'Hanna', 'Sofia']);
const allowedFirstnames = computed(() =>
  this.editForm.firstName().metadata(ALLOWED_FIRSTNAMES)?.().join(',') || ''
);
```

Still, one optional chaining operator is needed and therefor we also need to define a fallback value in chase the chain is undefined.

Would be helpful, if we could strictly type the MetadataKeys:

```ts
const editForm = form(
  this.passengerWithAddress,
  passengerSchema,
  metadataType<{
    firstName: {
      ALLOWED_FIRSTNAMES: typeof ALLOWED_FIRSTNAMES
    }
  }>()
);
```
