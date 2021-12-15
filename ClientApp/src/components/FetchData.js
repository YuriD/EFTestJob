import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { users: [], loading: true };
  }

  componentDidMount() {
    this.populateUserData();
  }

  static renderUsersTable(users) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Date registration</th>
            <th>Date last activity</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.userId}>
              <td width='10%'>{user.userId}</td>
              <td width='20%'>{new Date(user.dReg).toLocaleDateString()}</td>
              <td width='20%'>{new Date(user.dLastAct).toLocaleDateString()}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderUsersTable(this.state.users);

    return (
      <div>
        <h4 id="tabelLabel" >Users</h4>
        {contents}
      </div>
    );
  }

  async populateUserData() {
    const response = await fetch('api/users', { method: 'GET' });
    const data = await response.json();
    this.setState({ users: data, loading: false });
 }
}
