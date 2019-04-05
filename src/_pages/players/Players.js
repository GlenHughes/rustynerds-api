/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { ClipLoader } from "react-spinners"
import { Row, Col, Table } from "react-bootstrap"
import { rconActions } from "../../_actions"
import { store } from "../../_helpers"

class PlayersPage extends React.Component {
  constructor(props) {
    super(props)

    const { loading } = props
    this.state = {
      loading,
    }

    this.handleReload = this.handleReload.bind(this)
    this.handleGrant = this.handleGrant.bind(this)
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(rconActions.players())
    this.interval = setInterval(() => {
      dispatch(rconActions.players())
    }, 30000)
    // listen for logout and remove interval
    store.subscribe(() => {
      const state = store.getState()
      const { authentication } = state
      if (!authentication.loggedIn) {
        clearInterval(this.interval)
      }
    })
  }

  handleGrant(event) {
    const { dataset } = event.target
    const { steamId, kit } = dataset

    if (steamId && kit) {
      const { dispatch } = this.props
      dispatch(rconActions.grantKit(steamId, kit))
    }
  }

  handleReload() {
    const { dispatch } = this.props
    dispatch(rconActions.players())
  }

  render() {
    const { loading } = this.state
    const { data } = this.props
    const playerList = data.map(player => (
      <tr key={player.id}>
        <td>{player.id}</td>
        <td>{player.name}</td>
        <td>{player.ping}</td>
        <td>
          <i
            role="button"
            tabIndex="0"
            className="fab fa-discord"
            data-steam-id={player.id}
            data-kit="discord"
            onClick={this.handleGrant}
            title={`Click to grant ${player.name} Discord kit`}
          />
          <i
            className="fab fa-steam"
            role="button"
            tabIndex="0"
            data-steam-id={player.id}
            data-kit="steam"
            onClick={this.handleGrant}
            title={`Click to grant ${player.name} Steam kit`}
          />
        </td>
      </tr>
    ))
    return (
      <Row className="row justify-content-center">
        <Col className="text-center">
          <ClipLoader loading={loading} />
          <h2 className="d-block">
            Online Players {data.length}
            <i
              role="button"
              tabIndex="0"
              className="fas fa-sync-alt float-right"
              onClick={this.handleReload}
              title="Click to refresh player list"
            />
          </h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Steam ID</th>
                <th>Name</th>
                <th>Ping</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{playerList}</tbody>
          </Table>
        </Col>
      </Row>
    )
  }
}

function mapStateToProps(state) {
  const { authentication } = state
  const { columns, data, loading } = state.rcon
  return {
    authentication,
    data,
    columns,
    loading,
  }
}

const connectedPlayersPage = withRouter(connect(mapStateToProps)(PlayersPage))
export { connectedPlayersPage as PlayersPage }
