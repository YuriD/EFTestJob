import { useState, useEffect, useCallback } from 'react'
import { useHttp } from './http_hook'

export const useUsers = () => {
  const { request } = useHttp()
  const [users, setUsers] = useState([])

  const getUsers = useCallback(async () => {
    try {
      const fetched = await request('/api/users', 'GET')
      setUsers(fetched)
    } catch (e) { }
  }, [request])

  useEffect(() => {
    getUsers()
  }, [getUsers])

  return { users, getUsers }
}