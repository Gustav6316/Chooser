const { Pool } = require('pg')

const pool = new Pool({
    user: 'pgadmin',
    host: '212.227.192.158',
    database: 'chooserdb',
    password: 'h&!0eTA2l',
    port: '5432'
})
//const sql = postgres('postgres://dbadmin:h&!0eTA2l@212.227.192.158:5432/chooserdb');

const getUsers = (req, res) => {

    pool.query('SELECT * FROM test.users', (err, results) => {
        if (err) {
          throw err
        }
          res.status(200).json(results.rows)
      })
    }

const getUsersByID = (req, res) => {
    let id = parseInt(req.params.id)

    pool.query('SELECT * FROM test.users WHERE userid=$1', [id], (err, results) => {
        if (err) throw err;
        
        if (results.rowCount === 0) {
            res.status(404)
            res.send(`Kein User unter ID:${id} zu finden`)
            return
        }
          res.status(200).json(results.rows)
      })
    }    

const createUser = (req, res) => {
    console.log(req.body);

    if (req.body === undefined) {
        res.status(400).send('BAD SYNTAX: No user specified')
        return
    }
    else if (req.body.id === undefined) {
        res.status(400).send('BAD SYNTAX: No ID specified')
        return
    }
    else if (req.body.name === undefined) {
        res.status(400).send('BAD SYNTAX: No name specified')
        return
    }
    console.log(req.body.id)
    console.log(req.body.name)
    pool.query('INSERT INTO test.users(userid, username) VALUES($1, $2)', [req.body.id, req.body.name], (err, results) =>{
        if (err) {
            throw err
        }

        res.status(201).send(`User added with ID:${req.body.id} and name:${req.body.name}`)
    })
}

exports.getUsers = getUsers;
exports.getUsersByID = getUsersByID;
exports.createUser = createUser;