import React from 'react';
import './App.css';
import Site from './pages/Site';

import {
  BrowserRouter as Router,
} from 'react-router-dom';

function App () {
  return (
    <Router>
      <Site />
    </Router>
  );
}

export default App;
