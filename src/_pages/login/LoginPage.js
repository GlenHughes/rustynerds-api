import React from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { Row, Col, Form, Button } from "react-bootstrap"
import { ClipLoader } from "react-spinners"

import { authenticationActions, alertActions } from "../../_actions"

class LoginPage extends React.Component {
  constructor(props) {
    super(props)

    const { dispatch } = this.props
    // reset login status
    dispatch(authenticationActions.logout())

    this.state = {
      username: "",
      password: "",
      submitted: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps() {
    const { location, dispatch } = this.props
    const { state } = location
    if (state) {
      const { message } = state
      if (message) {
        dispatch(alertActions.info(message))
      }
    }
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit(event) {
    event.preventDefault()

    this.setState({ submitted: true })
    const { username, password } = this.state
    const { dispatch } = this.props
    if (username && password) {
      dispatch(authenticationActions.login(username, password))
    }
  }

  render() {
    const { loggingIn } = this.props
    const { username, password, submitted } = this.state
    return (
      <Row>
        <Col />
        <Col xs={5}>
          <h2 className="text-center">Staff Login</h2>
          <hr />
          <Form onSubmit={this.handleSubmit} className={submitted ? "" : ""}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                placeholder="Enter Username"
                name="username"
                value={username}
                onChange={this.handleChange}
                className={`${submitted && !username ? " is-invalid" : ""}`}
              />
              {submitted && !username && (
                <div className="invalid-feedback">username is required</div>
              )}
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={password}
                onChange={this.handleChange}
                className={`${submitted && !password ? " is-invalid" : ""}`}
              />
              {submitted && !password && (
                <div className="invalid-feedback">Password is required</div>
              )}
            </Form.Group>
            <Button variant="primary" type="submit" onClick={this.handleSubmit}>
              Submit
            </Button>
            <ClipLoader loading={loggingIn} />
          </Form>
        </Col>
        <Col />
      </Row>
    )
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication
  return {
    loggingIn,
  }
}

const connectedLoginPage = withRouter(connect(mapStateToProps)(LoginPage))
export { connectedLoginPage as LoginPage }
