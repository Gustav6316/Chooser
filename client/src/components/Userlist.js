
const Userlist = ({ users }) => (
    <div>
      {
        users
          ? (
            <div>
              <h1>User</h1>
              <div>
                <h2>
                  {users.map(({username}) => (
                    <div key={username}>
                      {username}
                    </div>
                  ))}
                </h2>
              </div>
            </div>
          )
          : <h1>No user found</h1>
      }
    </div>
  );

  export default Userlist;