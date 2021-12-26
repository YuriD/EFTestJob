import React from 'react';
import { Route } from 'react-router';
import Container from 'react-bootstrap/Container'
import { NavMenu } from './components/NavMenu';
import { FetchData } from './components/FetchData';
import { UsersPlot } from './components/Calculate';
import { useUsers } from './hooks/users_hook';
import { UserContext } from './components/UserContext';

function App() {
  const { users } = useUsers()

  return <>
    <NavMenu />
      <UserContext.Provider value={{ users }}>
        <Container>
          <Route exact path='/' component={FetchData} />
        </Container>
        <Container fluid>
          <Route path='/calc' component={UsersPlot} />
        </Container>  
      </UserContext.Provider>
  </>
}
export default App

