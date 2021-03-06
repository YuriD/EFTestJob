import {useState, useCallback} from 'react'

export const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const request = useCallback(async (url, method = 'GET', headers = {}, body = null) => {
    try {
      setLoading(true)
      if (body) {
        body = JSON.stringify(body); headers['Content-Type'] = 'application/json'
      }
      const response = await fetch(url, { method, headers, body })
      const data = await response.json()
      if (!response.ok) {
        if (data.userid)
          throw new Error(data.userid[0])
        else if (data.dlastact)
          throw new Error(data.dlastact[0])
        throw new Error(data.title || data.message || "Something doesn't look right")
      }
      setLoading(false); return data      
    } catch (e) {
      setLoading(false); setError(e.message); throw e
    }
  }, [])
  
  const clearError = useCallback(() => setError(null), [])
  return {loading, request, error, clearError}
}

