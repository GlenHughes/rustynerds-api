import React from "react"
import { shallow } from "enzyme"

import { PrivateRoute } from "../index"

describe("<PrivateRoute />", () => {
  it("should render a component", () => {
    const renderedComponent = shallow(<PrivateRoute />)
    expect(renderedComponent.length).toEqual(1)
  })
})
