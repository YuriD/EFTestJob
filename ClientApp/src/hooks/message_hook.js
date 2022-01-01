import React, { useCallback } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

export const useMessage = () => {
  const message = useCallback((err, text) => {
    toast.configure({
      autoClose: 3000,
      position: 'top-center',
      bodyClassName: "black_toast",
    })
    if(err && text)
      toast.warn(`${text}`)
    else if (text)
      toast.success(`${text}`)
    return (
      <ToastContainer />
    )
  }, [])

  return { message }
}