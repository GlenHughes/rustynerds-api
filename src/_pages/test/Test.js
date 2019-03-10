import React from "react"

const TestPage = () => {
  return (
    <div className="row justify-content-center">
      <div className="col-md-12 text-center">
        <span className="display-1 d-block">Test Page</span>
        <div className="mb-4 lead">
          This is a test page that is protected by a login
        </div>
      </div>
    </div>
  )
}

export { TestPage }
