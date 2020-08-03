import React from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { useFindVolunteerActionsQuery } from '../dataFacade';
import { IonLoading, IonPage, IonContent, IonFooter, IonCard } from '@ionic/react';
import { Header, Empty } from '../components';
import { Marker } from 'google-maps-react';
import { Map } from '../components/Map';
import { YELLOW_ICON, RED_ICON } from '../config/MarkerIcons';


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
          url: YELLOW_ICON
        }}
        onClick={() => history.push(`/manageDistributionCentre/${distributionCentre?._id}`)}
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
        label={recipient?.firstName}
        icon={{
          url: RED_ICON
        }}
        onClick={() => history.push(`/manageRecipient/${recipient?._id}`)}
        position={{
          lat,
          lng
        }} />
    }

    let uniqueIndex = 0;
    for (const volunteerAction of volunteerActions) {
      const recipient = volunteerAction?.recipient;
      const distributionCentre = volunteerAction?.distributionCentre;
      markers.push(getRecipientMarker(recipient, uniqueIndex++));
      markers.push(getDistributionCentreMarker(distributionCentre, uniqueIndex++));
    }

    mapContent = <Map
      zoom={13}
      center={{
        lat: totalLatLong.lat / uniqueIndex,
        lng: totalLatLong.lng / uniqueIndex
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
