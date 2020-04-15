import React, { useEffect, useState } from 'react';
import { Router } from './components';
import { useApolloOfflineClient } from "react-offix-hooks";

// load all styles
import './theme';

export const App: React.FC = () => {
  return (
    <>
      <Router />
      
    </>
  );
};

