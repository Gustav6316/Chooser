import axios from 'axios';

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: false,
});

/* GET ----------------------------------------------- */
// Gibt alle User aus
export const getUsers = () => {

  api.get(`/users`)
   .then(res => {
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
    console.log(res.data)                                   
    return res.data;
  });

}

// Gibt die letzten drei Sessions aus
export const getLastThreeSessions = () => {

  api.get(`/sessions`)
   .then(res => {                                    
    let sessions = res.data;
    return sessions
  },
  (error) => {
    console.log('Error getting last three sessions');
    return 'Sorry, something went wrong'
  }) 

}

/* POST   ----------------------------------------------- */

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

  api.post(`/sessions`, session)
   .then(res => {                                    
    return res.status;
  }) 

}

/*  Legt eine Karte(Vorschlag) an unter Angabe folgender Daten:
*   {subject: , description: , sessionid:}
*   @param card => JSON mit card data
*/
export const addCard = (card) => {
  api.post(`/cards`, card)
   .then(res => {                                    
    return res.statusText;
  });

}

/*  Pusht alle Karten eines JSON-Arrays in die Datenbank
*   @param JSON-Array mit Karten Format: {subject: , description: , sessionid:}
*/
export const pushDeck = (deck) => {

  for (let index = 0; index < deck.length; index++) {
    addCard(deck[index]);
  }

}

/* DELETE ----------------------------------------------- */

/*  Sendet ein DELETE-Request an die API
*   Löscht eine Session, dessen User und Karten unter Angabe der Sessionid
*   @param
*/
export const deleteSession = (sessionid) => {
  api.delete(`/sessions/${sessionid}`)
   .then(res => {                                    
    return res.status;
  });
}

/* PATCH  ----------------------------------------------- */

/*  Sendet ein PATCH-Request an die API
*   Erhöht den Score um die angegebene Höhe
*   Erwarteter Request-Body: {sessionid: , subject:, score:}
*/
export const updateScore = (cardData) => {
  api.delete(`/sessions`, cardData)
   .then(res => {                                    
    return res.status;
  });
}

export default api;