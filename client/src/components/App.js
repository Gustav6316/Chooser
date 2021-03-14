//import React, { useState } from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';


import Lobby from "./Lobby/Lobby";
import Login from "./Login/Login";
import Choosing from "./Choosing/Choosing";
import Rating from "./Rating/Rating";
import {renderEntireTree} from "../index";
const room = [];
const setROOM=(props) => {
    room[0] = props;
    console.log(room[0]);

}

const App = () => (

    <Router>
        <Route path="/" exact render={() => <Login setROOM={setROOM} />}/>
        <Route path="/lobby" component={Lobby}/>
        <Route path="/choosing" render={()=> <Choosing room={'km9givo9'}/>}/>
        <Route path="/results" render={()=> <Rating room={'test'}/>}/>
    </Router>
);


export default App;
