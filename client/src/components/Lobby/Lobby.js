import io from "socket.io-client";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import queryString from 'query-string';
import React from "react";
import { Container, Button } from "react-bootstrap";
import './Lobby.css'
import Userlist from './Userlist'
import reducer from './reducer';
import Choosing from "../Choosing/Choosing";
import Rating from "../Rating/Rating";

import api, {getUsers,  getUser, getCards, getLastThreeSessions, addUser, addSession, addCard} from '../api';
import {Link} from "react-router-dom";



let socket;

const Lobby = ({ location }) => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [inviteLink, setInviteLink] = useState(`localhost:3000/?room=`);
  const ENDPOINT = 'http://localhost:4000';

  useEffect(() => {
    const { username, room } = queryString.parse(location.search);


    socket = io(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });

    setUsername(username);
    setRoom(room);
    setInviteLink(`localhost:3000/?room=${room}`)
    socket.emit('join', { username, room }, () => {
    });

  }, [ENDPOINT, location.search]);




  // Fängt roomData Event ab und übergibt die User and useState();

  useEffect(() => {
    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
}, []);


    const toTheLobby = (props) => {//hier werden die Daten von Chosing process empfangen
        //nun sollen sie hier auch addiert werden und weiter an Rating.jsx angegeben
        dispatch({
            type: 'JOINED',// das switched die Seiten sobald beim choosing alle Filme durch sind
        });
    }

    const [state, dispatch] = React.useReducer(reducer, {// zum Switchen da
        joined: false,
    });
    const addCardBtn1 = () => {// Add cars button
        let suggestion = document.getElementById('btn1').value;
        if (!suggestion) {
          alert("Please enter some suggestion!");
          return;
        }// wenn das Feld leer ist, wird returned
        addCard({subject: suggestion, description: "test desc", sessionid: 'test'});
        document.getElementById('button1').hidden = true;
    }
    const addCardBtn2 = () => {// Add cars button
        let suggestion = document.getElementById('btn2').value;
        if (!suggestion) {
          alert("Please enter some suggestion!");
          return;
        }// wenn das Feld leer ist, wird returned
        addCard({subject: suggestion, description: "test desc", sessionid: 'test'});
        document.getElementById('button2').hidden = true;
    }
    const addCardBtn3 = () => {// Add cars button
        let suggestion = document.getElementById('btn3').value;
        if (!suggestion) {
          alert("Please enter some suggestion!");
          return;
        }// wenn das Feld leer ist, wird returned
        addCard({subject: suggestion, description: "test desc", sessionid: 'test'});
       // document.getElementById('btn3').value = '';
        document.getElementById('button3').hidden = true;
    }

//HTML für die Lobby
  return (
    <div>

           <div className="container float-left">
               <h1 className="align-center">Lobby{room}</h1>
               <ul className="list-group" id="elementList">

                   <input id='btn1' className="list-group-item" type='text'
                          placeholder="Write your first Suggestion!"/>
                   <button id='button1' onClick={addCardBtn1} type="submit">Submit</button>
                   <input id='btn2' className="list-group-item" type='text'
                          placeholder="Write your second Suggestion!"/>
                   <button id='button2' onClick={addCardBtn2}  type="submit">Submit</button>
                   <input id='btn3' className="list-group-item" type='text'
                          placeholder="Write your third Suggestion!"/>
                   <button id='button3' onClick={addCardBtn3} type="submit">Submit</button>
                   <Link  to={`/choosing`}>
                       <button className='btnForNextPage' type="submit" >Start Choosing</button>
                   </Link>
                </ul>
               <div className="container float-left">
                   {(inviteLink===undefined) ? <h5>loading...</h5> : <h8>{inviteLink}</h8>}
               </div>
           </div>

    {<Userlist users={ users }/>}


      {/*{!state.joined ? (// das sollte eig in die App.js gehen, aber erst Mal hier zum Testen*/}
      {/*    <Choosing room={roomTest} toTheLobby={toTheLobby}/>*/}
      {/*) : (*/}
      {/*    <Rating />*/}
      {/*)}*/}
    </div>
  )
};

export default Lobby;