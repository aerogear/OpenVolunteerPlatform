import React from 'react'
import { Route } from 'react-router-dom'

export const KeycloakRoute: React.FC<any> = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={Component}
    />
  );
};
