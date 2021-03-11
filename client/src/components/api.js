import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:5000/api/",
  withCredentials: false,
});

/* GET ----------------------------------------------- */
// Gibt alle User aus
const getUsers = () => {

  api.get(`/users`)
   .then(res => {                                   
    let users = res.data;
    return users
  }) 

}

// Gibt User mit Parameter :id aus
const getUser = (id) => {

  api.get(`/users/${id}`)
   .then(res => {                                    
    let user = res.data;
    return user
  }) 

}

// Gibt alle Karten einer Session aus
const getCards = (sessionid) => {

  api.get(`/cards/${sessionid}`)
   .then(res => {                                    
    let cards = res.data;
    return cards
  }) 

}

// Gibt die letzten drei Sessions aus
const getLastThreeSessions = () => {

  api.get(`/sessions`)
   .then(res => {                                    
    let sessions = res.data;
    return sessions
  },
  (error) => {
    console.log('Error getting last three sessions')
  }) 

}

/* POST ----------------------------------------------- */

/*  Legt einen Benutzer an unter Angabe folgender Daten:
*   {userid: , username: , sessionid:}
*   @param user => JSON mit userdata
*/
const addUser = (user) => {

  api.post(`/users`, user)
   .then(res => {                                    
    return res.status;
  }) 

}

/*  Legt eine Session an unter Angabe folgender Daten:
*   {sessionid: , topic:}
*   @param session => JSON mit session data
*/
const addSession = (session) => {

  api.post(`/users`, session)
   .then(res => {                                    
    return res.status;
  }) 

}

/*  Legt eine Karte(Vorschlag) an unter Angabe folgender Daten:
*   {subject: , description: , sessionid}
*   @param card => JSON mit card data
*/
const addCard = (card) => {

  api.post(`/users`, card)
   .then(res => {                                    
    return res.statusText;
  }) 

}

/* DELETE ----------------------------------------------- */

export default api;
exports = { getUsers,  getUser, getCards, getLastThreeSessions, addUser, addSession, addCard }