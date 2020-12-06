import React from 'react';
import ReactDOM from 'react-dom';
import { ModalProvider } from "react-modal-hook";
import './index.scss';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

//browser Route 

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
      <App />
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
