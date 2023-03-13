import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { LocalizeProvider } from 'react-localize-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';


const app = (
  <Provider store={ store }>
    <LocalizeProvider store={ store }>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </LocalizeProvider>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
