import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Dropdown, DropdownButton } from "react-bootstrap"
import { authenticationActions } from "../../_actions"
import "./style.css"

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout(event) {
    event.preventDefault()
    const { dispatch } = this.props
    dispatch(authenticationActions.logout())
  }

  userLinks() {
    const { user } = this.props
    const { username } = user

    return (
      <DropdownButton alignRight title={username}>
        <Dropdown.Item>
          <Link to="/logout">Logout</Link>
        </Dropdown.Item>
      </DropdownButton>
    )
  }

  render() {
    const { user } = this.props

    const guestLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li className="nav-item">
          <Link to="/login" className="btn btn-primary text-light">
            Login
          </Link>
        </li>
      </ul>
    )

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#nav-content"
          aria-controls="nav-content"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <Link className="navbar-brand" to="/">
          <img
            id="logo"
            src="./images/logo.svg"
            className="d-block"
            alt="RustyNerds - Admin Panel"
          />
        </Link>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="nav-content"
        >
          <ul className="navbar-nav">
            <Link className="nav-link active" to="/players">
              Players
            </Link>
            <Link className="nav-link disabled" to="/grant">
              Grant Kit
            </Link>
            <Link className="nav-link disabled" to="/console">
              Console
            </Link>
            {user ? this.userLinks() : guestLinks}
          </ul>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  const { authentication } = state
  const { user } = authentication
  return {
    user,
  }
}

const connectedHeader = connect(mapStateToProps)(Header)
export { connectedHeader as Header }
