import React from "react"
import { shallow } from "enzyme"
import { Provider } from "react-redux"
import configureMockStore from "redux-mock-store"
import { Header } from "../index"

const mockStore = configureMockStore()
const store = mockStore()

describe("<Header />", () => {
  it("should render without throwing an error", () => {
    expect(
      shallow(
        <Provider store={store}>
          <Header />
        </Provider>,
      ),
    ).toEqual({})
  })
})
