const Userlist = ({users}) => (
    <div>
      {
        users
          ? (
            <div>
              <h1>User</h1>
              <div>
                <ul>
                  {testwert(users)}
                </ul>
              </div>
            </div>
          )
          : <h1>No user found</h1>
      }
    </div>
  );

const usernames = (users) => (users.map((user) =>  <li>{user.username}</li>));

function testwert(users) {

  console.log(users)
  return (<li>testwert</li>);
}


  export default Userlist;