import React, { useContext, useEffect } from 'react';
import { AddUser } from './AddUser';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { Type } from 'react-bootstrap-table2-editor';
import { UserContext } from './UserContext';
import { useHttp } from '../hooks/http_hook';
import { useMessage } from '../hooks/message_hook';

export const UsersList = (props) => {
  let u = useContext(UserContext); props.u && (u = { users: props.u })
  const { request, error, clearError } = useHttp()
  const { message } = useMessage()

  useEffect(() => {
    message(true, error); clearError()
  }, [error, message, clearError])

  const dateFormatter = (cell, _row) => {
    return new Date(cell).toLocaleDateString()
  }
  const columns = [
    { dataField: 'userId', text: 'User ID', editable: false, style: { width: '10%' }, headerStyle: { width: '9%' } },
    { dataField: 'dReg', text: 'Date registration', editor: { type: Type.DATE, defaultValue: new Date() }, style: { width: '22%' }, headerStyle: { width: '22%' }, formatter: dateFormatter, },
    { dataField: 'dLastAct', text: 'Date last activity', editor: { type: Type.DATE, defaultValue: new Date() }, style: { width: '22%' }, headerStyle: { width: '22%' }, formatter: dateFormatter, }
  ]

  const checkDate = (oldValue, newValue, _row, _col) => {
    if (new Date(row.dReg) > new Date(row.dLastAct)) 
      console.log('Hernya!')
    }

  const setDate = async (oldValue, newValue, row, _col) => {
    try {
      if (new Date(oldValue).toLocaleDateString() !== new Date(newValue).toLocaleDateString()) {
        await request(`/api/users/${row.userId}`, 'PUT', {}, { ...row })
      }
    } catch (e) { }
  }

  const cellEdit = cellEditFactory({
    mode: 'click',
    beforeSaveCell: checkDate,
    afterSaveCell: setDate
  })

  return <>
    <AddUser />
    {u.users.length > 0 && 
      <BootstrapTable
        bootstrap4
        id='usr'
        keyField='userId'
        data={u.users}
        columns={columns}
        cellEdit={ cellEdit }
        headerClasses='tab_head'
        striped={true}
        hover={true}
        bordered={false}
      />}
  </>
}

