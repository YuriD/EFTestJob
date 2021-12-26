import React, { useContext } from 'react';
import { AddUser } from './AddUser';
import BootstrapTable from 'react-bootstrap-table-next';
import { UserContext } from './UserContext';

export const FetchData = (props) => {
  let u = useContext(UserContext);  props.u && (u = {users: props.u})
  const dateFormatter = (cell, _row) => {
    return new Date(cell).toLocaleDateString()
  }
  const columns = [
    { dataField: 'userId', text: 'User ID', style: { width: '10%' }, headerStyle: { width: '9%' } },
    { dataField: 'dReg', text: 'Date registration', style: { width: '22%' }, headerStyle: { width: '22%' }, formatter: dateFormatter, },
    { dataField: 'dLastAct', text: 'Date last activity', style: { width: '22%' }, headerStyle: { width: '22%' }, formatter: dateFormatter, }
  ]

  try {
    const el = document.getElementById('usr')
    el.remove()
  } catch { }

  return <>
    <AddUser />
    {u.users.length > 0 &&
      <BootstrapTable
        bootstrap4
        id='usr'
        keyField='userId'
        data={u.users}
        columns={columns}
        //cellEdit={cellEditFactory({ mode: 'click', autoSelectText: true, afterSaveCell: setCell })}
        headerClasses='tab_head'
        striped={true}
        hover={true}
        bordered={false}
      />}
  </>
}

