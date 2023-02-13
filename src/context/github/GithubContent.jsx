import { createContext, useReducer } from "react";
import githubReducer from "./GitHubReducers";

const GitHubContext = createContext()

const gitURL = import.meta.env.VITE_GITHUB_API_URL
const authToken = import.meta.env.VITE_GITHUB_TOKEN

export const GitHubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  const fetchUsers = async () => {
    setLoading()
    const response = await fetch(`${import.meta.env.
      VITE_GITHUB_API_URL}/users`, {
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

  const searchSingleUser = async (handle) => {
    setLoading()

    const response = await fetch(`${import.meta.env.
      VITE_GITHUB_API_URL}/users/${handle}`, {
        headers: {
          Authorization: `token: ${import.meta.env.VITE_GITHUB_API_TOKEN}`
        }
        })
      
      if (response.status === 404) {
        window.location('/pageNotFound')
      } else {
        const data = await response.json()
        dispatch({
          type: 'SEARCH_SINGLE_USER',
          payload: data
        })
      }
  }

  const getUserRepos = async (handle) => {
    setLoading()
    const params = new URLSearchParams({
      sort: 'created',
      per_page: 10
    })
    const response = await fetch(`${import.meta.env.
      VITE_GITHUB_API_URL}/users/${handle}/repos?${params}`, {
        headers: {
          Authorization: `token: ${import.meta.env.VITE_GITHUB_API_TOKEN}`
        }
      })
      const data = await response.json()
      dispatch({
        type: 'GET_REPOS',
        payload: data
      })
  }

  const searchUser = async (handle) => {
    setLoading()
    const params = new URLSearchParams({
      q: handle
    })

    const response = await fetch(`${import.meta.env.
      VITE_GITHUB_API_URL}/search/users?${params}`, {
        headers: {
          Authorization: `token: ${import.meta.env.VITE_GITHUB_API_TOKEN}`
        }
        })
      const { items } = await response.json()
      dispatch({
        type: 'SEARCH_USER',
        payload: items
      })
  }

  const clearResults = () => {
    dispatch({
      type: 'CLEAR_USERS',
      payload: [],
      loading: false
    })
  }

  const setLoading = () => {
    dispatch({type: "SET_LOADING"})
  }

  return <GitHubContext.Provider value={{
    users: state.users,
    loading: state.loading,
    user: state.user,
    repos: state.repos,
    fetchUsers,
    searchSingleUser,
    searchUser,
    getUserRepos,
    clearResults
  }}>
    {children}
  </GitHubContext.Provider>
}

export default GitHubContext