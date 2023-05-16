import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import './utilities.css';
import App from './App';
import DrawerContextProvider from 'context/DrawerContext';
import "react-datepicker/dist/react-datepicker.css";

import 'react-toastify/dist/ReactToastify.css';

import { Provider } from 'react-redux';
import store from 'redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store} >
            <DrawerContextProvider>
                <App />
            </DrawerContextProvider>
        </Provider>
    </React.StrictMode>
);

