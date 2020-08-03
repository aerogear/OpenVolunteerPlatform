import React from 'react';
import moment, { unitOfTime } from "moment";
import { Header } from '../components';
import humanizeString from "humanize-string";
import { RouteComponentProps } from 'react-router';
import { useGetTodayActionReportLazyQuery } from '../dataFacade';
import { IonPage, IonContent, IonFooter, IonGrid, IonRow, IonCol, IonLoading, IonCard, IonBadge, IonCardContent, IonCardHeader } from '@ionic/react';


const EARTH_RADIUS = 6378.137;
const DAY_UNIT_OF_TIME: unitOfTime.Base = "day";
const ONE_KILOMETER_IN_EARTH_DEGREES = (1 / ((2 * Math.PI / 360) * EARTH_RADIUS));
const REPORT_COLUMN_SIZE = parseInt(process.env.REACT_APP_REPORT_COLUMN_SIZE || '4');
const NEARBY_MAX_DISTANCE = parseInt(process.env.REACT_APP_NEARBY_MAX_DISTANCE || '100');
const LATITUDE_INCREMENT = NEARBY_MAX_DISTANCE * ONE_KILOMETER_IN_EARTH_DEGREES;

export const ActionReportPage: React.FC<RouteComponentProps> = ({ match }) => {
  const now = moment();
  const todayMidnight = now.startOf(DAY_UNIT_OF_TIME).toDate();
  const tomorrowMidnight = now.add(1, DAY_UNIT_OF_TIME).startOf(DAY_UNIT_OF_TIME).toDate();

  const [getTodayActionReport, { data, loading, error, called }] = useGetTodayActionReportLazyQuery();

  if (!called) {
    if (navigator?.geolocation) {
      navigator.geolocation
        .getCurrentPosition((location) => {
          getTodayActionReport({
            variables: {
              todayMidnight,
              tomorrowMidnight,
              lat: latFilter(location.coords.latitude),
              long: longFilter(location.coords.longitude, location.coords.latitude)
            }
          });
        }, console.error);
    } else {
      getTodayActionReport({
        variables: {
          todayMidnight,
          tomorrowMidnight,
          lat: latFilter(),
          long: longFilter()
        }
      });
    }
  }

  if (error) {
    console.log(error);
  }

  if (loading) return <IonLoading
    isOpen={loading}
    message={'Loading...'}
  />;

  const allActions = {
    __typename: data?.CreatedActions.__typename,
    items: [...(data?.CreatedActions.items || []), ...(data?.AssignedActions.items || []), ...(data?.CompletedActions.items || [])]
  };

  const reports: any = {
    TotalNumberActions: allActions,
    ...data
  };

  const reportsRows = [];
  const entries: any[] = Object.entries(reports);
  for (let row = 0; row < entries.length; row += REPORT_COLUMN_SIZE) {
    const columns = entries.slice(row, row + REPORT_COLUMN_SIZE).map((entry) => {
      let count = 0;
      if (entry[1].__typename === data?.CreatedActions.__typename) {
        count = entry[1].items.length;
      } else {
        const uniqueActions: Set<string> = new Set();
        for (const recipient of entry[1].items) {
          for (const action of recipient.actions) {
            uniqueActions.add(action._id);
          }
        }
        count = uniqueActions.size;
      }
      return [entry[0], count];
    });

    reportsRows.push(columns);
  }

  const gridContent = reportsRows.map((reportRow, index) => {
    const columns = reportRow.map((column) => {
      return <IonCol key={column[0]}>
        <IonCard key={"card-" + column[0]}>
          <IonCardHeader style={{ margin: "0 auto", width: "40%" }}>
            <IonBadge style={{ padding: "1em" }} color={index === 2 ? "warning" : "primary"}>{column[1]}</IonBadge>
          </IonCardHeader>

          <IonCardContent>
            <p style={{ textAlign: "center" }}>
              {humanizeString(column[0])}
            </p>
          </IonCardContent>
        </IonCard>
      </IonCol >
    });

    return (
      <div key={index}>
        {index === 0 ? <h4>General stats</h4> : ""}
        {index === 1 ? <h4>Todays stats</h4> : ""}
        {index === 2 ? <h4>Incidents</h4> : ""}
        {index === 3 ? <h4>Location based</h4> : ""}
        <IonRow> {columns}</IonRow>
      </div>
    )
  });

  return (
    <IonPage>
      <Header title="OpenVolunteer Admin App" match={match} />
      <IonContent className="ion-padding" >
        <IonGrid>
          {gridContent}
        </IonGrid>
      </IonContent>
      <IonFooter>
        <div>
          OpenVolunteer Platform
        </div>
      </IonFooter>
    </IonPage >
  );

};

function latFilter(currentLat?: number): number[] {
  if (currentLat === undefined) {
    return [-90, 90];
  }

  return [currentLat + LATITUDE_INCREMENT, currentLat - LATITUDE_INCREMENT].sort();
}

function longFilter(currentLong?: number, lat?: number): number[] {
  if (currentLong === undefined) {
    return [-180, 180];
  }

  const longitudeIncrement = LATITUDE_INCREMENT / Math.cos(lat!! * Math.PI / 180);

  return [currentLong + longitudeIncrement, currentLong - longitudeIncrement].sort();
}
