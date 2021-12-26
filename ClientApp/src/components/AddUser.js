import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useHttp } from '../hooks/http_hook'
import { useMessage } from '../hooks/message_hook'
import { FetchData } from './FetchData'

export const AddUser = () => {
  const { loading, request, error, clearError } = useHttp()
  const [form, setForm] = useState({ userid: '', dreg: '', dlastact: '' })
  const [preload, setPreload] = useState(false)
  const [users, setUsers] = useState([])
  const { message } = useMessage()

  useEffect(() => {
    message(true, error)
    console.log('Error: ', error); clearError()
  }, [error, message, clearError])

  useEffect(() => {
    const UpdatedUsers = async () => {
      if (preload) {
        const fetched = await request('/api/users', 'GET')
        setUsers(fetched)
      }
    }
    UpdatedUsers()
  }, [preload, request]);

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const adduserHandler = async () => {
    try {
      const data = await request('/api/Users', 'POST', {}, { ...form })   //{ UserID: form.userid, Dreg: form.dreg, DLastAct: form.dlastact })
      message(false, `New user added with ID ${data.userId}`)
      setPreload(!preload)
    } catch (e) { }
  }

  if (users.length > 0) {
    return <FetchData u={users} />
	}

  return <>
    <br /><h4>New User</h4>
    <Form>
      <Row className="mb-4" md={4}>
        <Form.Group as={Col} controlId="formGridID">
          <Form.Label column="lg">User ID</Form.Label>
          <Form.Control size="lg" type="number" name="userid" onChange={changeHandler} />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridDreg">
          <Form.Label column="lg">Date registration</Form.Label>
          <Form.Control size="lg" type="date" name="dreg" onChange={changeHandler} />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridDlact">
          <Form.Label column="lg">Date last activity</Form.Label>
          <Form.Control size="lg" type="date" name="dlastact" onChange={changeHandler} />
        </Form.Group>
        <Col xs="auto">
          <Button variant="primary" type="submit" className="but" size="lg" onClick={adduserHandler} disabled={loading}>
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  </>
}
