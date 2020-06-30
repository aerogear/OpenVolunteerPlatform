---
id: datamodel
title: Data Model
---

## Customization of OVP server using data model

OVP processes your data model to generate a server and client side using best patterns for production ready applications and reduces amount of boilerplate code needed to be added by you.
Developers can focus on data and application requirements by modeling them using a GraphQL SDL. You can view your data model in `./server/model` folder

## Model

OVP (Graphback) operates on GraphQL Schema types annotated with `@model`. Refer to [this](https://graphback.dev/docs/next/metadata) page for complete documentation of `@model` and other annotations.
Adding this annotation to your type will enable Graphback to add additional elements to the schema and generate related code in JavaScript or TypeScript.

```graphql
"""
@model
"""
type Recipient {
  ...
}
```

Your data models can also contain custom types that are not Graphback models as shown below.

```graphql
"""
@model
"""
type VolunteerAction {
  id: ID!
  
  ... 
  """
  comments section about the delivery, exchanges between volunteer and recipient or administrator.
  """
  comments: [VolunteerActionComment]
}

"""
A custom type
"""
type VolunteerActionComment {
  text: String
  createdAt: DateTime
}
```

## Relationships

Graphback provides support for one-to-many and one-to-one relationships.

### OneToMany

```graphql
"""
@model(delete: false)
"""
type Volunteer {
  id: ID!
 
  ....

  """
  @oneToMany(field: 'volunteer')
  """
  actions: [VolunteerAction]
}

"""
Represents action that is assigned to volunteer

@model
"""
type VolunteerAction {
  id: ID!
  ...
  """
  @manyToOne(field: 'actions', key: 'volunteerId')
  """
  volunteer: Volunteer
}
```

This creates a one-to-many relationship between `Volunteer.actions` and `VolunteerAction.volunteer`. If `VolunteerAction.volunteer` does not exist Graphback will generate it for you, otherwise you can define it yourself.

By default this maps to `volunteer.volunteerId` in the underlying data source. Yon can customise this by adding `key` to the `@oneToMany` annotation.

### OneToOne

```graphql
"""
@model
"""
type Profile {
  id: ID!
  """
  @oneToOne
  """
  user: User!
}
```

This creates a one-sided relationship between the `Profile` and `User` models.

By default this maps to `profile.userId` in the underlying data source. Yon can customise this by adding `key` to the `@oneToOne` annotation:

```graphql
"""
@model
"""
type Profile {
  id: ID!
  """
  @oneToOne key: 'user_id'
  """
  user: User!
}
```

### ManyToMany

To create a many-to-many relationship, add a model for your join table and use two one-to-many relationship mappings to create the relationship.

```graphql

"""
@model
"""
type VolunteerAction {
  id: ID!
  
  ...

  """
  @oneToMany(field: 'volunteerAction')
  """
  products: [VolunteerActionProduct]
}

"""
Represents a join model between a volunteer action and product

@model
"""
type VolunteerActionProduct {
  id: ID!
}

"""
@model
"""
type Product {
  id: ID!
  
  ... 
  """
  @oneToMany(field: 'product')
  """
  volunteerActionProducts: [VolunteerActionProduct]
}
```
