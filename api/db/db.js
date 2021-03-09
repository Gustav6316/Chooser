const { Pool } = require('pg')
const format = require('pg-format');

// Nutzerdaten für die Datenbank und erstellung eines connection-Pools
const pool = new Pool({
    user: 'pgadmin',
    host: '212.227.192.158',
    database: 'chooserdb',
    password: 'h&!0eTA2l',
    port: '5432'
})

/*  Prüft nach Syntaxfehlern
*   @param req => Übermittelte request
*   @param dataToCheck => Daten die geprüft werden sollen
*/
function handleSyntaxErrors (req, dataToCheck) {
    
    if (req.body === undefined) {
        res.status(400).send(`ERROR: Empty request body`);
        return false;

    } else if (req.body.dataToCheck === undefined) {
        res.status(404).send(`ERROR: No ${dataToCheck} specified`);
        return false;
    } 

    return true;
}

function toInsertableArray (jsonArray) {
    
    let newArray = [];

    for (let index = 0; index < jsonArray.length; index++) {
        const temp = [];

        temp.push(jsonArray[index].subject);
        temp.push(jsonArray[index].description);
        temp.push(jsonArray[index].sessionid);

        newArray.push(temp);
    }

    return newArray;
}

//const sql = postgres('postgres://dbadmin:h&!0eTA2l@212.227.192.158:5432/chooserdb');

// Gibt alle User aus
const getUsers = (req, res) => {

    pool.query('SELECT * FROM test.users', (err, results) => {
        if (err) {
          throw err
        }

        if (results.rowCount === 0) {
            res.status(404);
            res.send(`Es wurden keine User gefunden`);
            return;
        }
          res.status(200).json(results.rows);
      })
    }

/*  Gibt Use mit der weitergegebenen ID aus.
*   Wenn dieser nicht zu finden ist, wird ein Fehler ausgegeben.
*/
const getUsersByID = (req, res) => {
    let id = parseInt(req.params.id);

    pool.query('SELECT * FROM test.users WHERE userid=$1', [id], (err, results) => {
        if (err) throw err;
        
        if (results.rowCount === 0) {
            res.status(404)
            res.send(`Kein User unter ID:${id} zu finden`)
            return;
        }
          res.status(200).json(results.rows);
      })
    }   

/* Gibt alle User aus und prüft die Syntax des requests.
*  Sendet bei falscher Syntax einen Fehlercode und eine passende Nachricht.
*/
const createUser = (req, res) => {
    console.log(req.body);

/*     if (req.body === undefined) {
        res.status(400).send('BAD SYNTAX: No user specified');
        return;
    }
    else if (req.body.id === undefined) {
        res.status(400).send('BAD SYNTAX: No ID specified');
        return;
    }
    else if (req.body.name === undefined) {
        res.status(400).send('BAD SYNTAX: No name specified');
        return;
    } */

    console.log(req.body.id);
    console.log(req.body.name);

    pool.query('INSERT INTO test.users(userid, username) VALUES($1, $2)', [req.body.id, req.body.name], (err, results) => {
        if (err) {
            throw err;
            res.status(400).send(`User ${req.body.name} with ID ${req.body.id} could not be added`);
            return;
        }

        res.status(201).send(`User added with ID:${req.body.id} and name:${req.body.name}`);
    })
}

const getSessionData = (req, res) => {
    pool.query('SELECT $1 FROM public.sessions', [req.body.sessionID], (err, results) => {
        if (err) {
            throw err;
            res.status(404).send(`Could not find session with ID: ${req.body.sessionID}`);
            return;
        }

        res.status(200).json(results.rows);
    });
}

/* Gibt die letzten drei Sessions aus 
*/
const getLastThreeSessions = (req, res) => {

    pool.query('SELECT * FROM public.sessions ORDER BY created DESC LIMIT 3', (err, results) => {
        if (err) throw err; 

        if (results.rowCount === 0) {
            res.status(404).send(`Could not get last 3 Sessions`);
            return;
        }
          res.status(200).json(results.rows);
      })
    }

/* Erstellt eine Session unter Angabe von sessionid und topic */
const createSession = (req, res) => {

    console.log(req.body.sessionid);
        if (req.body === undefined) {   //wird noch ausgelagert
        res.status(400).send('ERROR: Bad Request');
        return;
    }

    pool.query('INSERT INTO public.sessions(sessionid, topic) VALUES($1, $2)', [req.body.sessionid, req.body.topic], (err, results) => {
        if (err) throw err;

        res.status(200).send(`Session: ${req.body.sessionid} added successfully`);
    });
}

/*  Fügt ein komplettes Kartendeck bestehen aus JSON-Elementen in die Datenbank ein
*   Momentan werden nur Dummy-Werte eingesetzt
*   @param req, res => request und response an die API
*   @return code 200 und String OK bei Erfolg andernfalls code 400 oder 404
*/  
const addCardDeck = (req, res) => {

const objects = [
  {
      subject: 'The Dictator',
      description: 'Comedy Movie',
      sessionid: 'q4WrzX',
  },
  {
      subject: 'Avengers: Endgame',
      description: 'Action Movie',
      sessionid: 'u7j98W',
  },
  {
      subject: 'Avengers: Infinity War',
      description: 'Another Avengers movie',
      sessionid: 'uSk67y'
  }
]

console.log(toInsertableArray(objects));


    const sql = format('INSERT INTO public.cards(subject, description, sessionid) VALUES %L', toInsertableArray(objects));


    pool.query(sql, (err, results) => {
        if (err) throw err;

        //if (!handleSyntaxErrors(req, id)) return;

        res.status(200).send('OK');
    });
}

module.exports = {getUsers, getUsersByID, createUser, getLastThreeSessions, addCardDeck, createSession}