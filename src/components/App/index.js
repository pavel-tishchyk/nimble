import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store'
import Trackers from '../Trackers';

const App = () => (
  <Provider store={store}>
    <Trackers/>
  </Provider>
);

export default App;
