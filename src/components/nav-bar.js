import React from "react"
import { Link, navigate } from "gatsby"
import { getUser, isLoggedIn, logout } from "../utils/auth"

export default () => {
  let greetingMessage = ""
  if (isLoggedIn()) {
    greetingMessage = `Hello ${getUser().name}`
  } else {
    greetingMessage = "You are not logged in"
  }
  return (
    <div
      style={{
        display: "flex",
        flex: "1",
        justifyContent: "space-between",
        borderBottom: "1px solid #d1c1e0",
      }}
    >
      <span>{greetingMessage}</span>
      <nav>
        <Link to="/">Home</Link>
        {` `}
        <Link to="/admin/profile">Profile</Link>
        {` `}
        <Link to="/admin/admin-form">Admin Form</Link>
        {` `}
        <Link to="/admin/test-centers">Admin Test center</Link>
        {` `}
        {isLoggedIn() ? (
          <a
            href="/"
            onClick={event => {
              event.preventDefault()
              logout(() => navigate(`/admin/login`))
            }}
          >
            Logout
          </a>
        ) : null}
      </nav>
    </div>
  )
}