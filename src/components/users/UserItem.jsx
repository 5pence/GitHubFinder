import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function UserItem({ user }) {
  return (
    <div className="card shadow-md compact side-bg-base-100">
      <div className="flex-row items-center space-x-4 card-body">
        <div>
          <div className="avatar">
            <div className="rounded-full shadow w-14 h-14">
              <img src={user.avatar_url} alt='Profile pic of user' />
            </div>
          </div>
          <h2 className="card-title">{user.login}</h2>
          <Link to={`${import.meta.env.VITE_GITHUB_URL}/${user.login}`}>Visit User</Link>
        </div>
      </div>
    </div>
  )
}

UserItem.propTypes = {
  user: PropTypes.object.isRequired
}
export default UserItem