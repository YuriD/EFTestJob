import React, { useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { Type } from 'react-bootstrap-table2-editor';
import { useHttp } from '../hooks/http_hook';
import { useMessage } from '../hooks/message_hook';

export const UsersList = ({users}) => {
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
    { dataField: 'dReg', text: 'Date registration (edit - click on field)', editor: { type: Type.DATE, defaultValue: new Date().toLocaleDateString() }, style: { width: '22%' }, headerStyle: { width: '22%' }, formatter: dateFormatter, },
    { dataField: 'dLastAct', text: 'Date last activity (edit - click on field)', editor: { type: Type.DATE, defaultValue: new Date().toLocaleDateString() }, style: { width: '22%' }, headerStyle: { width: '22%' }, formatter: dateFormatter, }
  ]

  const checkDate = (oldValue, newValue, row, col) => {
    if ((col.dataField === 'dReg' && new Date(newValue) > new Date(row.dLastAct)) ||
      (col.dataField === 'dLastAct' && new Date(row.dReg) > new Date(newValue))) {
      row[col.dataField] = oldValue
      message(true, col.dataField==='dReg'?'Date registration should be less':'Date last activity should be greater')
    }
  }
  const setDate = async (oldValue, newValue, row, col) => {
    try {
      checkDate(oldValue, newValue, row, col)
      if (new Date(oldValue).toLocaleDateString() !== new Date(newValue).toLocaleDateString()) {
        await request(`/api/users/${row.userId}`, 'PUT', {}, { ...row })
      }
    } catch (e) { }
  }

  const cellEdit = cellEditFactory({
    mode: 'click',
    afterSaveCell: setDate
  })

  return <>
    <BootstrapTable
      bootstrap4
      id='usr'
      keyField='userId'
      data={users}
      columns={columns}
      cellEdit={ cellEdit }
      headerClasses='tab_head'
      striped={true}
      hover={true}
      bordered={false}
    />
  </>
}

