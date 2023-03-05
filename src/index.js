import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import ContextProvider from './context';

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

root.render(
    <BrowserRouter>
        <ContextProvider>
            <App />
        </ContextProvider>

    </BrowserRouter>
);

// instead of wrapping <App /> inside all contextProviders
// we created a file in context/index.js and ContextProvider is coming from context?index.js
// we wrapped everything inside contextProviders.js and we wrapped <App /> inside it