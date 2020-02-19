import React from 'react';
import { Router } from './components';
import { keycloakHelpers } from './helpers';

// load all styles
import './theme';

export const App: React.FC = () => {

  // flush undefined tokens from local storage
  keycloakHelpers.flushInvalidTokens();

  return <Router />;
  
};

