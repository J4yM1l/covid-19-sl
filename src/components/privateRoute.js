import React, { Component } from "react"
import { navigate } from "gatsby"
import { isLoggedIn } from "../utils/auth"

const PrivateRoute = ({ component: Component,location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== `/admin/login`) {
    navigate("/admin/login")
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute