import React from 'react';
import { useLocation } from 'react-router';

import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonToggle } from '@ionic/react';

import { calendarOutline, helpBuoy, textOutline, informationCircleOutline, peopleCircleSharp, mapOutline, peopleOutline, optionsSharp, codeWorking } from 'ionicons/icons';

import './Menu.css'

const routes = {
  operationPages: [
    { title: 'Actions', path: '/actions', icon: codeWorking },
    { title: 'Schedules', path: '/schedule', icon: calendarOutline },
    { title: 'Action Map', path: '/map', icon: mapOutline },
    { title: 'Optimizations', path: '/optimize', icon: optionsSharp },
    { title: 'Reports', path: '/reports', icon: textOutline },
  ],
  managementPages: [
    { title: 'Volunteers', path: '/volunteers', icon: peopleOutline },
    { title: 'Recipients', path: '/recipients', icon: peopleCircleSharp },
    { title: 'Distribution Centre', path: '/distributionCentre', icon: informationCircleOutline }
  ],
  profile: [
    { title: 'Help', path: '/reports', icon: helpBuoy },
    { title: 'Logout', path: '/logout', icon: peopleOutline },
  ]
};

interface Pages {
  title: string,
  path: string,
  icon: string,
  routerDirection?: string
}
interface StateProps {
  darkMode?: boolean;
  isAuthenticated?: boolean;
  menuEnabled?: boolean;
}

interface MenuProps { }

export const Menu: React.FC<MenuProps> = ({ }) => {
  const location = useLocation();

  function renderlistItems(list: Pages[]) {
    return list
      .filter(route => !!route.path)
      .map(p => (
        <IonMenuToggle key={p.title} auto-hide="false">
          <IonItem detail={false} routerLink={p.path} className={location.pathname.startsWith(p.path) ? 'selected' : undefined}>
            <IonIcon slot="start" icon={p.icon} />
            <IonLabel>{p.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      ));
  }

  return (
    <IonMenu type="overlay" contentId="main">
      <IonContent forceOverscroll={false}>
        <IonList lines="none">
          <IonListHeader>OpenVP Operations</IonListHeader>
          {renderlistItems(routes.operationPages)}
        </IonList>
        <IonList lines="none">
          <IonListHeader>Role Management</IonListHeader>
          {renderlistItems(routes.managementPages)}
        </IonList>
        <IonList lines="none">
          <IonListHeader>Profile</IonListHeader>
          {renderlistItems(routes.profile)}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

