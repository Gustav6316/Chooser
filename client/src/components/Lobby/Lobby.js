import io from "socket.io-client";
import "bootstrap/dist/css/bootstrap.css";
import React, {useEffect, useState} from "react";
import queryString from 'query-string';
import './Lobby.css';
import reducer from './reducer';

import api, {addCard} from '../api';
import {Button} from "react-bootstrap";
import Userlist from "./Userlist";


let socket;

// Test
/* const api = axios.create({
  baseURL: "http://localhost:5000/api/",
  withCredentials: false,
}); */

const Lobby = ({location}) => {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const ENDPOINT = 'http://localhost:4000';

    /*  Schickt GET and an die API/users und gibt ein JSON Array aus.
    *   Wird unten in Zeile 91 in einem Button zum testen abgerufen
    */
    const getUserData = () => {

        api.get('/users')
            .then(res => {                                     //promise

                setUsers(res.data);                                  // update State
            })

    }


    useEffect(() => {
        const {username, room} = queryString.parse(location.search);

        socket = io(ENDPOINT, {transports: ['websocket', 'polling', 'flashsocket']});

        setUsername(username);
        setRoom(room);

        socket.emit('join', {username, room}, () => {
        });

    }, [ENDPOINT, location.search]);


    // Fängt roomData Event ab und übergibt die User and useState();

    useEffect(() => {
        socket.on('roomData', ({users}) => {
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
    const addCardBtn = () => {// Add cars button
        let suggestion = document.getElementById('btn1').value;
        if (!suggestion) {
          alert("Please enter some suggestion!");
          return;
        }// wenn das Feld leer ist, wird returned
        addCard({subject: suggestion, description: "test desc", sessionid: 'test'});
    }
//HTML für die Lobby
    return (
        <div>

            <div className="container float-left">
                <h1 className="align-center">Lobby</h1>
                <ul className="list-group" id="elementList">
                    <input id='btn1' class="list-group-item" type='text' placeholder="Write your first Suggestion!"/>
                    <button onClick={addCardBtn} type="submit">Submit</button>
                    <input id='btn1' className="list-group-item" type='text'
                           placeholder="Write your second Suggestion!"/>
                    <button onClick={addCardBtn} type="submit">Submit</button>
                    <input id='btn1' className="list-group-item" type='text'
                           placeholder="Write your third Suggestion!"/>
                    <button onClick={addCardBtn} type="submit">Submit</button>
                </ul>

            </div>

            <Userlist users={users}/>

            <Button variant='warning' onClick={getUserData}>Get User Data now!</Button>

            {/*{!state.joined ? (// das sollte eig in die App.js gehen, aber erst Mal hier zum Testen*/}
            {/*    <Choosing toTheLobby={toTheLobby}/>*/}
            {/*) : (*/}
            {/*    <Rating data={data} />*/}
            {/*)}*/}
        </div>
        // <div className='body'>
        //
        //
        //   <div className="container mx-auto text-center">
        //     <br/>
        //     <h1>Chooser</h1>
        //   </div>
        //
        //   <form action="" method="get">
        //
        //     <div className="container">
        //       <div className="row">
        //         <div className="col-sm-4 text-center">
        //
        //
        //           <div className="list">
        //
        //             <ul className="Sessions mx-auto ">
        //               <h4>Suggestions</h4>
        //
        //               <br/>
        //
        //               <ul className="list-group mx-auto ">
        //                 <li className="list-group-item">First item</li>
        //                 <li className="list-group-item">Second item</li>
        //                 <li className="list-group-item">Third item</li>
        //               </ul>
        //             </ul>
        //
        //             <br/>
        //
        //             <select name="Modes" multiple size="1">
        //               <option value="Modes">Modes (optional)</option>
        //               <option value="Modus1">Modus1</option>
        //               <option value="Modus2">Modus2</option>
        //             </select>
        //
        //
        //             <input type="submit" name="btn" value="Add Topic" className="btn"/>
        //
        //
        //             <input type="submit" name="btn" value="Start Game" className="btn"/>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //
        //
        //   </form>
        //
        //
        //   <div className="col-sm-1 mx-auto">
        //
        //   </div>
        //
        //
        //   <div className="participants col-sm-3 mx-auto ">
        //
        //     <ul>
        //       <h1>Participants</h1>
        //       <h4>
        //         <li>First Member</li>
        //       </h4>
        //       <h4>
        //         <li>First Member</li>
        //       </h4>
        //       <h4>
        //         <li>First Member</li>
        //       </h4>
        //     </ul>
        //   </div>
        // </div>
    )
};

export default Lobby;