import React from "react"
import { getUser } from "../utils/auth"

const Profile = () => {
  const user = getUser();
  const { displayName, email, emailVerified } = user;
  // const accessToken = user.stsTokenManager.accessToken; 

  return (
        <div>
        <h1> Admin Access only</h1>
        <h3>Your profile</h3>
        <ul>
          <li>Name: {`${displayName}`}</li>
          <li>E-mail: {`${email}`}</li>
          <li>Email Verified: {`${emailVerified}`}</li>
          {/* <li>Firebase Access Token: {`${accessToken}`}</li> */}
        </ul>
          
        </div>
  )
}
// const Profile = () => (
//   <>
//     <h1>Your profile</h1>
//     <ul>
//     <li>Name: {getUser().name}</li>
//       <li>E-mail: {getUser().email}</li>
//     </ul>
//   </>
// )

export default Profile