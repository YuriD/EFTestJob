import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap'

export const NavMenu = () => {
  return <>
    <Navbar className='color-nav'>
      <Container>
        <Navbar.Brand id='ab'>AB Test Real</Navbar.Brand>
        <Nav className='justify-content-end'>
          <Nav.Link id='link1' href='/'>Users</Nav.Link>
        </Nav>
        <Button href='/calc' variant='primary' className="but1" size="lg">Calculate</Button>
      </Container>
    </Navbar>
  </>
}