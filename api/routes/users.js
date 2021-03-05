var express = require('express');
var router = express.Router();
const db = require('../api/db');

const users = [
  {
      id: 1,
      name: 'Ubembe Osas',
      age: '23',
  },
  {
      id: 2,
      name: 'Jonas Möller',
      age: '20',
  },
  {
      id: 3,
      name: 'Marko Zwiebelsuppe',
      age: '21'
  }
]

/* GET users listing. */
/*router.get('/users', function(req, res, next) {
  res.send(db.getUsers(req, res));
  next();
});
*/

router.get('/users', db.getUsers);

/*router.get('/users/:id', function(req, res, next) {
  let user = users.find( u => u.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).send(`User mit der ID ${req.params.id} nicht gefunden`);
    return;
  }
  res.send(user);
  next();
});
*/

router.get('/users/:id', db.getUsersByID)

/*router.post('/users', (req, res) => {
if (!req.body.name || !req.body.age) {
  res.status(400);
  res.send('Name oder Alter fehlt');
  return;
} else if (req.body.name.length < 3){
  res.status(400);
  res.send('Name zu kurz');
  return;
} else if (req.body.age <= 0 || req.body.age > 150) {
  res.status(400);
  res.send ('Ungültiges Alter')
  return;
}
  let user = {
    id: users.length + 1,
    name: req.body.name,
    age: req.body.age
  };
  users.push(user);
  res.send(user);
});
*/

router.post('/users', db.createUser)
module.exports = router;
