import React, { useCallback } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

export const useMessage = () => {
  const message = useCallback((text) => {
    toast.configure({
      autoClose: 4000,
      position: 'top-center',
      bodyClassName: "black_toast",
    })
    if(text == "err")
      toast.warn("Something doesn't look right")
    else if (text == "info")
      toast.success("User have been added")
    return (
      <ToastContainer />
    )
  }, [])
  return { message }
}