import React from "react"
import { connect } from "react-redux"
import { Header } from "./_components/header"
import { Footer } from "./_components/footer"
import { history } from "./_helpers"
import { alertActions } from "./_actions"

import "./layout.css"

class Template extends React.Component {
  constructor(props) {
    super(props)
    const { dispatch } = this.props
    history.listen(() => {
      // clear alert on location change
      dispatch(alertActions.clear())
    })
  }

  render() {
    const { alert, children } = this.props
    return (
      <main className="d-flex flex-column">
        <Header />
        <div className="container flex-fill">
          {alert.message && (
            <div
              className={`col-sm-9 col-md-7 col-lg-5 mx-auto text-center alert ${
                alert.type
              }`}
            >
              {alert.message}
            </div>
          )}
          {children}
        </div>
        <Footer />
      </main>
    )
  }
}

function mapStateToProps(state) {
  const { alert } = state
  return {
    alert,
  }
}

const connectedApp = connect(mapStateToProps)(Template)
export { connectedApp as Template }
