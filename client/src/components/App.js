//import React, { useState } from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Lobby from "./Lobby/Lobby";
import Login from "./Login/Login";
import Choosing from "./Choosing/choosing";
import Rating from "./Rating/Rating";

const App = () => (
    <Router>
        <Route path="/" exact component={Login}/>
        <Route path="/lobby" component={Lobby}/>
        <Route path="/choosing" component={Choosing}/>
        <Route path="/results" component ={Rating}/>
    </Router>
);

export default App;
