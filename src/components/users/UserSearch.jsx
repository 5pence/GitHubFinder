import { useState, useContext } from "react"
import GitHubContext from "../../context/github/GithubContent"
import AlertContext from "../../context/alert/AlertContext"

function UserSearch() {

  const [text, setText] = useState('')

  const { users, searchUser, clearResults } = useContext(GitHubContext)
  const { setAlert } = useContext(AlertContext)

  const handleChange = (event) => {
    setText(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (text === '') {
      setAlert('Please enter something', 'error')
    } else {
      searchUser(text)
      setText('')
    }
  }

  const clearUsers = () => {
    clearResults()
    setText('')
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2
    mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input 
                type="text" 
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                placeholder="Search"
                value={text}
                onChange={handleChange}
              />
              <button 
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg" 
                type="submit">
                  Go
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>
        {users.length > 0 && 
          (<button 
            className="btn btn-ghost btn-lg"
            onClick={clearUsers}>
              Clear
          </button>)
        }
      </div>

    </div>
  )
}

export default UserSearch