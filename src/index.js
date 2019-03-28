import React from "react"
import { Router, Route, Switch } from "react-router-dom"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { PrivateRoute } from "./_components/private-route"
import { LoginPage } from "./_pages/login"
import { Page404 } from "./_pages/404"
import { PlayersPage } from "./_pages/players/Players"
import { store, history } from "./_helpers"
import { Template } from "./Template"

const Root = () => (
  <Provider store={store}>
    <Router history={history}>
      <Template>
        <Switch>
          <PrivateRoute exact path="/" component={PlayersPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/logout" component={LoginPage} />
          <PrivateRoute exact path="/admin" component={PlayersPage} />
          <Route component={Page404} />
        </Switch>
      </Template>
    </Router>
  </Provider>
)

ReactDOM.render(<Root />, document.getElementById("app"))
