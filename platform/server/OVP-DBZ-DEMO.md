# Open Volunteer Debezium Demo

Hi. In this part of the demo we going to show you OpenVolunteer Admin Application 
which is the system that was designed to help organizations with organization of volunteering efforts.
What we see on the right is the OpenVolunteer Admin panel and on the left we have OpenVolunteer Mobile application.


The demo is deployed on: 

```
https://open-volunteer-platform-ovp.apps.helios.intlyqe.com
```

The service exposes a:
- client PWA in the root endpoint i.e `/`
- the admin management app in `/admin` endpoint
- a GraphQL API playground in `/graphql` endpoint


### Before starting the recording

#### Open the client application in one browser tab :

`https://open-volunteer-platform-ovp.apps.helios.intlyqe.com`


When asked to login,

use: `wtrocki` as both the username and password. 

click on login and you'll have the client application opened. 

#### Open Kafdrop on another browser tab

`https://kafdrop-ovp.apps.helios.intlyqe.com/topic/dbserver1.showcase.volunteerentry/messages?partition=0&offset=0&count=100`

### On private mode or on another browser 
  1. open the admin application (make sure that the screen is side by side with the client app to avoid switching):


`https://open-volunteer-platform-ovp.apps.helios.intlyqe.com/admin`

When asked to login:

use the default created user `ovp-admin` as both the username and password.

Once loggen in, click on the `Reports` menu. If asked for allowing location, please do so as the report page is constructed based on our current location. 

This view is the perfect page to start the recording. 

  2. On another tab, open the playground and copy the below content (this tab should not be shown on the demo, only used to simulate some sensor events). 

```graphql
mutation enters {
  createVolunteerEntry(
    input: {
      checkedInAt: "2020-10-05T15:04:11.206Z"
      volunteerActions: []
      volunteer: {
        _id: "5ef9c631da553f262c7a95dc"
        firstName: "Wojciech"
        lastName: "Trocki"
        email: "wtrocki@gmail.com"
        username: "wtrocki"
      }
      distributionCentre: {
        _id: "5ef740ac12f76aecc84af1f2"
        name: "Berlin City Hall"
      }
    }
  ) {
    _id
  }
}

mutation pickingVolunteerEntry {
  updateVolunteerEntry(
    input: {
      _id: "5f772e5c8c274bc5a8d8c070",
      volunteerActions: [
        {
          _id: "5efa273a93802a8fb60e8ac0",
          title: "Delivery to Childcare Center, Munze"
        },
        {
          _id: "5ef9c4f9da553f262c7a95d7",
          title: "Delivery to Eberswalde (Andi). "
        }
      ]
    }
  ) {
    _id,
    volunteerActions
  }
}

mutation leaveUpdateVolunteerEntry{
  updateVolunteerEntry(
    input: {
      _id: "5f772e5c8c274bc5a8d8c070",
      checkedOutAt: "2020-10-05T15:14:11.900Z"
    }
  ) {
    _id
  }
}
```

Now you should have everything in place for the demo.

Go back to the `admin` and `client` views to start the recording.


# The Recording

<Do a nice pitch about open volunteer platfrom>

The volunteer should have some tasks by now.

You can add more actions to this volunteer by creating a new volunteer action task via the admin page (This might make the recording wrong so we might want to skip this part). 

On the client app, choose one task and change it's status to show that a volunteer sees assigned task and they can complete them. 

Go back to the admin `actions` page and show that this task is completed.


### Live updates

Go the admin actions list, stay on this page. 

(Switch to the playground at the same time). 

### Then create a new volunteer entry 

By clicking on the `enters`, you can click it several times to simulate more entries being created. 

At this point a toast will appear showing the volunteer entry.

Click the last toast (the one at the very bottom), this will correspond to the last entry created. We'll land in the volunteer entry description. 

In this page pay attention to the: 

`actionsCount` field, which should be `0` at this point.
Checkout time, which should be empty. 

These two fields will be lively updated in the next steps.


>NOTE: Update the entry `_id` for the `pickingVolunteerEntry` and `leaveUpdateVolunteerEntry` so that it corresponds to the last entry. (This should happen on the playground). 


### Pickup deliveries 

On the playgroung
 
After updating the `_id` for the `pickingVolunteerEntry`, click on it to update the number of picked volunteer actions. 

Once done, this should update the `actionsCount` to `2`.

### Checkout the distribution centre 

While still on the playground. 

After updating the `_id` for the `leaveUpdateVolunteerEntry`, click on it to update the number of picked volunteer actions. 

Once done, this should update the `checkedOutAt` field on the form plus show a toast that the volunteer has checked out.


## Show Kafdrop Before finishing the recording

On this tab:

`https://kafdrop-ovp.apps.helios.intlyqe.com/topic/dbserver1.showcase.volunteerentry/messages?partition=0&offset=0&count=100`

You can talk a little that the last three messages and how their Debezium created and defined structure (CloudEvents) 

Then go back to the Kafdrop home page and show the rest of the topics created by Debezium. 

