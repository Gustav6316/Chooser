import io from "socket.io-client";

import "bootstrap/dist/css/bootstrap.css";
import React, {useEffect, useState} from "react";
import queryString from 'query-string';
import './Lobby.css'

import {addCard} from '../api';
import {Link} from "react-router-dom";


let socket;

const Lobby = ({location}) => {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [inviteLink, setInviteLink] = useState(`localhost:3000/?room=`);
    const ENDPOINT = 'http://localhost:4000';

    useEffect(() => {
        const {username, room} = queryString.parse(location.search);


        socket = io(ENDPOINT, {transports: ['websocket', 'polling', 'flashsocket']});

        setUsername(username);
        setRoom(room);
        setInviteLink(`localhost:3000/?room=${room}`)
        socket.emit('join', {username, room}, () => {
        });

    }, [ENDPOINT, location.search]);


    // Fängt roomData Event ab und übergibt die User and useState();

    useEffect(() => {
        socket.on('roomData', ({users}) => {
            setUsers(users);
        });
    }, []);

    const addCardBtn1 = () => {// Add cars button
        let suggestion = document.getElementById('btn1').value;
        if (!suggestion) {
            alert("Please enter some suggestion!");
            return;
        }// wenn das Feld leer ist, wird returned
        addCard({subject: suggestion, description: "test desc", sessionid: 'test'});
        // document.getElementById('button1').hidden = true;
        document.getElementById('btn1').value = '';
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

    let Copy = () => {
        let Url = document.getElementById("url");
        Url.innerHTML = inviteLink;

        Url.select();
        document.execCommand("copy");
    }
    function myFunction() {
        /* Get the text field */
        var copyText = document.getElementById("myInput");

        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        document.execCommand("copy");

        /* Alert the copied text */
        alert("Copied the text: " + copyText.value);
    }
//HTML für die Lobby
    return (
        <div className='main'>

            <div className="container float-left">
                <h5 className="align-center">Lobby id: {room} <br/> Your name: {username}</h5>
                <ul className="list-group" id="elementList">

                    <input id='btn1' className="list-group-item" type='text'
                           placeholder="Write your first Suggestion!"/>
                    <button id='button1' onClick={addCardBtn1} type="submit">Submit</button>
                    <input id='btn2' className="list-group-item" type='text'
                           placeholder="Write your second Suggestion!"/>
                    <button id='button2' onClick={addCardBtn2} type="submit">Submit</button>
                    <input id='btn3' className="list-group-item" type='text'
                           placeholder="Write your third Suggestion!"/>
                    <button id='button3' onClick={addCardBtn3} type="submit">Submit</button>
                    <div>
                         <Link to={`/choosing`}>
                            <button className='btnForNextPage' type="submit">Start Choosing</button>
                        </Link>
                    </div>
                </ul>

            </div>

            {/*{<Userlist users={ users }/>}*/}
            {/*    {(inviteLink===undefined) ? <h5>loading...</h5> : <h8>{inviteLink}</h8>}*/}
            <div>Current users online: {users.length}</div>

            <div className="container float-left">
                <button id='btnInvite' type="button" onClick={Copy}>Invite friends</button>

                <input value={inviteLink} id="url" />
            </div>


        </div>
)
};

export default Lobby;