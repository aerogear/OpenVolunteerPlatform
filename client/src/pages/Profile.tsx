import React from 'react';
import { 
  IonContent,
  IonCard, 
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItemGroup,
  IonItemDivider,
  IonList,
  IonItem,
  IonIcon,
  IonLabel
} from '@ionic/react';
import { Header } from '../components/Header';

const Profile: React.FC = () => {
  return (
    <>
      <Header title="Profile" backHref="/tasks" />
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Authentication not configured</IonCardTitle>
            <IonCardSubtitle>IDM service required</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            Profile page cannot be displayed.
            Please enable Auth SDK by providing configuration pointing to your IDM service
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Login required</IonCardTitle>
            <IonCardSubtitle>Login is required in order to see profile page</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            Please press Login button to enter your credentials
          </IonCardContent>
        </IonCard>

        <IonList>
          <IonCard>
            <IonItemDivider color="light">
              <h2>Provider</h2>
            </IonItemDivider>
            <IonItem>
              <div className="identity-header">Full Name:</div>
              <div id="e2e-profile-full-name" className="identity-text"></div>
            </IonItem>
            <IonItem>
              <div className="identity-header">Email: </div>
              <div id="e2e-profile-email" className="identity-text"></div>
            </IonItem>
            <IonItem>
              <div className="identity-header"> Username: </div>
              <div id="e2e-profile-username" className="identity-text"></div>
            </IonItem>
            <IonItem>
              <IonLabel> OTP 2FA Enabled</IonLabel>
              <IonIcon icon="done" color="green"></IonIcon>
              <IonIcon icon="close" color="red"></IonIcon>
            </IonItem>

            <IonItem>
              <IonLabel>Email Verified</IonLabel>
              <IonIcon item-end color="green" icon="done"></IonIcon>
              <IonIcon item-end color="red" icon="close"></IonIcon>
            </IonItem>
          </IonCard>
          <IonCard>
            <IonItemGroup>
              <IonItemDivider color="light">
                <h2>Assigned Roles</h2>
              </IonItemDivider>
              <IonItem>
              </IonItem>
            </IonItemGroup>
          </IonCard>
        </IonList>
      </IonContent>
    </>
  );
};

export default Profile;
