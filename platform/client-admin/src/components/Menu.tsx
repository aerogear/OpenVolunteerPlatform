import React from 'react';
import { useLocation } from 'react-router';

import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle } from '@ionic/react';

import { textOutline, informationCircleOutline, peopleCircleSharp, mapOutline, peopleOutline, optionsSharp, codeWorking, cart } from 'ionicons/icons';

import './Menu.css'

const routes = {
  operationPages: [
    { title: 'Actions', path: '/actions', icon: codeWorking },
    { title: 'Action Map', path: '/map', icon: mapOutline },
    { title: 'Scheduling', path: '/schedule', icon: optionsSharp },
    { title: 'Reports', path: '/reports', icon: textOutline },
  ],
  managementPages: [
    { title: 'Volunteers', path: '/volunteers', icon: peopleOutline },
    { title: 'Recipients', path: '/recipients', icon: peopleCircleSharp },
    { title: 'Products', path: '/products', icon: cart },
    { title: 'Distribution Centre', path: '/distributionCentre', icon: informationCircleOutline }
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

export const Menu: React.FC<MenuProps> = () => {
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
    <IonMenu type="push" contentId="main">
      <IonContent forceOverscroll={false}>
        <IonList lines="none">
          <IonListHeader>Operations</IonListHeader>
          {renderlistItems(routes.operationPages)}
        </IonList>
        <IonList lines="none">
          <IonListHeader>Management</IonListHeader>
          {renderlistItems(routes.managementPages)}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

