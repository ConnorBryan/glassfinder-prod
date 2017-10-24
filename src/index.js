import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';

/* Redux */
import configureStore from './store/configureStore';
import Root from './containers/Root/Root';

const store = configureStore();
/*       */

const Everything = () => (
  <Root store={store}>
    <Router>
      <App />
    </Router>
  </Root>
);

ReactDOM.render(<Everything />, document.getElementById('root'));
