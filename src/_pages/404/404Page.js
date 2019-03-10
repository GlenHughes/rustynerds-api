import React from "react"
import { Link } from "react-router-dom"

const Page404 = props => {
  const { message } = props

  return (
    <div className="row justify-content-center">
      <div className="col-md-12 text-center">
        <span className="display-1 d-block">404</span>
        <div className="mb-4 lead">
          {message || "The page you are looking for was not found."}
        </div>
        <Link to="/claims" className="btn btn-link">
          Back to Claims
        </Link>
      </div>
    </div>
  )
}

export { Page404 }
