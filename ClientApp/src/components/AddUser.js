import React, { useState, useEffect, useCallback } from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useHttp } from '../hooks/http_hook'
import { useMessage } from '../hooks/message.hook'

export const AddUser = () => {
  const { loading, request, error, clearError } = useHttp()
  const [form, setForm] = useState({ userid: '', dreg: '', dlastact: '' })
  const { message } = useMessage()
 
  useEffect(() => {
    message("err")
    console.log('Error: ', error); clearError()
  }, [error, message, clearError])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }
  const adduserHandler = async () => {
    try {
      const data = await request('/api/Users', 'POST', {}, {...form})    //{ UserID: '', Dreg: form.dreg, DLastAct: form.dlastact })
      message("info")
    } catch (e) {}
  }
  
  return <>
    <br/><h4>New User</h4>
    <Form>
      <Row className="mb-4" md={4}>
        <Form.Group as={Col} controlId="formGridID">
          <Form.Label column="lg">User ID (optional)</Form.Label>
          <Form.Control size="lg" type="number" name="userid" onChange={changeHandler} />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridDreg">
          <Form.Label column="lg">Date registration</Form.Label>
          <Form.Control size="lg" type="date" name="dreg" onChange={changeHandler} />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridDlact">
          <Form.Label column="lg">Date last activity</Form.Label>
          <Form.Control size="lg" type="date" name="dlastact" onChange={changeHandler}/>
        </Form.Group>
      </Row>
      <Button variant="primary" size="lg" type="submit" onClick={adduserHandler} disabled={loading}>
        Save
      </Button>
    </Form>
  </>
}
