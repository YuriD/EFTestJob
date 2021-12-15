import React, { useCallback } from 'react';
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'

export const useMessage = () => {
  return useCallback(text => {
    if(text) {
      return <>
        <ToastContainer position='top-end'>
          <Toast bg='Info' delay={5000} autohide>
            <Toast.Header>
              <strong className="me-auto">Warning</strong>
            </Toast.Header>
            <Toast.Body>{text}</Toast.Body>
          </Toast>
        </ToastContainer>
      </>
    }
  }, [])
}
