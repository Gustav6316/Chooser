// Gibt user in einer Liste aus, wenn keiner übermittelt wird nur ein <h1>-Element mit No user found ausgegeben

const Userlist = ({users}) => (
    <div>
      {
        users
          ? (
            <div>
              <h1>User</h1>
              <div>
                <ul>
                  {usernames(users)}
                </ul>
              </div>
            </div>
          )
          : <h1>No user found</h1>
      }
    </div>
  );

  // Generiert Listenelemente aus dem übergebenen users Array
const usernames = (users) => (users.map((user) =>  <li>{user.username}</li>));

  export default Userlist;