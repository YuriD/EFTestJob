import { useState, useEffect } from 'react'
import { useHttp } from './http_hook'

export const useUsers = () => {
  const { request } = useHttp()
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const fetched = await request('/api/users', 'GET')
        setUsers(fetched)
      } catch (e) { }
    }
    getUsers()
  }, [request])
  
  return {users}
}