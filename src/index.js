import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

require('dotenv').config();

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
