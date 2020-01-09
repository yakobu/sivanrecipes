import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'

import store from './store'
import App from './containers/App';
import './index.css';



import {
    isPushNotificationSupported,
    sendNotification,
    initializePushNotifications,
    registerServiceWorker
} from "./push-notifications.js";
//
const pushNotificationSuported = isPushNotificationSupported();
if (pushNotificationSuported) {
    registerServiceWorker();
    initializePushNotifications().then(function(consent){
        if(consent === 'granted') {
            sendNotification();
        }
    });
}

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);



ReactDOM.render(app,
    document.getElementById('root'));
