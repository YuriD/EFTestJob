import React from 'react';
import { Route } from 'react-router';
import Container from 'react-bootstrap/Container'
import { NavMenu } from './components/NavMenu';
import { AddUser } from './components/AddUser';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';

function App() {
  return <>
    <NavMenu />
    <Container>
      <Route exact path='/' component={AddUser} />
      <Route path='/fetch-data' component={FetchData} />
      <Route path='/counter' component={Counter} />
    </Container>
  </>
}
export default App

