//import React, { useState } from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';


import Lobby from "./Lobby/Lobby";
import Login from "./Login/Login";
import Choosing from "./Choosing/Choosing";
import Rating from "./Rating/Rating";
import {useState} from "react";


const App = () => (
    <Router>
        <Route path="/" exact component={Login}/>
        <Route path="/lobby" render={()=><Lobby location />} />
            <Route path="/choosing" component={Choosing}/>
            <Route path="/results" component={Rating} />
    </Router>
);


export default App;
