import axios from 'axios';


export const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: false,
});

const returnError = (err) => {
  console.log(err.message);
  return err;
}

export const testInterceptor = () => {
  axios.get('https://httpbin.org/status/404')
    .then(res => { return res.status })
    .catch(err => returnError(err))
}

/* GET ----------------------------------------------- */
// Gibt alle User aus
export const getUsers = () => {

  api.get(`/users`)
   .then(res => {
    return res.data;
  }) 
  .catch(err => returnError(err))
}

// Gibt User mit Parameter :id aus
export const getUser = (id) => {

  api.get(`/users/${id}`)
   .then(res => {                                    
    let user = res.data;
    return user
  }) 
  .catch(err => returnError(err))
}

// Gibt alle Karten einer Session aus
export const getCards = (sessionid) => {
  api.get(`/cards/${sessionid}`)
   .then(res => {
    console.log(res.data)                                   
    return res.data;
  })
  .catch(err => returnError(err))
}

//  Gibt den Gewinner aus
export const getWinner = (sessionid) => {
  api.get(`/winner/${sessionid}`)
  .then(res => {
    let data = res.data
    console.log(res.data)
    return data;
  })
  .catch(err => returnError(err))
}

//  Gibt die Top 3 aus
export const getWinners = (sessionid) => {
  api.get(`/winners/${sessionid}`)
  .then(res => {
    console.log(res.data)
    return res.data;
  })
  .catch(err => returnError(err))
}

//  Gibt die letzten 3 Sessions aus
export const getLastThreeSessions = async () => {

  api.get(`/sessions`)
   .then(res => {
     let data = res.data;                               
    return data;
  },
  (error) => {
    console.log('Error getting last three sessions');
    console.log(error);
    return;
  }) 

}
//  Prüft ob Session bereits existiert, wenn ja @returns 200 wenn nein, dann 404
export const checkIfSessionExists = (sessionid) => {
  api.get(`/sessions/${sessionid}`)
   .then(res => {                                 
    if (res.status === 200) return true;
    else return false;
  })
  .catch(err => returnError(err))
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
  .catch(err => returnError(err))
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
  .catch(err => returnError(err))
}

/*  Legt eine Karte(Vorschlag) an unter Angabe folgender Daten:
*   {subject: , description: , sessionid:}
*   @param card => JSON mit card data
*/
export const addCard = (card) => {
  api.post(`/cards`, card)
   .then(res => {                                    
    return res.statusText;
  })
  .catch(err => returnError(err))
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
  })
  .catch(err => returnError(err))
}

/* PATCH  ----------------------------------------------- */

/*  Sendet ein PATCH-Request an die API
*   Erhöht den Score um die angegebene Höhe
*   Erwarteter Request-Body: {sessionid: , subject:, score:}
*/
export const updateScore = (cardData) => {
  api.patch(`/cards`, cardData)
   .then(res => {                                    
    return res.status;
  })
  .catch(err => returnError(err))
}

export default api;