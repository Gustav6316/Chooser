//import React, { useState } from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Lobby from "./Lobby";
import Login from "./Login";

import {Socket} from 'socket.io-client'

const App = () => (
  <Router>
    <Route path="/" exact component={Login} />
    <Route path="/lobby" component={Lobby} />
  </Router>
);

export default App;
