import React from "react"

const AdminPage = () => {
  return (
    <div className="row justify-content-center">
      <div className="col-md-12 text-center">
        <span className="display-1 d-block">Admin Page</span>
        <div className="mb-4 lead">
          This is the admin page protected by auth
        </div>
      </div>
    </div>
  )
}

export { AdminPage }
