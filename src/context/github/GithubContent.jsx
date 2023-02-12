import { createContext, useState } from "react";

const GitHubContext = createContext()

const gitURL = import.meta.env.VITE_GITHUB_API_URL
const authToken = import.meta.env.VITE_GITHUB_TOKEN

export const GitHubProvider = ({ children }) => {
  const [ loading, setLoading ] = useState(true)
  const [ users, setUsers ] = useState([])

  const fetchUsers = async () => {
    const response = await fetch(`${import.meta.env.
      VITE_GITHUB_API_URL}/users`,{
      headers: {
        Authorization: `token: ${import.meta.env.VITE_GITHUB_API_TOKEN}`
      }
      })
    const data = await response.json()
    setUsers(data)
    setLoading(false)
  }

  return <GitHubContext.Provider value={{
    users,
    loading,
    fetchUsers
  }}>
    {children}
  </GitHubContext.Provider>
}

export default GitHubContext