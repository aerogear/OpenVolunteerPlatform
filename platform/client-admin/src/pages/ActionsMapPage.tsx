import React from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { useFindVolunteerActionsQuery } from '../dataFacade';
import { IonLoading, IonPage, IonContent, IonFooter, IonCard } from '@ionic/react';
import { Header, Empty } from '../components';
import { Marker } from 'google-maps-react';
import { Map } from '../components/Map';

const RED_DOT = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
const YELLOW_DOT = "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";

export const ActionsMapPage: React.FC<RouteComponentProps> = ({ match }) => {
  const history = useHistory();
  const { data, loading, error } = useFindVolunteerActionsQuery();

  if (error) {
    console.log(error);
  }

  if (loading) {
    return <IonLoading isOpen={loading} message={'Loading...'} />
  };

  const volunteerActions = data?.findVolunteerActions?.items || [];


  let mapContent = <Empty />;

  if (volunteerActions.length > 0) {
    const totalLatLong = {
      lat: 0, lng: 0
    };

    const markers: JSX.Element[] = [];

    const getDistributionCentreMarker = (distributionCentre: any, index: number): JSX.Element => {
      const lat = distributionCentre?.lat!;
      const lng = distributionCentre?.long!;

      totalLatLong.lat += lat;
      totalLatLong.lng += lng;

      const title = `${distributionCentre?.address1} ${distributionCentre?.address2} ${distributionCentre?.city}`;

      return <Marker
        key={index}
        title={title}
        label={distributionCentre?.name!}
        icon={{
          url: YELLOW_DOT
        }}
        onClick={() => history.push(`/manageDistributionCentre/${distributionCentre?.id}`)}
        position={{
          lat,
          lng
        }} />

    }

    const getRecipientMarker = (recipient: any, index: number): JSX.Element => {
      const lat = recipient?.lat!;
      const lng = recipient?.long!;

      totalLatLong.lat += lat;
      totalLatLong.lng += lng;

      const title = `${recipient?.address1} ${recipient?.address2} ${recipient?.city}`;

      return <Marker
        key={index}
        title={title}
        label={recipient?.firstName! + " " + recipient?.lastName!}
        icon={{
          url: RED_DOT
        }}
        onClick={() => history.push(`/manageRecipient/${recipient?.id}`)}
        position={{
          lat,
          lng
        }} />

    }

    let markersCounter = 0;
    for (const volunteerAction of volunteerActions) {
      const recipient = volunteerAction?.recipient;
      const distributionCentre = volunteerAction?.distributionCentre;
      markers.push(getRecipientMarker(recipient, markersCounter++));
      markers.push(getDistributionCentreMarker(distributionCentre, markersCounter++));
    }

    mapContent = <Map
      zoom={11}
      center={{
        lat: totalLatLong.lat / markersCounter,
        lng: totalLatLong.lng / markersCounter
      }}>
      {markers}
    </Map>
  }

  return (
    <IonPage>
      <Header title="Actions Map" match={match} />
      <IonContent className="ion-padding" >
        <IonCard>
          {mapContent}
        </IonCard>
      </IonContent>
      <IonFooter>
        <div>
          OpenVolunteer Platform
        </div>
      </IonFooter>
    </IonPage >
  );

};
