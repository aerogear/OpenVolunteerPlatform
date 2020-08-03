import React from 'react';
import { useFindFlatDistributionCentresQuery } from '../dataFacade';
import { IonLoading, IonPage, IonContent, IonFooter, IonIcon, IonFab, IonFabButton, IonCard } from '@ionic/react';
import { Header, Empty } from '../components';
import { RouteComponentProps, useHistory } from 'react-router';
import { Marker } from 'google-maps-react';
import { Map } from '../components/Map';
import { add } from 'ionicons/icons';

export const DistributionCentrePage: React.FC<RouteComponentProps> = ({ match }) => {
  const history = useHistory();
  let { data, loading, error } = useFindFlatDistributionCentresQuery();

  if (error) {
    console.log(error);
  }

  if (loading) return <IonLoading
    isOpen={loading}
    message={'Loading...'}
  />;

  const distributionCentres = data?.findDistributionCentres?.items || [];

  let mapContent = <Empty />;
  const size = distributionCentres.length;

  if (size > 0) {
    const totalLatLong = {
      lat: 0, lng: 0
    };

    const distributionMarkers = distributionCentres
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
          onClick={() => history.push(`/manageDistributionCentre/${distributionCentre?._id}`)}
          position={{
            lat,
            lng
          }} />
      });

    mapContent = <Map
      zoom={12}
      center={{
        lat: totalLatLong.lat / size,
        lng: totalLatLong.lng / size
      }}>
      {distributionMarkers}
    </Map>
  }

  return (
    <IonPage>
      <Header title="Distribution Centers Map" match={match} />
      <IonContent className="ion-padding" >
        <IonCard>
          {mapContent}
        </IonCard>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="createDistributionCentre">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
      <IonFooter>
        <div>
          OpenVolunteer Platform
        </div>
      </IonFooter>
    </IonPage >
  );
};
