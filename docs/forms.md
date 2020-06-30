---
id: adding-and-customizing-forms
title: Out of the box Form
---

# 1. Introduction

Open Volunteer uses [`uniforms`](https://www.npmjs.com/package/uniforms) and [`uniforms-ionic`](https://www.npmjs.com/package/uniforms-ionic) packages to create html forms with built-in state management and validation with minimum code. 
You usually would not have to install any of these libraries since the reference implementation comes with them already. 


Thanks to this integration, Open Volunteer Platform provides you with simple re-usable form components which allows for rapid prototyping and cleaner React components. This source code for the forms is located in `client/src/forms` and `client-admin/src/forms`

# 2. Modifying an existing form

In this section we'll see how to add additional information, add validation, or remove information from an existing form.
To do so, we'll use the `client/src/forms/volunteer.ts` schema which looks like below. 

```ts
import SimpleSchema from '../config/SimpleSchema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';

const volunteerForm = new SimpleSchema({
    firstName: {
        type: String,
        max: 120,
        uniforms: {
            readonly: true
        }
    },
    lastName: {
        type: String,
        max: 120,
        uniforms: {
            readonly: true
        }
    },
    email: {
        type: String,
        max: 220,
        uniforms: {
            readonly: true,
            type: 'email'
        }
    },
    username: {
        type: String,
        max: 220,
        uniforms: {
            readonly: true
        }
    },
    address1: {
        type: String,
        max: 400
    },
    address2: {
        type: String,
        required: false,
        max: 400
    },
    city: {
        type: String,
        max: 100
    },
    postcode: {
        type: Number,
        required: false,
    },
    dateOfBirth: {
        type: Date,
        required: false,
        uniforms: {
            label: "Date Of Birth"
        },
    },
    canDeliver: {
        type: Boolean,
        uniforms: {
            label: "I volunteer to do delivery to recipients",
            defaultValue: false
        }
    }
} as any);

export default new SimpleSchema2Bridge(volunteerForm);
```

### Adding additional information

Adding additional information to display canbe achieved by only adding the field name and type of the model in question.
E.g if we want to allow volunteers to change their `active` status we could add the field as follows 
```ts
{
    active: {
        type: Boolean,
        uniforms: {
            label: "Active",
            defaultValue: true
        }
    }
}
```


### Removing a field 

This can be achieved by deleting the field from the form definition object. 

### Adding validation to postcode field

Let's asssume that we want our volunteer's postcodes can be between `1000-9999`, we can add this sort of validation using the min/max boundaries

```ts
{
    postcode: {
        type: Number,
        required: false,
        max: 9999,
        min: 1000
    }
}
```


## 3. Adding a new form

The process of adding a new custom form requires two steps. 

1. Defining the schema
2. Using the schema in a React Component 


Let's take a look at an example by trying to add a form to display product full details in the `client` application.

### Start by defining the schema. 

In the `client/src/forms/product.ts` file, let's define the following schema.

```ts
import SimpleSchema from '../config/SimpleSchema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';

const productSchema = new SimpleSchema({
    label: {
        type: String,
        max: 50,
        readonly: true
    },
    description: {
        type: String,
        max: 500,
        readonly: true
    }
} as any);

return new SimpleSchema2Bridge(productSchema);

```

The schema above will enable us to display full product information which cannot be edited thanks to the `readonly` property. 
This is because we do not want a volunteer to modify the product details. Only admin can do so. 

### Let's use it in a component!

The above schema can be used in any react component as follows.

```ts
import React from 'react';
import { AutoForm } from 'uniforms-ionic'

import productSchema from '../forms/product';

export default function ProductForm() {
  const product = {
      label: "product label",
      description: "A very long product description"
  }; // This information could come from the server e.g via a volunteerAction.products list.   
  return <AutoForm schema={productSchema} model={product}/>;
}
```

And that's it! `AutoForm` will generate a complete form with labeled fields, errors list (if any) and a submit button.

Also, it will take care of validation and handle model changes.
