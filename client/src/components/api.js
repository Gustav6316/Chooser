import axios from 'axios';

export const api = axios.create({
  baseURL: "http://localhost:5000/api/",
  withCredentials: false,
});

/* GET ----------------------------------------------- */
// Gibt alle User aus
export const getUsers = () => {

  api.get(`/users`)
   .then(res => {                                   
    let users = res.data;
    return res.data;
  }) 

}

// Gibt User mit Parameter :id aus
export const getUser = (id) => {

  api.get(`/users/${id}`)
   .then(res => {                                    
    let user = res.data;
    return user
  }) 

}

// Gibt alle Karten einer Session aus
export const getCards = (sessionid) => {

  api.get(`/cards/${sessionid}`)
   .then(res => {                                    
    let cards = res.data;
    return cards
  }) 

}

// Gibt die letzten drei Sessions aus
export const getLastThreeSessions = () => {

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
export const addUser = (user) => {

  api.post(`/users`, user)
   .then(res => {                                    
    return res.status;
  }) 

}

/*  Legt eine Session an unter Angabe folgender Daten:
*   {sessionid: , topic:}
*   @param session => JSON mit session data
*/
export const addSession = (session) => {

  api.post(`/users`, session)
   .then(res => {                                    
    return res.status;
  }) 

}

/*  Legt eine Karte(Vorschlag) an unter Angabe folgender Daten:
*   {subject: , description: , sessionid}
*   @param card => JSON mit card data
*/
export const addCard = (card) => {

  api.post(`/users`, card)
   .then(res => {                                    
    return res.statusText;
  }) 

}
 // export const getUserData = () => {
 //
 //   api.get('/users')
 //    .then(res => {                                     //promise
 //     let users = res.data;
 //     setUsers(users);                                  // update State
 //   })
 //
 // }

/* DELETE ----------------------------------------------- */

export default api;
//exports = { getUsers,  getUser, getCards, getLastThreeSessions, addUser, addSession, addCard }