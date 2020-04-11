import React, {useState} from "react"
import { Link, navigate } from "gatsby"
import { getUser, isLoggedIn, logout } from "../utils/auth";
import Login from "./login";
import firebase from "../helper/firebase"

export default () => {
  let details;
  if (!isLoggedIn()) {
    details = (
      <p className="text-right px-5">
        <Link to="/admin/login"><u>Log in</u></Link>
      </p>
    )
  } else {
    const { displayName, email } = getUser()
    details = (
      <p className="text-right px-5">
        Logged in as {displayName} ({email}
        )!
        {` `}
        <a href="/" onClick={event => { event.preventDefault(); logout(firebase).then(() => navigate(`/admin/login`)) }}>
          <u>log out</u>
        </a>
      </p>
    )
  }

  return <div>{details}</div>

  // let greetingMessage = ""
  // if (isLoggedIn()) {
  //   greetingMessage = `Hello ${getUser().name}`
  // } else {
  //   greetingMessage = "You are not logged in"
  // }

  // return (
  //   <div
  //     style={{
  //       display: "flex",
  //       flex: "1",
  //       justifyContent: "space-between",
  //       borderBottom: "1px solid #d1c1e0",
  //     }}
  //   >
  //     <span>{greetingMessage}</span>
  //     <nav>
  //       <Link to="/">Home</Link>
  //       {` `}
  //       <Link to="/admin/profile">Profile</Link>
  //       {` `}
  //       <Link to="/admin/admin-form">Add Centers</Link>
  //       {` `}
  //       <Link to="/admin/test-centers">Test center</Link>
  //       {` `}
  //       {isLoggedIn() ? (
  //         <a
  //           href="/"
  //           onClick={event => {
  //             event.preventDefault()
  //             logout(() => navigate(`/admin/login`))
  //           }}
  //         >
  //           Logout
  //         </a>
  //       ) : (<a
  //           href="/"
  //           onClick={event => {
  //             event.preventDefault()
  //             logout(() => navigate(`/admin/login`))
  //           }}
  //         >
  //           Login
  //         </a>)}
  //     </nav>
  //   </div>
  // )
}