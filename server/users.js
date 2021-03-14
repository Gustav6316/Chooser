//  User-Array
const users = [];

//  Fügt Socket als User hinzu
const addUser = ({ id, username, room }) => {
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => user.room === room && user.username === username);
  
    if(!username || !room) return { error: 'Username and room are required.' };
    if(existingUser) return { error: 'Username already taken.' };
  
    const user = { id, username, room };
  
    users.push(user);


    console.log('Adding User');
    console.log(users);
    return { user };
}
//  Entfernt User aus Array
const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}
//  Sucht User aus Array
const getUser = (id) => {
    users.find((user) => user.id === id);
}
//  Gibt User im derzeitigen Room aus
const getUsersInRoom = (room) => {
    return users.filter((user) => user.room === room);
}

module.exports = { addUser, removeUser, getUser, getUsersInRoom }