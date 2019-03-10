import React from "react"
import { shallow } from "enzyme"

import { Footer } from "../index"

describe("<Footer />", () => {
  it("should render the copyright notice", () => {
    const renderedComponent = shallow(<Footer />)
    expect(
      renderedComponent.contains(
        <footer className="container-fluid w-100 bg-dark text-light py-3 footer text-center">
          <span className="text-muted">Copyright 2019 Your App Name.</span>
        </footer>,
      ),
    ).toBe(true)
  })
})
