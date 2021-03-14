const { Pool } = require('pg')

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
*/
function checkIfEmpty (req, res) {

    console.log('checking');
    console.log(req.body);
    console.log(Object.keys(req.body).length)
    if (Object.keys(req.body).length === 0) {
        res.status(400).send(`ERROR: Empty request body`);
        return true;
    }

    return false;
}

function checkWinner (req, res, results, err) {
    if (results.rowCount === 0 || results.rows[0].score === 0) {
        res.status(200).send(`No winner for Session ${req.params.sessionid}`)
        return false;
    }
    if (err) {
        console.error(err);
        res.status(404).send(`Could not find session with ID: ${req.params.sessionid}`);
        return false;
    }
    return true;
}
//const sql = postgres('postgres://dbadmin:h&!0eTA2l@212.227.192.158:5432/chooserdb');

// Gibt alle User aus
const getUsers = (req, res) => {

    pool.query('SELECT * FROM public.users', (err, results) => {
        if (err) {
          console.error(err);
          res.status(400).send('SQL ERROR');
          return;
        }

        if (results.rowCount === 0) {
            res.status(404).send('No Users found');
            return;
        }
          res.status(200).json(results.rows);
      })
    }

/*  Gibt User mit der weitergegebenen ID aus.
*   Wenn dieser nicht zu finden ist, wird ein Fehler ausgegeben.
*/
const getUsersByID = (req, res) => {
    let id = parseInt(req.params.id);

    pool.query('SELECT * FROM public.users WHERE userid=$1', [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(400).send('SQL ERROR');
            return;
        }
        
        if (results.rowCount === 0) {
            res.status(404).send(`Kein User unter ID:${id} zu finden`)
            return;
        }
          res.status(200).json(results.rows);
      })
    }   

/* Gibt alle User aus und prüft die Syntax des requests.
*  Sendet bei falscher Syntax einen Fehlercode und eine passende Nachricht.
*/

const createUser = (req, res) => {

    if (checkIfEmpty(req, res)) return;

    pool.query('INSERT INTO public.users(userid, username, sessionid) VALUES($1, $2)', [req.body.userid, req.body.username, req.body.sessionid], (err, results) => {
        if (err) {
            console.error(err);
            res.status(400).send(`User ${req.body.name} with ID ${req.body.id} could not be added`);
            return;
        }

        res.status(201).send(`User added with ID:${req.body.id} and name:${req.body.name}`);
    })
}

const getWinners = (req, res) => {
    pool.query('SELECT * from public.cards WHERE sessionid = $1 ORDER BY score DESC LIMIT 3', [req.params.sessionid], (err, results) => {
        if (checkWinner(req, res, results, err)) {
            res.status(200).json(results.rows);
        }

        return;
    });
}

const getWinner = (req, res) => {
    pool.query('SELECT * from public.cards WHERE sessionid = $1 ORDER BY score DESC LIMIT 1', [req.params.sessionid], (err, results) => {

        if (checkWinner(req, res, results, err)) {
            res.status(200).json(results.rows);
        }

        return;
    });
}


/* Gibt die letzten drei Sessions aus 
*/
const getLastThreeSessions = (req, res) => {

    pool.query('SELECT * FROM public.sessions ORDER BY created DESC LIMIT 3', (err, results) => {
        if (err) {
            console.error(err);
            res.status(400).send('SQL ERROR');
            return;
        }

        if (results.rowCount === 0) {
            res.status(404).send(`Could not get last 3 Sessions`);
            return;
        }
          res.status(200).json(results.rows);
      })
    }

/* Erstellt eine Session unter Angabe von sessionid und topic */
const createSession = (req, res) => {

    if (checkIfEmpty(req, res)) return;

    if (req.body.sessionid === undefined || req.body.topic === undefined) {   //wird noch ausgelagert
    res.status(400).send('ERROR: Bad Request');
    return;
    }

    pool.query('INSERT INTO public.sessions(sessionid, topic) VALUES($1, $2)', [req.body.sessionid, req.body.topic], (err, results) => {
        if (err) {
            console.error(err);
            res.status(400).send('SQL ERROR');
            return;
        }

        res.status(201).send(`Session: ${req.body.sessionid} added successfully`);
    });
}

/*  Gibt alle Karten einer bestimmten Session zurück
*   localhost:5000/api/cards/ID => JSON Objekte oder Error code 400
*/
const getCards = (req, res) => {
    pool.query('SELECT * FROM public.cards WHERE sessionid = $1', [req.params.sessionid], (err, results) => {
        if (err) {
            console.error(err);
            res.status(400).send('SQL ERROR');
            return;
        }

        if (results.rowCount === 0) {
            res.status(400).send(`Session ${req.params.sessionid} has no Cards yet or does not exist`);
            return;
        }
        res.status(200).json(results.rows);
    });
}

/*  Fügt ein komplettes Kartendeck bestehen aus JSON-Elementen in die Datenbank ein
*   @param req, res => request und response an die API
*   @return code 200 und String OK bei Erfolg andernfalls code 400 oder 404
*/  
const addCard = (req, res) => {

    if (checkIfEmpty(req, res)) return;

    console.log(req.body);

    pool.query('INSERT INTO public.cards(subject, description, sessionid) VALUES($1, $2, $3)', [req.body.subject, req.body.description, req.body.sessionid], (err, results) => {
        if (err) {
            console.error(err);
            res.status(400).send('SQL ERROR');
            return;
        }

        res.status(200).send('OK');
    });
}

/*  Löscht eine Session und alle dazugehörigen User und Karten
*   @param req, res => request und response an die API
*   Erwarteter Request-Parameter: sessionid
*   @return code 200 und String OK bei Erfolg andernfalls code 400 oder 404
*/
const deleteSession = (req, res) => {

    let sessionid = parseInt(req.params.sessionid);

    pool.query('DELETE from public.sessions WHERE sessionid=$1;', [sessionid], (err, results) => {
        if (err) {
            console.error(err);
            res.status(400).send('SQL ERROR');
            return;
        }
        
          res.status(200).send('OK');
      })
    }

/*  Addiert Punktzahl auf die bestehende Karte
*   @param req, res => request und response an die API
*   Erwarteter Request-Body: {sessionid: , subject: , score:}
*   @return code 200 und String OK bei Erfolg andernfalls code 400 oder 404
*/
const updateScore = (req, res) => {

    if (checkIfEmpty(req, res)) return;

    pool.query('update public.cards set score=score + $1 where sessionid=$2 and subject=$3;', [req.body.score, req.body.sessionid, req.body.subject], (err, results) => {
        if (err) {
            console.error(err);
            res.status(400).send('SQL ERROR');
            return;
        }
        
            res.status(200).send('OK');
        })
    }

const getSessionIfExists = (req, res) => {

    pool.query('SELECT * from public.sessions where sessionid=$1;', [req.params.sessionid], (err, results) => {
        if (err) {
            console.error(err);
            res.status(400).send('SQL ERROR');
            return;
        }

        if (results.rowCount === 0) {
            res.status(404).send('Session not found');
            return;
        }

        res.status(200).send('OK');

    })
}

module.exports = { getUsers, getUsersByID, createUser, getLastThreeSessions,
        addCard, createSession, getCards, deleteSession, updateScore, getWinner, getWinners, getSessionIfExists }