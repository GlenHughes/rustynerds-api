import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
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

  render() {
    const { user } = this.props
    // //<li>Hey, {user.firstName}</li>
    const userLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li className="nav-item">
          <Link className="btn btn-primary" to="/" onClick={this.handleLogout}>
            Logout
          </Link>
        </li>
      </ul>
    )

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
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <Link className="navbar-brand" to="/">
          <img
            id="logo"
            src="./images/logo.png"
            className="d-block"
            alt="Your Logo"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/claims">
                Claims
              </Link>
            </li>
          </ul>
          <div className="collapse navbar-collapse float-right">
            {user ? userLinks : guestLinks}
          </div>
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
