import React from "react"
import { Router, Route, Switch } from "react-router-dom"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { PrivateRoute } from "./_components/private-route"
import { LoginPage } from "./_pages/login"
import { TestPage } from "./_pages/test"

import { store, history } from "./_helpers"
import { Template } from "./Template"
import { Page404 } from "./_pages/404"

const Root = () => (
  <Provider store={store}>
    <Router history={history}>
      <Template>
        <Switch>
          <PrivateRoute exact path="/" component={TestPage} />
          <Route path="/login" component={LoginPage} />
          <PrivateRoute exact path="/test" component={TestPage} />
          <Route component={Page404} />
        </Switch>
      </Template>
    </Router>
  </Provider>
)

ReactDOM.render(<Root />, document.getElementById("app"))
