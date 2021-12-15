import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap'
//import { Link } from 'react-router-dom';

export const NavMenu = () => {
  return <>
    <Navbar className='color-nav'>
      <Container>
        <Navbar.Brand>AB TEST REAL</Navbar.Brand>
        <Nav className='justify-content-end'>
          <Nav.Link className='navLink' id='link1' href='/'>Add new user</Nav.Link>
          <Nav.Link id='link2' href='/fetch-data'>Get users</Nav.Link>
        </Nav>
        <Button href='/counter' variant='primary' size="lg">Calculate</Button>
      </Container>
    </Navbar>
  </>
}