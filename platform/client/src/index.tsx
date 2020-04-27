import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { AppContainer } from './AppContainer';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<AppContainer app={App} />, document.getElementById('root'));

serviceWorker.register();
