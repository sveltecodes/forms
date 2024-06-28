# Svelte Form Manager

No wrapper components, no extra markup, no dependencies, just forms.

## Installation

```bash
npm install @svelte.codes/form-manager
```

## Usage

```ts
<script lang="ts">
  import { Form, FormContainer, FormTextField, email, minLength } from "@svelte.codes/form-manager";

  const form = new Form({
    name: "test",
    fields: {
      email: {
        name: "email",
        label: "Email",
        placeholder: "Email",
        validators: [email]
      },
      firstName: {
        name: "firstName",
        label: "firstName",
        placeholder: "firstName",
        validators: [minLength(3)]
      },
      lastName: {
        name: "lastName",
        label: "lastName",
        placeholder: "lastName"
      }
    }
  });

  $: errors = form.fields.firstName.errors;
  $: values = form.values;
</script>

<FormContainer {form}>
  <FormTextField name="email" {form} />
  <FormTextField name="firstName" {form} />
  <FormTextField name="lastName" {form} />
  <button
    on:click={() => {
      const result = form.submit();
      console.log(result);
    }}>Submit</button
  >
</FormContainer>

<div>
  values: {JSON.stringify($values)}
</div>
<div>
  errors: {$errors?.join(", ")}
</div>

```
