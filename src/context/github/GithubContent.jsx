import { createContext, useReducer } from "react";
import githubReducer from "./GitHubReducers";

const GitHubContext = createContext()

const gitURL = import.meta.env.VITE_GITHUB_API_URL
const authToken = import.meta.env.VITE_GITHUB_TOKEN

export const GitHubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: true
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  const fetchUsers = async () => {
    const response = await fetch(`${import.meta.env.
      VITE_GITHUB_API_URL}/users`,{
      headers: {
        Authorization: `token: ${import.meta.env.VITE_GITHUB_API_TOKEN}`
      }
      })
    const data = await response.json()
    dispatch({
      type: 'GET_USERS',
      payload: data
    })
  }

  return <GitHubContext.Provider value={{
    users: state.users,
    loading: state.loading,
    fetchUsers
  }}>
    {children}
  </GitHubContext.Provider>
}

export default GitHubContext