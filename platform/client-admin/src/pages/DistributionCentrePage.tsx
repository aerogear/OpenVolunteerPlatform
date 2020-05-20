import React from 'react';
import { useFindAllDistributionCentresQuery } from '../dataFacade';
import { IonLoading, IonPage, IonContent, IonFooter, IonButton, IonIcon } from '@ionic/react';
import { Header, Empty } from '../components';
import { RouteComponentProps, useHistory } from 'react-router';
import { Marker } from 'google-maps-react';
import { Map } from '../components/Map';
import { Link } from 'react-router-dom';
import { open } from 'ionicons/icons';

export const DistributionCentrePage: React.FC<RouteComponentProps> = ({ match }) => {
  const history = useHistory();
  let { data, loading, error } = useFindAllDistributionCentresQuery();

  if (error) {
    console.log(error);
  }

  if (loading) return <IonLoading
    isOpen={loading}
    message={'Loading...'}
  />;

  const distributionCentres = data?.findAllDistributionCentres || [];

  let mapContent = <Empty />;
  const size = distributionCentres.length;

  if (size > 0) {
    const totalLatLong = {
      lat: 0, lng: 0
    };

    let distributionMarkers = distributionCentres
      .map((distributionCentre, index) => {
        const lat = distributionCentre?.lat!;
        const lng = distributionCentre?.long!;

        totalLatLong.lat += lat;
        totalLatLong.lng += lng;

        const title = `${distributionCentre?.address1} ${distributionCentre?.address2} ${distributionCentre?.city}`;

        return <Marker
          key={index}
          title={title}
          label={distributionCentre?.name!}
          onClick={() => history.push(`/manageDistributionCentre/${distributionCentre?.id}`)}
          position={{
            lat,
            lng
          }} />
      });

    mapContent = <Map
      zoom={2}
      center={{
        lat: totalLatLong.lat / size,
        lng: totalLatLong.lng / size
      }}>
      {distributionMarkers}
    </Map>
  }

  return (
    <IonPage>
      <Header title="List of Distribution" match={match} />
      <IonContent className="ion-padding" >
      <Link to={'createDistributionCentre'}>
          <IonButton item-start color='primary' fill="outline">
            <IonIcon icon={open} />
              Create Distribution Centre
          </IonButton>
        </Link>
        {mapContent}
      </IonContent>
      <IonFooter>
        <div>
          OpenVolunteer Platform
        </div>
      </IonFooter>
    </IonPage >
  );
};
